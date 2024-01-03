import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import cn from '@/utils/cn';

export default function Skill({
  title,
  description,
  concepts,
  resources,
  className,
  stillLearning,
}: {
  title: string;
  description: string;
  concepts?: string[];
  resources?: string[];
  className: string;
  stillLearning?: boolean;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });

  console.log(scrollYProgress);

  return (
    <motion.div
      className={cn(
        `p-2 my-4 space-y-3 bg-gray-50 border border-l-4 rounded-md ${className}`
      )}
    >
      <div className='flex items-center justify-between'>
        <h4 className='font-semibold uppercase'>{title}</h4>
        {stillLearning && (
          <span className='border p-1 text-[10px] capitalize rounded-md font-semibold ring-yellow-200 ring-inset ring-1'>
            🚧 Currently learning 🚧
          </span>
        )}
      </div>
      <p className='text-sm italic'>{description}</p>
      {concepts && (
        <details className='text-sm'>
          <summary className='font-semibold hover:cursor-pointer'>
            Concepts
          </summary>
          <ul className='ml-4 mt-1'>
            {concepts.map((concept: string, index: number) => (
              <li key={index} className='text-xs text-gray-700 capitalize'>
                {concept}
              </li>
            ))}
          </ul>
        </details>
      )}
      {resources && (
        <details className='text-sm'>
          <summary className='font-semibold hover:cursor-pointer'>
            Resources
          </summary>
          <ul className='ml-4 mt-1'>
            {resources.map((resource: string, index: number) => (
              <li key={index} className='text-xs text-blue-500 underline'>
                <a href={resource}>{resource}</a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </motion.div>
  );
}
