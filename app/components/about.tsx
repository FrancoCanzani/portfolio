import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

export default function About() {
  const [isDownloaded, setIsDownloaded] = useState('Download Resume');

  function downloadStatus() {
    if (document.readyState == 'loading') {
      setIsDownloaded('Downloading');
    } else if (document.readyState == 'complete') {
      setIsDownloaded('Completed');
      setTimeout(() => {
        setIsDownloaded('Download Resume');
      }, 3000);
    }
  }

  return (
    <section className='p-6 sm:px-24 md:px-28 lg:px-36'>
      <h1 className='text-4xl font-black'>Franco Canzani</h1>
      <h2 className='mb-4 text-xs capitalize'>Front end developer</h2>
      <a href='https://goo.gl/maps/kj3qRxZa2fR18fPK7' target='blank'>
        🌍
        <span className='ml-1 hover:underline'>Denia, Alicante, Spain</span>
      </a>
      <br />
      <br />
      <p className='xs:leading-normal text-xl font-extralight sm:text-2xl sm:leading-normal md:text-5xl md:leading-normal'>
        {/* The preferred way to include one of these characters is to use the HTML escape code.
        ' can be replaced with &apos;, &lsquo;, &#39; or &rsquo; */}
        I&#39;m a dedicated{' '}
        <span className='underlinedText hover:bg-orange-400'>
          Front End Developer
        </span>{' '}
        who is deeply passionate about writing{' '}
        <span className='underlinedText hover:bg-orange-400'>software</span> and
        creating exceptional{' '}
        <span className='underlinedText hover:bg-orange-400'>
          user interfaces
        </span>
        . With a strong foundation in front end development technologies and a
        drive for continuous learning, I am committed to contributing my skills
        and creativity to help build innovative{' '}
        <span className='underlinedText hover:bg-orange-400'>
          web applications
        </span>
        .
      </p>

      <div className='mt-10'>
        <div className='flex items-center'>
          <span className='mr-1'>Learn more</span>
          <Link
            href={'/'}
            className=' flex items-center underline hover:text-gray-500'
          >
            About Me
            <Image
              src='/diagonalArrow.svg'
              alt='Arrow link'
              width={15}
              height={15}
              className='ml-1'
            />
          </Link>
        </div>
        <br />
        <a
          href='./Franco_Canzani.pdf'
          download
          onClick={downloadStatus}
          className={`flex w-48 items-center justify-center bg-black px-4 py-2 font-bold text-white hover:bg-green-600 ${
            isDownloaded !== 'Download Resume' ? 'animate-pulse' : ''
          }`}
        >
          {isDownloaded}
        </a>
      </div>
    </section>
  );
}
