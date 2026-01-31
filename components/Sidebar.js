'use client';

import { useState } from 'react';
import { Home, Image, Music, Youtube, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Image, label: 'Image', href: '/image' },
  { icon: Music, label: 'Media', href: '/media' },
  { icon: Youtube, label: 'YouTube', href: '/youtube' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 border border-slate-800 rounded-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar - No logo, just navigation */}
      <aside className={`fixed top-0 left-0 h-screen w-16 bg-slate-900 border-r border-slate-800 z-40 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full items-center py-6">
          {/* Navigation - icons only */}
          <nav className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
