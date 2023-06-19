import Image from 'next/image';

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className='flex w-full items-center justify-center bg-white py-3 text-xs'>
      <span className='mr-4'>Franco Canzani {year}</span>
      <a
        href='https://github.com/FrancoCanzani/portfolio'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center hover:opacity-80'
      >
        <Image
          src='./MdiGithub.svg'
          width={20}
          height={20}
          alt='Github link'
          className='mr-2 hover:text-gray-500'
        />
        Star on GitHub
      </a>
    </footer>
  );
}
