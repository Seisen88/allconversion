'use client';

import { use, useState } from 'react';
import { Download, Loader2, ArrowLeft, CheckCircle, Video } from 'lucide-react';
import Link from 'next/link';

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
    
    setError('');
    setIsProcessing(true);
    setDownloadProgress('Fetching video info...');
    
    try {
      const response = await fetch(`/api/youtube/download?url=${encodeURIComponent(url)}`);
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
      const response = await fetch('/api/youtube/download', {
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
        <Link href="/youtube" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to YouTube Downloads
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">YouTube to {to}</h1>
          <p className="text-lg text-slate-400">
            Download YouTube videos as {to} format
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-3">YouTube URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !videoInfo && fetchVideoInfo()}
              placeholder="https://youtube.com/watch?v=..."
              className="input-field"
              disabled={isProcessing}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-950/30 border border-red-900 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {downloadProgress && (
            <div className="p-4 bg-blue-950/30 border border-blue-900 rounded-lg">
              <p className="text-sm text-blue-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {downloadProgress}
              </p>
            </div>
          )}

          {!videoInfo && (
            <button 
              onClick={fetchVideoInfo} 
              disabled={isProcessing || !url} 
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
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
                {videoInfo.thumbnail && (
                  <img 
                    src={videoInfo.thumbnail} 
                    alt={videoInfo.title}
                    className="w-full rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{videoInfo.title}</h3>
                  <p className="text-slate-400 text-sm">By {videoInfo.author}</p>
                  <p className="text-slate-500 text-sm mt-1">
                    Duration: {Math.floor(videoInfo.duration / 60)}:{(videoInfo.duration % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 text-sm">
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

          <div className="p-4 bg-blue-950/20 border border-blue-900/50 rounded-lg">
            <p className="text-xs text-blue-400">
              ℹ️ Large videos may take a few minutes to process. Please be patient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
