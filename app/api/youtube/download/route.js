import youtubedl from 'youtube-dl-exec';
import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { readFileSync } from 'fs';
import path from 'path';
import { tmpdir } from 'os';

// Helper to add CORS headers
function addCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  return addCorsHeaders(new NextResponse(null, { status: 200 }));
}

export async function POST(request) {
  let outputPath = null;
  
  try {
    const { url, format } = await request.json();
    
    if (!url) {
      return addCorsHeaders(NextResponse.json({ error: 'URL is required' }, { status: 400 }));
    }
    
    // Validate YouTube URL
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return addCorsHeaders(NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 }));
    }
    
    const formatLower = format.toLowerCase();
    const tempDir = tmpdir();
    const timestamp = Date.now();
    outputPath = path.join(tempDir, `youtube_${timestamp}.%(ext)s`);
    
    // Download options
    const options = {
      output: outputPath,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      ]
    };
    
    // Format-specific options
    if (['mp3', 'wav', 'aac', 'flac'].includes(formatLower)) {
      // Audio only
      options.extractAudio = true;
      options.audioFormat = formatLower === 'mp3' ? 'mp3' : formatLower;
      options.audioQuality = 0; // Best quality
    } else {
      // Video
      options.format = 'best';
      if (formatLower === 'mp4') {
        options.mergeOutputFormat = 'mp4';
      }
    }
    
    // Execute download
    await youtubedl(url, options);
    
    // Find the downloaded file
    const actualPath = outputPath.replace('.%(ext)s', `.${formatLower}`);
    const buffer = readFileSync(actualPath);
    
    // Clean up
    await unlink(actualPath);
    
    // Determine content type
    let contentType;
    switch (formatLower) {
      case 'mp3':
        contentType = 'audio/mpeg';
        break;
      case 'mp4':
        contentType = 'video/mp4';
        break;
      case 'wav':
        contentType = 'audio/wav';
        break;
      case 'webm':
        contentType = 'video/webm';
        break;
      default:
        contentType = 'video/mp4';
    }
    
    // Return file
    const response = new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="video.${formatLower}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
    
    return addCorsHeaders(response);
    
  } catch (error) {
    console.error('YouTube download error:', error);
    
    // Clean up on error
    if (outputPath) {
      try {
        const actualPath = outputPath.replace('.%(ext)s', `.${format.toLowerCase()}`);
        await unlink(actualPath);
      } catch {}
    }
    
    return addCorsHeaders(NextResponse.json(
      { error: error.message || 'Failed to download video. Please try again.' },
      { status: 500 }
    ));
  }
}

// GET endpoint to get video info
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return addCorsHeaders(NextResponse.json({ error: 'URL is required' }, { status: 400 }));
    }
    
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return addCorsHeaders(NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 }));
    }
    
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
    });
    
    return addCorsHeaders(NextResponse.json({
      title: info.title,
      duration: info.duration,
      thumbnail: info.thumbnail,
      author: info.uploader || info.channel,
    }));
    
  } catch (error) {
    console.error('YouTube info error:', error);
    return addCorsHeaders(NextResponse.json(
      { error: error.message || 'Failed to get video info.' },
      { status: 500 }
    ));
  }
}
