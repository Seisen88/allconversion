import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const imageConversions = [
  { from: 'PNG', to: 'JPG' },
  { from: 'PNG', to: 'WEBP' },
  { from: 'PNG', to: 'GIF' },
  { from: 'PNG', to: 'SVG' },
  { from: 'PNG', to: 'BMP' },
  { from: 'PNG', to: 'TIFF' },
  { from: 'PNG', to: 'ICO' },
  
  { from: 'JPG', to: 'PNG' },
  { from: 'JPG', to: 'WEBP' },
  { from: 'JPG', to: 'GIF' },
  { from: 'JPG', to: 'BMP' },
  { from: 'JPG', to: 'TIFF' },
  { from: 'JPG', to: 'ICO' },
  
  { from: 'WEBP', to: 'PNG' },
  { from: 'WEBP', to: 'JPG' },
  { from: 'WEBP', to: 'GIF' },
  { from: 'WEBP', to: 'BMP' },
  
  { from: 'GIF', to: 'PNG' },
  { from: 'GIF', to: 'JPG' },
  { from: 'GIF', to: 'WEBP' },
  { from: 'GIF', to: 'MP4' },
  
  { from: 'SVG', to: 'PNG' },
  { from: 'SVG', to: 'JPG' },
  
  { from: 'BMP', to: 'PNG' },
  { from: 'BMP', to: 'JPG' },
  
  { from: 'TIFF', to: 'PNG' },
  { from: 'TIFF', to: 'JPG' },
  
  { from: 'HEIC', to: 'PNG' },
  { from: 'HEIC', to: 'JPG' },
];

export default function ImagePage() {
  return (
    <div className="w-full p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Image Converter</h1>
          <p className="text-lg text-slate-400">
            Choose an image conversion type
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {imageConversions.map((option, index) => (
            <Link
              key={index}
              href={`/convert/image/${option.from.toLowerCase()}-to-${option.to.toLowerCase()}`}
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
