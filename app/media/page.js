import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const mediaConversions = [
  // Audio conversions
  { from: 'MP3', to: 'WAV', type: 'audio' },
  { from: 'MP3', to: 'OGG', type: 'audio' },
  { from: 'MP3', to: 'AAC', type: 'audio' },
  { from: 'MP3', to: 'FLAC', type: 'audio' },
  { from: 'MP3', to: 'M4A', type: 'audio' },
  
  { from: 'WAV', to: 'MP3', type: 'audio' },
  { from: 'WAV', to: 'OGG', type: 'audio' },
  { from: 'WAV', to: 'AAC', type: 'audio' },
  { from: 'WAV', to: 'FLAC', type: 'audio' },
  
  { from: 'OGG', to: 'MP3', type: 'audio' },
  { from: 'OGG', to: 'WAV', type: 'audio' },
  
  { from: 'AAC', to: 'MP3', type: 'audio' },
  { from: 'AAC', to: 'WAV', type: 'audio' },
  
  { from: 'FLAC', to: 'MP3', type: 'audio' },
  { from: 'FLAC', to: 'WAV', type: 'audio' },
  
  { from: 'M4A', to: 'MP3', type: 'audio' },
  { from: 'M4A', to: 'WAV', type: 'audio' },
  
  // Video conversions
  { from: 'MP4', to: 'AVI', type: 'video' },
  { from: 'MP4', to: 'MOV', type: 'video' },
  { from: 'MP4', to: 'WMV', type: 'video' },
  { from: 'MP4', to: 'FLV', type: 'video' },
  { from: 'MP4', to: 'MKV', type: 'video' },
  { from: 'MP4', to: 'WEBM', type: 'video' },
  { from: 'MP4', to: 'MP3', type: 'video' },
  { from: 'MP4', to: 'GIF', type: 'video' },
  
  { from: 'AVI', to: 'MP4', type: 'video' },
  { from: 'AVI', to: 'MOV', type: 'video' },
  { from: 'AVI', to: 'WMV', type: 'video' },
  
  { from: 'MOV', to: 'MP4', type: 'video' },
  { from: 'MOV', to: 'AVI', type: 'video' },
  { from: 'MOV', to: 'WMV', type: 'video' },
  { from: 'MOV', to: 'MP3', type: 'video' },
  
  { from: 'WMV', to: 'MP4', type: 'video' },
  { from: 'WMV', to: 'AVI', type: 'video' },
  { from: 'WMV', to: 'MOV', type: 'video' },
  
  { from: 'FLV', to: 'MP4', type: 'video' },
  { from: 'FLV', to: 'AVI', type: 'video' },
  
  { from: 'MKV', to: 'MP4', type: 'video' },
  { from: 'MKV', to: 'AVI', type: 'video' },
  
  { from: 'WEBM', to: 'MP4', type: 'video' },
  { from: 'WEBM', to: 'AVI', type: 'video' },
];

export default function MediaPage() {
  const audioConversions = mediaConversions.filter(c => c.type === 'audio');
  const videoConversions = mediaConversions.filter(c => c.type === 'video');

  return (
    <div className="w-full p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Media Converter</h1>
          <p className="text-lg text-slate-400">
            Choose an audio or video conversion type
          </p>
        </div>

        {/* Audio Conversions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Audio Conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {audioConversions.map((option, index) => (
              <Link
                key={index}
                href={`/convert/media/${option.from.toLowerCase()}-to-${option.to.toLowerCase()}`}
                className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-emerald-600 transition-colors group"
              >
                <div className="flex items-center justify-center gap-2 text-center">
                  <span className="font-bold text-sm text-white">{option.from}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                  <span className="font-bold text-sm text-white">{option.to}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Video Conversions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Video Conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {videoConversions.map((option, index) => (
              <Link
                key={index}
                href={`/convert/media/${option.from.toLowerCase()}-to-${option.to.toLowerCase()}`}
                className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-emerald-600 transition-colors group"
              >
                <div className="flex items-center justify-center gap-2 text-center">
                  <span className="font-bold text-sm text-white">{option.from}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                  <span className="font-bold text-sm text-white">{option.to}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
