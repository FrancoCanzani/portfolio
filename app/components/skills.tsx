import Image from 'next/image';
import Link from 'next/link';

import { v4 as uuidv4 } from 'uuid';

import jsLogo from '../../public/skills/jsLogo.svg';
import nextLogo from '../../public/skills/nextLogo.svg';
import reactLogo from '../../public/skills/reactLogo.svg';
import firebaseLogo from '../../public/skills/firebaseLogo.svg';
import tailwindLogo from '../../public/skills/tailwindLogo.svg';
import typescriptLogo from '../../public/skills/typescriptLogo.svg';

const skills = [
  { logo: jsLogo, name: 'JavaScript', border: 'border-yellow-200' },
  { logo: typescriptLogo, name: 'TypeScript', border: 'border-blue-500' },
  { logo: reactLogo, name: 'React', border: 'border-slate-900' },
  { logo: nextLogo, name: 'Next.js', border: 'border-black' },
  { logo: firebaseLogo, name: 'Firebase', border: 'border-yellow-400' },
  { logo: tailwindLogo, name: 'Tailwind', border: 'border-cyan-700' },
];

export default function Skills() {
  return (
    <section className='mt-10'>
      <div className='flex items-baseline justify-start'>
        <h1 className='pl-6 pt-6 text-5xl font-black uppercase sm:pl-24 md:pl-28 lg:pl-36'>
          Skills
        </h1>
        <Link
          href={'/'}
          className='ml-2 flex items-center text-xs text-gray-500 hover:text-black hover:underline'
        >
          More about my toolbox{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 512 512'
          >
            <path
              d='M322.2 349.7c-3.1-3.1-3-8 0-11.3l66.4-74.4H104c-4.4 0-8-3.6-8-8s3.6-8 8-8h284.6l-66.3-74.4c-2.9-3.4-3.2-8.1-.1-11.2 3.1-3.1 8.5-3.3 11.4-.1 0 0 79.2 87 80 88s2.4 2.8 2.4 5.7-1.6 4.9-2.4 5.7-80 88-80 88c-1.5 1.5-3.6 2.3-5.7 2.3s-4.1-.8-5.7-2.3z'
              fill='currentColor'
            />
          </svg>
        </Link>
      </div>

      <div className='w-full bg-slate-200'>
        <div className='flex flex-col items-center justify-center p-2 py-10 sm:px-24 md:px-28 lg:flex-row lg:px-36'>
          {skills.map((skill, index) => (
            <div
              key={uuidv4()}
              className={`mt-4 flex w-64 items-center justify-center rounded-sm border-4 ${
                skill.border
              } p-2 hover:scale-110 ${
                index === skills.length - 1 ? '' : 'lg:mr-10'
              }`}
            >
              <Image
                key={uuidv4()}
                src={skill.logo}
                alt={`${skill.name} logo`}
                height={25}
                width={25}
                className='mr-3'
              />
              <p className='font-semibold'>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
