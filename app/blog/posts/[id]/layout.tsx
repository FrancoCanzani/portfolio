import Image from 'next/image';
import Link from 'next/link';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='px-6 sm:px-24 md:px-28 lg:px-36'>
      <Link
        href={'/blog'}
        className='flex items-center text-xs capitalize hover:underline'
      >
        <Image
          src={'/PhArrowLeftThin.svg'}
          alt='Left arrow'
          width={18}
          height={18}
          className='mr-1'
        ></Image>
        Back to posts
      </Link>
      {children}
    </section>
  );
}
