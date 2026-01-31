'use client';

import { Upload, X } from 'lucide-react';
import { useState } from 'react';

export default function FileDropzone({ 
  onFileSelect, 
  acceptedTypes = 'image/*,video/*,audio/*',
  maxSize = 100 * 1024 * 1024,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    if (file.size > maxSize) {
      setError(`File too large. Max ${maxSize / (1024 * 1024)}MB`);
      return false;
    }
    setError('');
    return true;
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError('');
    onFileSelect(null);
  };

  return (
    <div>
      {!selectedFile ? (
        <label className="block border-2 border-dashed border-slate-700 rounded-lg p-12 text-center cursor-pointer hover:border-slate-600 transition-colors">
          <input
            type="file"
            onChange={handleFileInput}
            accept={acceptedTypes}
            className="hidden"
          />
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-600" />
          <p className="text-white mb-1">Click to upload</p>
          <p className="text-sm text-slate-500">Max {maxSize / (1024 * 1024)}MB</p>
        </label>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-white font-medium">{selectedFile.name}</p>
            <p className="text-sm text-slate-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
          <button onClick={removeFile} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
