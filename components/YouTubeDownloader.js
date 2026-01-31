'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

export default function YouTubeDownloader() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('MP3');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
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
    await new Promise(resolve => setTimeout(resolve, 3000));
    setReady(true);
    setIsProcessing(false);
  };

  const reset = () => {
    setUrl('');
    setReady(false);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-slate-400 mb-3">YouTube URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="input-field"
          disabled={ready}
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      {!ready && (
        <>
          <div>
            <label className="block text-sm text-slate-400 mb-3">Format</label>
            <div className="grid grid-cols-2 gap-3">
              {['MP3', 'MP4'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-4 py-3 rounded-lg font-medium ${
                    format === f ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleDownload} disabled={isProcessing || !url} className="btn-primary w-full">
            {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin inline mr-2" />Processing...</> : 'Download'}
          </button>
        </>
      )}

      {ready && (
        <div className="bg-slate-900 border border-emerald-900 rounded-lg p-6 space-y-4">
          <p className="text-white font-medium">Ready to download</p>
          <div className="flex gap-3">
            <button onClick={() => alert('Backend required')} className="btn-primary flex-1">
              <Download className="w-5 h-5 inline mr-2" />Download {format}
            </button>
            <button onClick={reset} className="btn-secondary">New</button>
          </div>
        </div>
      )}

      <div className="p-4 bg-yellow-950/20 border border-yellow-900/50 rounded-lg">
        <p className="text-xs text-yellow-500">Backend integration required for YouTube downloads</p>
      </div>
    </div>
  );
}
