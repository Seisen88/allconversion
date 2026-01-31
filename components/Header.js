'use client';

import { Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">All Converter</span>
          </div>
        </div>
      </div>
    </header>
  );
}
