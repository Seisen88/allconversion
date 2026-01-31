'use client';

import { use, useState } from 'react';
import { Download, Loader2, ArrowLeft, CheckCircle, Video, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_YOUTUBE_API_URL || '';

export default function YouTubeConverterPage({ params }) {
  const { type } = use(params);
  const [, to] = type.split('-to-').map(s => s.toUpperCase());
  
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState('');
  const [downloadProgress, setDownloadProgress] = useState('');

  const fetchVideoInfo = async () => {
    if (!url) {
      setError('Enter a URL');
      return;
    }
    
    if (!/youtube\.com|youtu\.be/.test(url)) {
      setError('Invalid YouTube URL');
      return;
    }

    if (!BACKEND_URL) {
      setError('Backend not configured. Please deploy the backend first and set NEXT_PUBLIC_YOUTUBE_API_URL');
      return;
    }
    
    setError('');
    setIsProcessing(true);
    setDownloadProgress('Fetching video info...');
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/info?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video info');
      }
      
      setVideoInfo(data);
      setDownloadProgress('');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to fetch video info. Please check the URL.');
      setVideoInfo(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    setError('');
    setDownloadProgress('Preparing download...');
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          format: to.toLowerCase(),
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Download failed');
      }
      
      setDownloadProgress('Downloading...');
      
      // Get the blob
      const blob = await response.blob();
      
      // Create download link
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${videoInfo.title}.${to.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
      
      setDownloadProgress('Download complete!');
      setTimeout(() => {
        setDownloadProgress('');
      }, 3000);
      
    } catch (err) {
      console.error('Download error:', err);
      setError(err.message || 'Download failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setUrl('');
    setVideoInfo(null);
    setError('');
    setDownloadProgress('');
  };

  return (
    <div className="w-full p-8 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/youtube" className="inline-flex items-center gap-2 mb-8 transition-colors" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-4 h-4" />
          Back to YouTube Downloads
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">YouTube to {to}</h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Download YouTube videos as {to} format
          </p>
        </div>

        <div className="space-y-6">
          {!BACKEND_URL && (
            <div className="p-6 rounded-xl" style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--destructive)',
            }}>
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--destructive)' }} />
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--destructive)' }}>Backend Not Configured</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                    YouTube downloads require a separate backend server. Please deploy the backend and set the <code>NEXT_PUBLIC_YOUTUBE_API_URL</code> environment variable.
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    See <code>/backend/README.md</code> for deployment instructions.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>YouTube URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !videoInfo && fetchVideoInfo()}
              placeholder="https://youtube.com/watch?v=..."
              className="input-field"
              disabled={isProcessing || !BACKEND_URL}
            />
          </div>

          {error && (
            <div className="p-4 rounded-lg" style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--destructive)',
            }}>
              <p className="text-sm" style={{ color: 'var(--destructive)' }}>{error}</p>
            </div>
          )}

          {downloadProgress && (
            <div className="p-4 rounded-lg" style={{
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid var(--tertiary)',
            }}>
              <p className="text-sm flex items-center gap-2" style={{ color: 'var(--tertiary)' }}>
                <Loader2 className="w-4 h-4 animate-spin" />
                {downloadProgress}
              </p>
            </div>
          )}

          {!videoInfo && (
            <button 
              onClick={fetchVideoInfo} 
              disabled={isProcessing || !url || !BACKEND_URL} 
              className="btn-primary w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Video className="w-5 h-5 inline mr-2" />
                  Get Video Info
                </>
              )}
            </button>
          )}

          {videoInfo && (
            <>
              <div className="card">
                {videoInfo.thumbnail && (
                  <img 
                    src={videoInfo.thumbnail} 
                    alt={videoInfo.title}
                    className="w-full rounded-lg mb-4"
                  />
                )}
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{videoInfo.title}</h3>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>By {videoInfo.author}</p>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    Duration: {Math.floor(videoInfo.duration / 60)}:{(videoInfo.duration % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: 'var(--tertiary)' }}>
                  <CheckCircle className="w-4 h-4" />
                  Ready to download as {to}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleDownload} 
                  disabled={isProcessing} 
                  className="btn-primary flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 inline mr-2" />
                      Download as {to}
                    </>
                  )}
                </button>
                <button onClick={reset} className="btn-secondary">
                  New Download
                </button>
              </div>
            </>
          )}

          <div className="p-4 rounded-lg" style={{
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid var(--tertiary)',
          }}>
            <p className="text-xs" style={{ color: 'var(--tertiary)' }}>
              ℹ️ Large videos may take a few minutes to process. Please be patient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
