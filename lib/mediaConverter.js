import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpegInstance = null;
let isLoading = false;
let isLoaded = false;

export async function loadFFmpeg(onProgress) {
  if (isLoaded && ffmpegInstance) {
    return ffmpegInstance;
  }
  
  if (isLoading) {
    // Wait for loading to complete
    while (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return ffmpegInstance;
  }
  
  isLoading = true;
  
  try {
    ffmpegInstance = new FFmpeg();
    
    ffmpegInstance.on('log', ({ message }) => {
      console.log(message);
    });
    
    ffmpegInstance.on('progress', ({ progress, time }) => {
      if (onProgress) {
        onProgress(Math.round(progress * 100));
      }
    });
    
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    
    await ffmpegInstance.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    
    isLoaded = true;
    isLoading = false;
    return ffmpegInstance;
  } catch (error) {
    isLoading = false;
    throw error;
  }
}

export async function convertMedia(file, targetFormat, onProgress) {
  const ffmpeg = await loadFFmpeg(onProgress);
  
  const inputName = `input.${file.name.split('.').pop()}`;
  const outputName = `output.${targetFormat.toLowerCase()}`;
  
  // Write input file
  await ffmpeg.writeFile(inputName, await fetchFile(file));
  
  // Determine conversion parameters
  let args = ['-i', inputName];
  
  const format = targetFormat.toLowerCase();
  
  // Audio conversions
  if (['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'].includes(format)) {
    switch (format) {
      case 'mp3':
        args.push('-codec:a', 'libmp3lame', '-b:a', '192k');
        break;
      case 'wav':
        args.push('-codec:a', 'pcm_s16le');
        break;
      case 'ogg':
        args.push('-codec:a', 'libvorbis', '-q:a', '5');
        break;
      case 'aac':
        args.push('-codec:a', 'aac', '-b:a', '192k');
        break;
      case 'flac':
        args.push('-codec:a', 'flac');
        break;
      case 'm4a':
        args.push('-codec:a', 'aac', '-b:a', '192k');
        break;
    }
  }
  
  // Video conversions
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm', 'gif'].includes(format)) {
    switch (format) {
      case 'mp4':
        args.push('-codec:v', 'libx264', '-preset', 'medium', '-crf', '23', '-codec:a', 'aac');
        break;
      case 'avi':
        args.push('-codec:v', 'mpeg4', '-q:v', '5', '-codec:a', 'libmp3lame');
        break;
      case 'mov':
        args.push('-codec:v', 'libx264', '-codec:a', 'aac');
        break;
      case 'webm':
        args.push('-codec:v', 'libvpx', '-codec:a', 'libvorbis');
        break;
      case 'gif':
        args.push('-vf', 'fps=10,scale=320:-1:flags=lanczos', '-loop', '0');
        break;
      default:
        args.push('-codec:v', 'copy', '-codec:a', 'copy');
    }
  }
  
  args.push(outputName);
  
  // Execute conversion
  await ffmpeg.exec(args);
  
  // Read output file
  const data = await ffmpeg.readFile(outputName);
  
  // Clean up
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);
  
  // Convert to Blob
  const blob = new Blob([data.buffer], { type: getMimeType(format) });
  return blob;
}

function getMimeType(format) {
  const mimeTypes = {
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    aac: 'audio/aac',
    flac: 'audio/flac',
    m4a: 'audio/mp4',
    mp4: 'video/mp4',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    wmv: 'video/x-ms-wmv',
    flv: 'video/x-flv',
    mkv: 'video/x-matroska',
    webm: 'video/webm',
    gif: 'image/gif',
  };
  
  return mimeTypes[format.toLowerCase()] || 'application/octet-stream';
}
