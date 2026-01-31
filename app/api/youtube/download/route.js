import { NextResponse } from 'next/server';

// YouTube downloads require server-side processing with yt-dlp or youtube-dl
// These tools cannot run in serverless environments like Vercel without additional setup

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
  return addCorsHeaders(NextResponse.json(
    { 
      error: 'YouTube downloads require a dedicated backend server with yt-dlp installed. This feature is not available in serverless deployments. Please use the image and media converters which work fully in the browser!' 
    },
    { status: 503 }
  ));
}

export async function GET(request) {
  return addCorsHeaders(NextResponse.json(
    { 
      error: 'YouTube downloads require a dedicated backend server with yt-dlp installed. This feature is not available in serverless deployments. Please use the image and media converters which work fully in the browser!' 
    },
    { status: 503 }
  ));
}
