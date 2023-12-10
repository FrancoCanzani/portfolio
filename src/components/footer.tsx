import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='m-auto min-w-full flex items-center justify-between'>
      <p>Made with NextJS, deployed on Vercel ▴</p>
      <div className='flex items-center justify-center gap-x-2'>
        <Link href={'https://twitter.com/ControlControlV'} target='_blank'>
          <Image
            src={'/media/X_logo_2023_(white).png'}
            alt='X logo'
            width={20}
            height={20}
          />
        </Link>
        <Link
          href={'https://ar.linkedin.com/in/franco-canzani'}
          target='_blank'
        >
          <Image
            src={'/media/linkedin.png'}
            alt='X logo'
            width={20}
            height={20}
          />
        </Link>
      </div>
    </footer>
  );
}
