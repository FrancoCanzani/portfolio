import Link from 'next/link';
import { ToggleMode } from './toggleMode';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import SwitchLanguage from './switchLanguage';
import ProfileCard from './profileCard';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className='mb-10 w-full'>
      <ProfileCard />
      <nav className='mt-4 border-y w-full border-gray-400 text-sm'>
        <ul className='flex justify-between items-center w-full px-4 border-y border-opacity-5 border-white py-2'>
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
              <Link
                className='dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-black'
                href='#'
              >
                {t('about')}
              </Link>
            </li>
            <li>
              <Link
                className='dark:text-gray-300 gap-x-1 flex items-center justify-center dark:hover:text-white text-gray-600 hover:text-black'
                href='#'
              >
                Blog <ExternalLink size={16} />
              </Link>
            </li>
            <li>
              <Link
                className='dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-black'
                href='#'
              >
                {t('contact')}
              </Link>
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
