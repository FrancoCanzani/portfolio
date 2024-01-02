'use client';

import Skill from './skill';
import { motion, useScroll } from 'framer-motion';
import cn from '@/utils/cn';

export default function Skills() {
  return (
    <section className='mb-12' id='projects'>
      <h1 className='text-2xl font-bold dark:text-gray-100 mb-3'>Skills</h1>
      <h2 className='text-sm mb-6'>
        Here is a collection of the skills gained on the way and the resources I
        keep looking up, because{' '}
        <strong>
          continuous learning is the minimum requirement to success in any
          field.
        </strong>
      </h2>
      <h3 className='my-3 italic font-semibold'>Fundamentals</h3>
      <a
        href='https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work'
        target='_blank'
        className='hover:underline text-sm'
      >
        The internet and the basics of the web: HTTP, what is a Web browser, and
        what is a Web server.
      </a>

      <Skill
        className='border-l-red-600'
        title='html'
        description='How we define content, the meaning and structure of web content.'
        concepts={[
          'HTML elements and attributes',
          'Links',
          'Images',
          'Lists',
          'Forms',
          'Tables',
          'Semantic HTML',
          'Accessibility best practices',
          'HTML Boilerplate structure',
        ]}
        resources={[
          'https://developer.mozilla.org/en-US/docs/Web/HTML',
          'https://www.theodinproject.com/lessons/foundations-introduction-to-html-and-css',
        ]}
      />
      <Skill
        className='border-l-blue-600'
        title='css'
        description='CSS describes how elements should be rendered on screen.'
        concepts={[
          'Colors',
          'selectors',
          'Cascade',
          'Specificity',
          'Units',
          'Typography',
          'The box model',
          'The display property',
          'Responsive design',
        ]}
        resources={[
          'https://developer.mozilla.org/en-US/docs/Web/CSS',
          'https://css-tricks.com/',
        ]}
      />
      <Skill
        className='border-l-yellow-400'
        title='JavaScript'
        description='The scripting language for Web pages.'
        concepts={[
          'Variables',
          'Data types',
          'Operators',
          'Control flow',
          'Loops',
          'Functions',
          'Objects',
          'Arrays',
          'Strings',
          'Scope',
          'Closures',
          'Callbacks',
          'Promises',
          'Async/Await',
          'Error handling',
          'Events',
          'DOM manipulation',
        ]}
        resources={[
          'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          'https://javascript.info/',
          'https://frontendmasters.com/',
          'https://github.com/getify/You-Dont-Know-JS',
          'https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript',
        ]}
      />
      <Skill
        className='border-l-green-500'
        stillLearning
        title='NodeJs'
        description='A cross-platform JavaScript runtime environment.'
        concepts={[
          'Event-driven architecture',
          'Non-blocking I/O',
          'Asynchronous programming',
          'Modules and CommonJS',
          'npm (Node Package Manager)',
          'Middleware',
          'Routing',
          'File System (fs) module',
          'HTTP module',
          'RESTful APIs',
          'Error handling in Node.js',
          'Node.js Event Loop',
          'Environment variables',
          'Logging',
        ]}
        resources={[
          'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction',
          'https://nodejs.org/',
          'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs',
          'https://frontendmasters.com/',
        ]}
      />
      <h3 className='my-3 italic font-semibold'>Libraries</h3>
      <Tech
        title='React'
        description='The library for web and native user interfaces.'
        resource='https://react.dev/'
        className='border-l-blue-300'
      />

      <Tech
        title='SocketIO'
        description='Bidirectional and low-latency communication for every platform.'
        resource='https://socket.io/'
        className='border-l-black'
      />
      <h3 className='my-3 italic font-semibold'>Frameworks</h3>
      <Tech
        title='NextJs'
        description='The React Framework for the Web.'
        resource='https://nextjs.org/'
        className='border-l-black'
      />
      <Tech
        title='ExpressJs'
        description='Fast, unopinionated, minimalist web framework for Node.js.'
        resource='https://expressjs.com/'
        className='border-l-gray-400'
      />
      <Tech
        title='TailwindCSS'
        description='A utility-first CSS framework.'
        resource='https://tailwindcss.com/'
        className='border-l-[#11a5e9]'
      />
      <h3 className='my-3 italic font-semibold'>Databases</h3>
      <Tech
        title='MongoDB'
        description='A document database with scalability and flexibility.'
        resource='https://www.mongodb.com/es'
        className='border-l-[#116149]'
      />
      <Tech
        title='Mongoose'
        description='Schema-based solution to model application data.'
        resource='https://mongoosejs.com/'
        className='border-l-[#880000]'
      />
      <p className='my-6'>
        <strong>Other tools I&apos;ve used:</strong> Vite, React Router
      </p>
    </section>
  );
}

function Tech({
  title,
  description,
  resource,
  className,
}: {
  title: string;
  description: string;
  resource: string;
  className: string;
}) {
  const containerClasses = cn(
    'p-2',
    'my-4',
    'space-y-3',
    'bg-gray-50',
    'border',
    'border-l-4',
    'rounded-md',
    className
  );

  return (
    <div className={containerClasses}>
      <div className='flex items-center justify-between'>
        <h4 className='font-semibold uppercase'>{title}</h4>
        <a href={resource} className='text-sm'>
          <span className='underline'>Docs</span> ↗
        </a>
      </div>
      <p className='text-sm italic'>{description}</p>
    </div>
  );
}
