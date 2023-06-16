import { getSortedPostsData } from '@/lib/posts';

import Link from 'next/link';

export default async function Home() {
  const allPostsData = await getSortedPostsData();

  const colors = [
    'bg-yellow-100',
    'bg-amber-100',
    'bg-red-100',
    'bg-orange-100',
    'bg-lime-100',
    'bg-green-100',
    'bg-emerald-100',
    'bg-cyan-100',
    'bg-indigo-100',
    'bg-pink-100',
    'bg-fuchsia-100',
  ];

  return (
    <section className='p-6 sm:px-24 md:px-28 lg:px-36'>
      <h1 className='bg mb-4 text-4xl font-black'>Blog posts*</h1>
      <ul>
        {allPostsData.map(({ id, title }) => (
          <li
            key={id}
            className={`mb-2 px-1 py-3 font-semibold ${
              colors[Math.floor(Math.random() * 9)]
            }`}
          >
            <Link href={`/blog/posts/${id}`} className='hover:underline'>
              {title}
            </Link>
            <br />
          </li>
        ))}
      </ul>
      <div className='fixed bottom-2'>
        <p className='text-xs'>
          * Disclaimer: Personal notes only, not a resource. Not reliable. Use
          at own risk. No guarantees. Errors possible. Not for decision-making.
          Verify information.
        </p>
      </div>
    </section>
  );
}
