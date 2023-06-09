import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import Login from './login';

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  // Adds a shadow to the header when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`bgColor sticky top-0 mb-5 flex w-full items-center justify-between px-8 py-3 text-sm capitalize lg:mb-10 ${
        hasScrolled ? 'shadow-sm shadow-gray-300' : 'shadow-none'
      }`}
    >
      <Link href={'/'}>
        <Image
          src={'/brand/3.png'}
          width={30}
          height={30}
          alt='Franco Canzani brand letters'
          aria-label='Brand logo that links to home page'
          className='cursor-pointer'
        />
      </Link>
      <div className='flex items-center'>
        <nav className='flex cursor-pointer items-center font-bold text-white'>
          <a
            className='mr-3 hidden rounded-sm bg-black px-4 py-2 hover:bg-orange-400 md:flex lg:px-8'
            href='https://cal.com/francocanzani'
            target='blank'
            aria-label='Link to cal.com profile to book a meeting'
          >
            Book a Meeting
          </a>
          <Link
            className='mr-3 rounded-sm bg-black px-7 py-2 hover:bg-purple-400'
            href={'/blog'}
            aria-label='Link to my blog'
          >
            Blog
          </Link>
        </nav>
        <Login />
      </div>
    </header>
  );
}
