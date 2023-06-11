'use client';

import Header from './components/header';
import About from './components/about';
import Skills from './components/skills';

export default function Home() {
  return (
    <main className='h-screen w-full'>
      <Header />
      <About />
      <Skills />
    </main>
  );
}
