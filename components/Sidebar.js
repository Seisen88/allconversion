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
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg transition-all"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-primary)',
        }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-20 z-40 transition-transform border-r ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border-primary)',
        }}
      >
        <div className="flex flex-col h-full items-center py-8">
          {/* Navigation - Centered */}
          <nav className="flex-1 flex flex-col items-center justify-center space-y-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="relative group"
                  title={item.label}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive 
                        ? 'scale-110' 
                        : 'hover:scale-105'
                    }`}
                    style={{
                      background: isActive 
                        ? 'var(--primary)' 
                        : 'var(--bg-tertiary)',
                      border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border-primary)'}`,
                      boxShadow: isActive 
                        ? '0 4px 12px rgba(59, 130, 246, 0.4)' 
                        : 'none',
                    }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  
                  {/* Tooltip */}
                  <div 
                    className="absolute left-full ml-4 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-primary)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer indicator */}
          <div className="mt-auto">
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--tertiary)',
                boxShadow: '0 0 8px var(--tertiary)',
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
