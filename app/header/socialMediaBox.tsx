import React, { ReactElement } from 'react';

interface SocialMediaProps {
  iconPath: ReactElement;
  link: string;
  name: string;
}

export default function SocialMediaBox({
  iconPath,
  link,
  name,
}: SocialMediaProps) {
  return (
    <a
      href={link}
      className='items flex justify-center'
      target='blank'
      aria-label={name + 'link'}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='50%'
        height='50%'
        viewBox='0 0 24 24'
        className='max-h-20'
      >
        {iconPath}
      </svg>
    </a>
  );
}
