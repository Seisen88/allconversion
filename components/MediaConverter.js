'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import FileDropzone from './FileDropzone';

const FORMATS = ['MP3', 'WAV', 'MP4', 'MOV'];

export default function MediaConverter() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('MP3');
  const [isProcessing, setIsProcessing] = useState(false);
  const [converted, setConverted] = useState(null);

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setConverted({ name: `converted.${format.toLowerCase()}`, url: URL.createObjectURL(file) });
    setIsProcessing(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = converted.url;
    link.download = converted.name;
    link.click();
  };

  const reset = () => {
    setFile(null);
    setConverted(null);
  };

  return (
    <div className="space-y-6">
      <FileDropzone onFileSelect={setFile} acceptedTypes="audio/*,video/*" maxSize={200 * 1024 * 1024} />

      {file && !converted && (
        <>
          <div>
            <label className="block text-sm text-slate-400 mb-3">Format</label>
            <div className="grid grid-cols-4 gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    format === f ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleConvert} disabled={isProcessing} className="btn-primary w-full">
            {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin inline mr-2" />Converting...</> : 'Convert'}
          </button>
        </>
      )}

      {converted && (
        <div className="bg-slate-900 border border-emerald-900 rounded-lg p-6 space-y-4">
          <p className="text-white font-medium">Ready to download</p>
          <div className="flex gap-3">
            <button onClick={handleDownload} className="btn-primary flex-1">
              <Download className="w-5 h-5 inline mr-2" />Download
            </button>
            <button onClick={reset} className="btn-secondary">New</button>
          </div>
        </div>
      )}
    </div>
  );
}
