'use client';

import { use, useState } from 'react';
import { Download, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import FileDropzone from '@/components/FileDropzone';
import { convertMedia } from '@/lib/mediaConverter';

export default function MediaConverterPage({ params }) {
  const { type } = use(params);
  const [from, to] = type.split('-to-').map(s => s.toUpperCase());
  
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [converted, setConverted] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(false);

  const handleConvert = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setIsLoadingFFmpeg(true);
    setError('');
    setProgress(0);
    
    try {
      const blob = await convertMedia(file, to, (prog) => {
        setIsLoadingFFmpeg(false);
        setProgress(prog);
      });
      
      const url = URL.createObjectURL(blob);
      setConverted({ 
        name: `converted.${to.toLowerCase()}`, 
        url,
        blob 
      });
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Conversion failed. Please try again or try a different format.');
    } finally {
      setIsProcessing(false);
      setIsLoadingFFmpeg(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!converted) return;
    const link = document.createElement('a');
    link.href = converted.url;
    link.download = converted.name;
    link.click();
  };

  const reset = () => {
    if (converted?.url) {
      URL.revokeObjectURL(converted.url);
    }
    setFile(null);
    setConverted(null);
    setError('');
    setProgress(0);
  };

  return (
    <div className="w-full p-8 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/media" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Media Conversions
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">{from} to {to}</h1>
          <p className="text-lg text-slate-400">
            Convert your {from} files to {to} format
          </p>
        </div>

        <div className="space-y-6">
          <FileDropzone onFileSelect={setFile} acceptedTypes="audio/*,video/*" maxSize={200 * 1024 * 1024} />

          {error && (
            <div className="p-4 bg-red-950/30 border border-red-900 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {file && !converted && (
            <>
              <button onClick={handleConvert} disabled={isProcessing} className="btn-primary w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                    {isLoadingFFmpeg ? 'Loading converter...' : `Converting to ${to}... ${progress}%`}
                  </>
                ) : (
                  `Convert to ${to}`
                )}
              </button>
              
              {isProcessing && progress > 0 && (
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </>
          )}

          {converted && (
            <div className="bg-slate-900 border border-emerald-900 rounded-lg p-6 space-y-4">
              <p className="text-white font-medium">✓ Converted to {to}</p>
              <div className="flex gap-3">
                <button onClick={handleDownload} className="btn-primary flex-1">
                  <Download className="w-5 h-5 inline mr-2" />Download {to}
                </button>
                <button onClick={reset} className="btn-secondary">Convert Another</button>
              </div>
            </div>
          )}
          
          <div className="p-4 bg-blue-950/20 border border-blue-900/50 rounded-lg">
            <p className="text-xs text-blue-400">
              First conversion may take longer as we load the converter. Subsequent conversions will be faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
