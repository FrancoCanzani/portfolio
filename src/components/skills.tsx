'use client';

import cn from '@/utils/cn';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';

export default function Skills() {
  return (
    <section className='mb-12'>
      <h1 className='text-2xl font-bold dark:text-gray-100 mb-3'>Tech Stack</h1>
      <h2 className='text-sm mb-6'>
        Here is a collection of the stack I use and the resources I keep looking
        up. Nevertheless, this stack is continually evolving because{' '}
        <strong>
          the essence of exceptional software lies not solely within the
          technology itself
        </strong>
      </h2>
      <div className='flex items-center justify-start flex-wrap gap-3 w-full'></div>
    </section>
  );
}

type TechInfo = {
  docs: string;
  logo: string;
};

function Skill({ tech }: { tech: TechInfo }) {
  return (
    <a
      href={tech.docs}
      target='_blank'
      className='font-normal flex items-center justify-center w-16 h-16 p-2 ring-1 ring-transparent rounded-sm bg-white/50 dark:bg-black border hover:ring-gray-600 dark:hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
    >
      <Image src={tech.logo} alt={tech.docs} height={60} width={60} />
    </a>
  );
}
