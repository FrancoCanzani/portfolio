import Image from 'next/image';

import { v4 as uuidv4 } from 'uuid';

import jsLogo from '../../public/skills/jsLogo.svg';
import nextLogo from '../../public/skills/nextLogo.svg';
import reactLogo from '../../public/skills/reactLogo.svg';
import reactQueryLogo from '../../public/skills/reactQueryLogo.svg';
import reactRouter from '../../public/skills/reactRouter.svg';
import supabaseLogo from '../../public/skills/supabaseLogo.svg';
import tailwindLogo from '../../public/skills/tailwindLogo.svg';
import typescriptLogo from '../../public/skills/typescriptLogo.svg';

const skills = [
  jsLogo,
  typescriptLogo,
  reactLogo,
  nextLogo,
  reactQueryLogo,
  reactRouter,
  supabaseLogo,
  tailwindLogo,
];

export default function Skills() {
  return (
    <section>
      <h1 className='pt-6 text-5xl font-black uppercase sm:px-24 md:px-28 lg:px-36'>
        Skills
      </h1>
      <div className='w-full bg-pink-100'>
        <div className='flex items-center justify-center p-6 sm:px-24 md:px-28 lg:px-36'>
          {skills.map((skill, index) => (
            <Image
              key={uuidv4()}
              src={skill}
              alt='Skill logo'
              height={50}
              width={50}
              className={index == skills.length - 1 ? '' : 'mr-10'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
