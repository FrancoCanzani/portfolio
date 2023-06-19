'use client';

import './globals.css';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import Header from './components/header';
import Footer from './components/footer';

export const metadata = {
  title: 'Franco Canzani | Frontend Dev',
  description: 'Frontend Dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className + ' flex min-h-screen flex-col'}>
        <Header />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
