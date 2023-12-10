'use client';
import React from 'react';
import { useTheme } from 'next-themes';

export function ToggleMode({ text }: { text: string }) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
      className=''
    >
      {text}
    </button>
  );
}
