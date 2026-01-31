import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, format } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }
    
    // Get video info
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s-]/g, '');
    
    // Determine format and quality
    let options = {};
    const formatLower = format.toLowerCase();
    
    if (['mp3', 'wav', 'aac', 'flac'].includes(formatLower)) {
      // Audio only
      options = {
        quality: 'highestaudio',
        filter: 'audioonly',
      };
    } else {
      // Video with audio
      options = {
        quality: 'highest',
        filter: 'audioandvideo',
      };
    }
    
    // Create stream
    const stream = ytdl(url, options);
    
    // Convert stream to buffer
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    // Determine content type
    let contentType;
    let extension;
    
    switch (formatLower) {
      case 'mp3':
        contentType = 'audio/mpeg';
        extension = 'mp3';
        break;
      case 'mp4':
        contentType = 'video/mp4';
        extension = 'mp4';
        break;
      case 'wav':
        contentType = 'audio/wav';
        extension = 'wav';
        break;
      case 'webm':
        contentType = 'video/webm';
        extension = 'webm';
        break;
      default:
        contentType = 'video/mp4';
        extension = 'mp4';
    }
    
    // Return file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${title}.${extension}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error('YouTube download error:', error);
    return NextResponse.json(
      { error: 'Failed to download video. Please check the URL and try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to get video info
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }
    
    const info = await ytdl.getInfo(url);
    
    return NextResponse.json({
      title: info.videoDetails.title,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnails[0]?.url,
      author: info.videoDetails.author.name,
    });
    
  } catch (error) {
    console.error('YouTube info error:', error);
    return NextResponse.json(
      { error: 'Failed to get video info' },
      { status: 500 }
    );
  }
}
