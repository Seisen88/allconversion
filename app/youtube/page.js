import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const youtubeConversions = [
  { from: 'YouTube', to: 'MP3' },
  { from: 'YouTube', to: 'MP4' },
  { from: 'YouTube', to: 'WAV' },
  { from: 'YouTube', to: 'AVI' },
  { from: 'YouTube', to: 'MOV' },
  { from: 'YouTube', to: 'WEBM' },
  { from: 'YouTube', to: 'AAC' },
  { from: 'YouTube', to: 'FLAC' },
];

export default function YouTubePage() {
  return (
    <div className="w-full p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">YouTube Downloader</h1>
          <p className="text-lg text-slate-400">
            Choose a download format for YouTube videos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {youtubeConversions.map((option, index) => (
            <Link
              key={index}
              href={`/convert/youtube/youtube-to-${option.to.toLowerCase()}`}
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
  );
}
