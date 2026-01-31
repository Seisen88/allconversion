'use client';

import { useState } from 'react';
import { Image, Music, Youtube } from 'lucide-react';
import ImageConverter from './ImageConverter';
import MediaConverter from './MediaConverter';
import YouTubeDownloader from './YouTubeDownloader';

const TABS = [
  { id: 'image', label: 'Image', icon: Image, component: ImageConverter },
  { id: 'media', label: 'Media', icon: Music, component: MediaConverter },
  { id: 'youtube', label: 'YouTube', icon: Youtube, component: YouTubeDownloader },
];

export default function Converter() {
  const [activeTab, setActiveTab] = useState('image');
  const ActiveComponent = TABS.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}
