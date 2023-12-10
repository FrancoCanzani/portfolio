'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
export function ToggleMode() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label='toggle mode'
      onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {theme == 'light' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
