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
    <a href={link} target='blank' aria-label={name + 'link'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        viewBox='0 0 24 24'
        className='max-h-20'
      >
        {iconPath}
      </svg>
    </a>
  );
}
