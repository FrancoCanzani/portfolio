import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 border-b-2 text-xl flex items-center border-gray-400 w-full'>
      <Link
        href={'/'}
        className='border-r-2 font-bold text-2xl hover:underline border-gray-400 py-6 px-14'
      >
        Franco Canzani
      </Link>
      <section className='border-r-2 py-6 px-44 border-gray-400'>
        <Link href={'/'} className='mr-10 hover:underline'>
          About
        </Link>
        <Link href={'/'} className='mr-10 hover:underline'>
          Notes
        </Link>
        <Link href={'/'} className='hover:underline'>
          contact
        </Link>
      </section>
      <section className='border-r-2 py-6 px-14 border-gray-400'>Mode</section>
      <section className='py-6 px-14'>
        <Link href={'/'} className='hover:underline'>
          Social media
        </Link>
      </section>
    </header>
  );
}
