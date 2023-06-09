import Link from 'next/link';
import { useState } from 'react';
export default function About() {
  const [isDownloaded, setIsDownloaded] = useState(undefined);

  return (
    <section className='p-6 sm:px-24 md:px-28 lg:px-36'>
      <h1 className='text-3xl font-black'>Franco Canzani</h1>
      <h2 className='mb-2 text-xs capitalize'>Front end developer</h2>
      <a
        href='https://goo.gl/maps/kj3qRxZa2fR18fPK7'
        target='blank'
        className=''
      >
        🌍
        <span className='ml-1 hover:underline'>Denia, Alicante, Spain</span>
      </a>
      <br />
      <br />
      <p className='xs:leading-normal text-xl font-extralight sm:text-2xl sm:leading-normal md:text-4xl md:leading-normal'>
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
        Learn more{' '}
        <Link href={'/'} className='underline'>
          About me
        </Link>
        <br />
        <a
          href='./Franco_Canzani.pdf'
          download
          className='mt-1 flex w-48 items-center justify-center bg-black px-4 py-2 font-bold text-white hover:bg-green-600'
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
