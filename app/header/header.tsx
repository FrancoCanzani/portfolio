import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className='sticky top-0 flex items-center text-sm capitalize'>
      <section className='border-b-2 border-r-2 border-gray-400 px-4 py-3 text-center lg:px-16'>
        <Link href={'/'}>
          <h1>Franco Canzani</h1>
        </Link>
      </section>
      <section className='flex flex-grow items-center justify-center border-b-2 border-r-2 border-gray-400 px-4 py-3 2xl:px-32'>
        <Link href={'/'} className='mr-4 hover:underline md:mr-10'>
          About
        </Link>
        <Link href={'/'} className='mr-4 hover:underline md:mr-10'>
          Notes
        </Link>
        <Link href={'/'} className='hover:underline'>
          Contact
        </Link>
      </section>
      <section className='hidden cursor-pointer border-b-2 border-r-2 border-gray-400 bg-orange-400 px-8 py-3 hover:bg-orange-300 lg:flex'>
        <a href='https://cal.com/francocanzani'>Book an interview</a>
      </section>
      <section className='hidden border-b-2 border-r-2 border-gray-400 px-8 py-3 md:flex'>
        <div className='flex items-center justify-evenly'>
          <a href='https://www.linkedin.com/in/franco-canzani/' target='blank'>
            <Image
              src='./AkarIconsLinkedinv1Fill.svg'
              width={20}
              height={20}
              alt='Linkedin link'
              className='mr-2'
            />
          </a>

          <a href='https://github.com/FrancoCanzani' target='blank'>
            <Image
              src='./MdiGithub.svg'
              width={20}
              height={20}
              alt='Github link'
              className='ml-2'
            />
          </a>
        </div>
        <div></div>
      </section>
      <section className='hidden items-center justify-center border-b-2 border-gray-400 px-8 py-3 sm:flex'>
        <button className='flex items-center'>
          <Image
            src='/MaterialSymbolsDarkMode.svg'
            alt='Dark/Light mode icon'
            width={20}
            height={20}
          />
          <span className='ml-2 hover:underline'>Mode</span>
        </button>
      </section>
    </header>
  );
}
