import Link from 'next/link';
import Badge from './badge';

export default function Projects() {
  return (
    <section>
      <h3 className='text-2xl font-semibold mb-6'>Selected Projects</h3>
      <div className='flex gap-3 flex-wrap'>
        <ProjectCard
          name={'Boring Chat'}
          description={'A Full Stack chat app using webSockets'}
          href='https://github.com/FrancoCanzani/chatApp'
          technologies={[
            'NextJS',
            'TypeScript',
            'Node',
            'Express',
            'TailwindCSS',
          ]}
        />
        <ProjectCard
          name={'Boring Chat'}
          description={'A Full Stack chat app using webSockets'}
          href='https://github.com/FrancoCanzani/chatApp'
          technologies={[
            'NextJS',
            'TypeScript',
            'Node',
            'Express',
            'TailwindCSS',
          ]}
        />
        <ProjectCard
          name={'Boring Chat'}
          description={'A Full Stack chat app using webSockets'}
          href='https://github.com/FrancoCanzani/chatApp'
          technologies={[
            'NextJS',
            'TypeScript',
            'Node',
            'Express',
            'TailwindCSS',
          ]}
        />
      </div>
    </section>
  );
}

function ProjectCard({
  name,
  description,
  href,
  technologies,
}: {
  name: string;
  description: string;
  href: string;
  technologies: string[];
}) {
  return (
    <div className='p-4 w-full sm:w-[49%] border border-gray-300 rounded-lg shadow-sm'>
      <div className='flex mb-2 items-center justify-between'>
        <div className='flex items-center justify-start gap-x-2'>
          <svg
            aria-hidden='true'
            height='16'
            viewBox='0 0 16 16'
            version='1.1'
            width='16'
            data-view-component='true'
            fill='#656d76'
          >
            <path d='M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z'></path>
          </svg>
          <Link href={href} className='flex items-center justify-start gap-x-2'>
            <h3 className='text-blue-500 hover:underline text-sm lowercase font-semibold'>
              {name}
            </h3>
          </Link>
        </div>
        <Badge
          href={href}
          height={18}
          width={18}
          alt='X icon'
          src='/icons/github.svg'
        />
      </div>
      <p className='text-xs mb-1 dark:text-gray-700 text-gray-200'>
        {description}
      </p>
      {technologies &&
        technologies.map((tech: string, index: number) => (
          <span
            key={index}
            className='text-xs dark:text-gray-700 text-gray-200'
          >
            {tech}
            {index != technologies.length - 1 && ', '}
          </span>
        ))}
    </div>
  );
}
