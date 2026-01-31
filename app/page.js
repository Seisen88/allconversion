import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const conversionOptions = [
  // Image conversions - All combinations
  { from: 'PNG', to: 'JPG', href: '/convert/image/png-to-jpg', category: 'Image' },
  { from: 'PNG', to: 'WEBP', href: '/convert/image/png-to-webp', category: 'Image' },
  { from: 'PNG', to: 'GIF', href: '/convert/image/png-to-gif', category: 'Image' },
  { from: 'PNG', to: 'SVG', href: '/convert/image/png-to-svg', category: 'Image' },
  { from: 'PNG', to: 'BMP', href: '/convert/image/png-to-bmp', category: 'Image' },
  { from: 'PNG', to: 'TIFF', href: '/convert/image/png-to-tiff', category: 'Image' },
  { from: 'PNG', to: 'ICO', href: '/convert/image/png-to-ico', category: 'Image' },
  
  { from: 'JPG', to: 'PNG', href: '/convert/image/jpg-to-png', category: 'Image' },
  { from: 'JPG', to: 'WEBP', href: '/convert/image/jpg-to-webp', category: 'Image' },
  { from: 'JPG', to: 'GIF', href: '/convert/image/jpg-to-gif', category: 'Image' },
  { from: 'JPG', to: 'BMP', href: '/convert/image/jpg-to-bmp', category: 'Image' },
  { from: 'JPG', to: 'TIFF', href: '/convert/image/jpg-to-tiff', category: 'Image' },
  { from: 'JPG', to: 'ICO', href: '/convert/image/jpg-to-ico', category: 'Image' },
  
  { from: 'WEBP', to: 'PNG', href: '/convert/image/webp-to-png', category: 'Image' },
  { from: 'WEBP', to: 'JPG', href: '/convert/image/webp-to-jpg', category: 'Image' },
  { from: 'WEBP', to: 'GIF', href: '/convert/image/webp-to-gif', category: 'Image' },
  { from: 'WEBP', to: 'BMP', href: '/convert/image/webp-to-bmp', category: 'Image' },
  
  { from: 'GIF', to: 'PNG', href: '/convert/image/gif-to-png', category: 'Image' },
  { from: 'GIF', to: 'JPG', href: '/convert/image/gif-to-jpg', category: 'Image' },
  { from: 'GIF', to: 'WEBP', href: '/convert/image/gif-to-webp', category: 'Image' },
  { from: 'GIF', to: 'MP4', href: '/convert/image/gif-to-mp4', category: 'Image' },
  
  { from: 'SVG', to: 'PNG', href: '/convert/image/svg-to-png', category: 'Image' },
  { from: 'SVG', to: 'JPG', href: '/convert/image/svg-to-jpg', category: 'Image' },
  
  { from: 'BMP', to: 'PNG', href: '/convert/image/bmp-to-png', category: 'Image' },
  { from: 'BMP', to: 'JPG', href: '/convert/image/bmp-to-jpg', category: 'Image' },
  
  { from: 'TIFF', to: 'PNG', href: '/convert/image/tiff-to-png', category: 'Image' },
  { from: 'TIFF', to: 'JPG', href: '/convert/image/tiff-to-jpg', category: 'Image' },
  
  { from: 'HEIC', to: 'PNG', href: '/convert/image/heic-to-png', category: 'Image' },
  { from: 'HEIC', to: 'JPG', href: '/convert/image/heic-to-jpg', category: 'Image' },
  
  // Audio conversions
  { from: 'MP3', to: 'WAV', href: '/convert/media/mp3-to-wav', category: 'Media' },
  { from: 'MP3', to: 'OGG', href: '/convert/media/mp3-to-ogg', category: 'Media' },
  { from: 'MP3', to: 'AAC', href: '/convert/media/mp3-to-aac', category: 'Media' },
  { from: 'MP3', to: 'FLAC', href: '/convert/media/mp3-to-flac', category: 'Media' },
  { from: 'MP3', to: 'M4A', href: '/convert/media/mp3-to-m4a', category: 'Media' },
  
  { from: 'WAV', to: 'MP3', href: '/convert/media/wav-to-mp3', category: 'Media' },
  { from: 'WAV', to: 'OGG', href: '/convert/media/wav-to-ogg', category: 'Media' },
  { from: 'WAV', to: 'AAC', href: '/convert/media/wav-to-aac', category: 'Media' },
  { from: 'WAV', to: 'FLAC', href: '/convert/media/wav-to-flac', category: 'Media' },
  
  { from: 'OGG', to: 'MP3', href: '/convert/media/ogg-to-mp3', category: 'Media' },
  { from: 'OGG', to: 'WAV', href: '/convert/media/ogg-to-wav', category: 'Media' },
  
  { from: 'AAC', to: 'MP3', href: '/convert/media/aac-to-mp3', category: 'Media' },
  { from: 'AAC', to: 'WAV', href: '/convert/media/aac-to-wav', category: 'Media' },
  
  { from: 'FLAC', to: 'MP3', href: '/convert/media/flac-to-mp3', category: 'Media' },
  { from: 'FLAC', to: 'WAV', href: '/convert/media/flac-to-wav', category: 'Media' },
  
  { from: 'M4A', to: 'MP3', href: '/convert/media/m4a-to-mp3', category: 'Media' },
  { from: 'M4A', to: 'WAV', href: '/convert/media/m4a-to-wav', category: 'Media' },
  
  // Video conversions
  { from: 'MP4', to: 'AVI', href: '/convert/media/mp4-to-avi', category: 'Media' },
  { from: 'MP4', to: 'MOV', href: '/convert/media/mp4-to-mov', category: 'Media' },
  { from: 'MP4', to: 'WMV', href: '/convert/media/mp4-to-wmv', category: 'Media' },
  { from: 'MP4', to: 'FLV', href: '/convert/media/mp4-to-flv', category: 'Media' },
  { from: 'MP4', to: 'MKV', href: '/convert/media/mp4-to-mkv', category: 'Media' },
  { from: 'MP4', to: 'WEBM', href: '/convert/media/mp4-to-webm', category: 'Media' },
  { from: 'MP4', to: 'MP3', href: '/convert/media/mp4-to-mp3', category: 'Media' },
  { from: 'MP4', to: 'GIF', href: '/convert/media/mp4-to-gif', category: 'Media' },
  
  { from: 'AVI', to: 'MP4', href: '/convert/media/avi-to-mp4', category: 'Media' },
  { from: 'AVI', to: 'MOV', href: '/convert/media/avi-to-mov', category: 'Media' },
  { from: 'AVI', to: 'WMV', href: '/convert/media/avi-to-wmv', category: 'Media' },
  
  { from: 'MOV', to: 'MP4', href: '/convert/media/mov-to-mp4', category: 'Media' },
  { from: 'MOV', to: 'AVI', href: '/convert/media/mov-to-avi', category: 'Media' },
  { from: 'MOV', to: 'WMV', href: '/convert/media/mov-to-wmv', category: 'Media' },
  { from: 'MOV', to: 'MP3', href: '/convert/media/mov-to-mp3', category: 'Media' },
  
  { from: 'WMV', to: 'MP4', href: '/convert/media/wmv-to-mp4', category: 'Media' },
  { from: 'WMV', to: 'AVI', href: '/convert/media/wmv-to-avi', category: 'Media' },
  { from: 'WMV', to: 'MOV', href: '/convert/media/wmv-to-mov', category: 'Media' },
  
  { from: 'FLV', to: 'MP4', href: '/convert/media/flv-to-mp4', category: 'Media' },
  { from: 'FLV', to: 'AVI', href: '/convert/media/flv-to-avi', category: 'Media' },
  
  { from: 'MKV', to: 'MP4', href: '/convert/media/mkv-to-mp4', category: 'Media' },
  { from: 'MKV', to: 'AVI', href: '/convert/media/mkv-to-avi', category: 'Media' },
  
  { from: 'WEBM', to: 'MP4', href: '/convert/media/webm-to-mp4', category: 'Media' },
  { from: 'WEBM', to: 'AVI', href: '/convert/media/webm-to-avi', category: 'Media' },
  
  // YouTube
  { from: 'YouTube', to: 'MP3', href: '/convert/youtube/youtube-to-mp3', category: 'YouTube' },
  { from: 'YouTube', to: 'MP4', href: '/convert/youtube/youtube-to-mp4', category: 'YouTube' },
  { from: 'YouTube', to: 'WAV', href: '/convert/youtube/youtube-to-wav', category: 'YouTube' },
  { from: 'YouTube', to: 'AVI', href: '/convert/youtube/youtube-to-avi', category: 'YouTube' },
];

export default function Home() {
  const imageConversions = conversionOptions.filter(opt => opt.category === 'Image');
  const mediaConversions = conversionOptions.filter(opt => opt.category === 'Media');
  const youtubeConversions = conversionOptions.filter(opt => opt.category === 'YouTube');

  return (
    <div className="w-full p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">All Converter</h1>
          <p className="text-lg text-slate-400">
            Choose a conversion type to get started
          </p>
        </div>

        {/* Image Conversions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Image Conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {imageConversions.map((option, index) => (
              <Link
                key={index}
                href={option.href}
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

        {/* Media Conversions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Audio & Video Conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {mediaConversions.map((option, index) => (
              <Link
                key={index}
                href={option.href}
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

        {/* YouTube Downloads */}
        <div>
          <h2 className="text-2xl font-bold mb-6">YouTube Downloads</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {youtubeConversions.map((option, index) => (
              <Link
                key={index}
                href={option.href}
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
