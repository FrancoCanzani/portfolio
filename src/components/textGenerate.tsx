'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import cn from '@/utils/cn';

export default function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(' ');
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 0.5,
        delay: stagger(0.15),
      }
    );
  }, [scope.current]);

  function renderWords() {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className='text-gray-600 dark:text-gray-200 opacity-0'
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  }

  return (
    <div className={cn(className)}>
      <div className='text-gray-600 dark:text-gray-200'>{renderWords()}</div>
    </div>
  );
}
