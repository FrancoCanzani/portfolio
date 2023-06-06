import Link from 'next/link';
import SocialMediaBox from './socialMediaBox';
import { Staatliches } from 'next/font/google';

const staatliches = Staatliches({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Header() {
  return (
    <header className='sticky top-0 flex flex-wrap items-center border-b-2 border-gray-400 text-xl capitalize'>
      <Link
        href={'/'}
        className='border-r-2 border-gray-400 px-6 py-6 text-center text-2xl font-medium lg:px-20'
      >
        <span className={staatliches.className}>Franco Canzani</span>
      </Link>
      <section className='flex flex-grow items-center justify-center border-r-2 border-gray-400 px-4 py-6 2xl:px-44'>
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
      <section className='hidden items-center justify-center border-r-0 border-gray-400 px-6 py-6 sm:flex md:border-r-2 md:px-16'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
          className='mr-2 md:mr-3'
        >
          <path
            fill='currentColor'
            d='M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21Z'
          />
        </svg>
        <span>Mode</span>
      </section>
      <section className='hidden items-center justify-center px-4 xl:flex xl:px-9'>
        <SocialMediaBox
          iconPath={
            <path
              className='hover:fill-blue-800'
              fillRule='evenodd'
              d='M1 2.838A1.838 1.838 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.838 1.838 0 0 1 21.161 23H2.838A1.838 1.838 0 0 1 1 21.161V2.838Zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708V9.388Zm-5.5 10.403h3.208V9.25H4.208v10.54ZM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0Z'
              clipRule='evenodd'
            />
          }
          link={'https://www.linkedin.com/in/franco-canzani/'}
          name='Linkedin'
        />
        <SocialMediaBox
          iconPath={
            <path
              className='hover:opacity-80'
              fill='currentColor'
              d='M20.116 5.901a3.883 3.883 0 0 0-.26-.31a4.413 4.413 0 0 0 .21-.76a5.284 5.284 0 0 0-.35-2.8s-1.12-.35-3.69 1.38a12.477 12.477 0 0 0-3.35-.45a12.604 12.604 0 0 0-3.36.45c-2.57-1.75-3.69-1.38-3.69-1.38a5.263 5.263 0 0 0-.35 2.77a4.21 4.21 0 0 0 .22.79c-.09.1-.18.21-.26.31a5.14 5.14 0 0 0-1.12 3.3a7.686 7.686 0 0 0 .04.85c.32 4.43 3.27 5.46 6.08 5.78a2.558 2.558 0 0 0-.77 1.39a4.022 4.022 0 0 0-.13 1.09v1.31c-1.119.1-2.267-.063-2.623-1.061a5.695 5.695 0 0 0-1.834-2.413a1.179 1.179 0 0 1-.17-.112a1.001 1.001 0 0 0-.93-.645h-.005a1 1 0 0 0-1 .995c-.003.812.81 1.337 1.143 1.515a4.466 4.466 0 0 1 .923 1.359c.364 1.023 1.429 2.578 4.466 2.376l.002.098l.004.268a1 1 0 0 0 1 1h4.714a1 1 0 0 0 1-1s.008-3.16.008-3.69a4.024 4.024 0 0 0-.13-1.09l-.002-.006l.004.006c-.009-.035-.022-.063-.032-.097a2.532 2.532 0 0 0-.74-1.293l.012.021l-.02-.02c2.81-.32 5.74-1.37 6.06-5.78a7.687 7.687 0 0 0 .04-.85a5.23 5.23 0 0 0-1.11-3.3Z'
            />
          }
          name='Github'
          link='https://github.com/FrancoCanzani'
        />
        <SocialMediaBox
          iconPath={
            <path
              className='hover:fill-blue-600'
              fill='currentColor'
              d='M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z'
            />
          }
          name='Twitter'
          link='https://twitter.com/ControlControlV'
        />
      </section>
    </header>
  );
}
