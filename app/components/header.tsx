import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

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
          alt='Franco Canzani letters'
          className='cursor-pointer'
        />
      </Link>
      <div className='flex items-center'>
        <section className='flex px-8 py-3'>
          <div className='flex items-center justify-evenly'>
            <a
              href='https://www.linkedin.com/in/franco-canzani/'
              target='blank'
            >
              <Image
                src='./AkarIconsLinkedinv1Fill.svg'
                width={20}
                height={20}
                alt='Linkedin link'
                className='mr-2 hover:opacity-80'
              />
            </a>

            <a href='https://github.com/FrancoCanzani' target='blank'>
              <Image
                src='./MdiGithub.svg'
                width={20}
                height={20}
                alt='Github link'
                className='ml-2 hover:opacity-80'
              />
            </a>
          </div>
        </section>
        <section className='flex cursor-pointer items-center font-bold text-white'>
          <a
            className='mr-3 bg-black px-4 py-2 hover:bg-orange-400 lg:px-8'
            href='https://cal.com/francocanzani'
            target='blank'
          >
            Book a Meeting
          </a>
          <Link
            className='hidden bg-black px-7 py-2 hover:bg-purple-400 md:flex'
            href={'/blog'}
          >
            Blog
          </Link>
        </section>
      </div>
    </header>
  );
}
