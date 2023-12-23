import Link from 'next/link';
import { ToggleMode } from './toggleMode';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import SwitchLanguage from './switchLanguage';
import ProfileCard from './profileCard';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className='mb-10 w-full px-4'>
      <ProfileCard />
      <nav className='mt-4 px-1 border-y w-full border-white text-sm'>
        <ul className='flex justify-between items-center w-full border-y border-opacity-5 border-white py-2'>
          <div className='flex space-x-4'>
            <li>
              <a
                className='dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-black'
                href='#projects'
              >
                {t('work')}
              </a>
            </li>
            <li>
              <a
                className='dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-black'
                href='#'
              >
                {t('about')}
              </a>
            </li>
            <li>
              <a
                className='dark:text-gray-300 gap-x-1 flex items-center justify-center dark:hover:text-white text-gray-600 hover:text-black'
                href='#'
              >
                Blog <ExternalLink size={16} />
              </a>
            </li>
            <li>
              <a
                className='dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-black'
                href='#contact'
              >
                {t('contact')}
              </a>
            </li>
          </div>
          <div className='flex items-center justify-center gap-x-2'>
            <SwitchLanguage />
            <ToggleMode />
          </div>
        </ul>
      </nav>
    </header>
  );
}
