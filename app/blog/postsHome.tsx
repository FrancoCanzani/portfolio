'use client';

import Link from 'next/link';
import Image from 'next/image';

import { FormEvent, useState } from 'react';

interface PostData {
  id: string;
  title: string;
}

interface PostsHomeProps {
  allPostsData: PostData[];
}

export default function PostsHome({ allPostsData }: PostsHomeProps) {
  const [searchParam, setSearchParam] = useState('');

  function handleSearch(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setSearchParam(event.currentTarget.value);
  }

  const filteredPosts = allPostsData.filter(({ title }) =>
    title.toLowerCase().includes(searchParam?.toLowerCase())
  );

  const colors = [
    'bg-gray-100',
    'bg-red-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-indigo-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-orange-100',
    'bg-teal-100',
    'bg-cyan-100',
  ];

  return (
    <section className='px-6 sm:px-24 md:px-28 lg:px-36'>
      <Link
        href={'/'}
        className='flex items-center text-xs capitalize hover:underline'
      >
        <Image
          src={'/PhArrowLeftThin.svg'}
          alt='Left arrow'
          width={18}
          height={18}
          className='mr-1'
        ></Image>
        Back to home
      </Link>{' '}
      <h1 className='bg mb-2 py-6 text-4xl font-black'>Blog Posts*</h1>
      <form className='mb-4 flex flex-col items-start pb-6'>
        <input
          type='search'
          name='titleSearch'
          id='titleSearch'
          autoFocus
          className='rounded-sm px-4 py-2'
          placeholder='Search for any title'
          onChange={handleSearch}
          autoComplete='off'
          alt='searchbox'
          aria-label='Search for any title'
        />
      </form>
      <ul>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, title }) => (
            <li
              key={id}
              className={`mb-2 rounded-sm px-1 py-3 font-semibold ${
                colors[Math.floor(Math.random() * 9)]
              }`}
            >
              <Link href={`/blog/posts/${id}`} className='hover:underline'>
                {title}
              </Link>
              <br />
            </li>
          ))
        ) : (
          <span>Oops. Nothing written yet</span>
        )}
      </ul>
    </section>
  );
}
