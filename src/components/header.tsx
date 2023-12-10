import Link from 'next/link';
import { ToggleMode } from './toggleMode';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import SwitchLanguage from './switchLanguage';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className='mb-10 w-full'>
      <h1 className='text-lg leading-5 font-semibold mx-auto px-4 uppercase'>
        Franco <br /> Canzani
      </h1>
      <nav className='mt-4 border-y w-full text-sm'>
        <ul className='flex justify-between items-center w-full px-4 border-y-[0.2px] border-opacity-5 border-white py-2'>
          <div className='flex space-x-4'>
            <li>
              <Link
                className='text-gray-300 hover:text-white dark:text-gray-600 dark:hover:text-black'
                href='#'
              >
                {t('work')}
              </Link>
            </li>
            <li>
              <Link
                className='text-gray-300 hover:text-white dark:text-gray-600 dark:hover:text-black'
                href='#'
              >
                {t('about')}
              </Link>
            </li>
            <li>
              <Link
                className='text-gray-300 gap-x-1 flex items-center justify-center hover:text-white dark:text-gray-600 dark:hover:text-black'
                href='#'
              >
                Blog <ExternalLink size={16} />
              </Link>
            </li>
            <li>
              <Link
                className='text-gray-300 hover:text-white dark:text-gray-600 dark:hover:text-black'
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
