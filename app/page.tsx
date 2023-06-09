'use client';

import Header from './components/header';
import About from './components/about';

export default function Home() {
  return (
    <main className='h-screen'>
      <Header />
      <About />
    </main>
  );
}
