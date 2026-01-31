'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-300 ${theme === 'light' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`} />
        <Moon className={`absolute inset-0 w-6 h-6 text-indigo-400 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
      </div>
    </button>
  );
}
