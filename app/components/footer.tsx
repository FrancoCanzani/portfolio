import Image from 'next/image';

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className='flex w-full items-center justify-center bg-white py-3 text-xs'>
      <span className='mr-4'>Franco Canzani {year}</span>
    </footer>
  );
}
