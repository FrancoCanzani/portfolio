'use client';

import About from './components/about';
import Skills from './components/skills';
import Contact from './components/contact';

export default function Home() {
  return (
    <main className='h-screen w-full'>
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
