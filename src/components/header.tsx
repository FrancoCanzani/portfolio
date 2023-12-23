import { ToggleMode } from './toggleMode';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import SwitchLanguage from './switchLanguage';
import { Link } from '@/navigation';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className='mb-10 w-full px-4'>
      <Link
        href={'/'}
        className='hover:bg-gray-100 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 font-bold text-xl transition-[background-color]'
      >
        Franco Canzani
      </Link>
      <nav className='mt-4 px-1 border-y w-full dark:border-white border-gray-600 text-sm'>
        <ul className='flex justify-between items-center w-full border-y border-opacity-5 border-white py-2'>
          <div className='flex space-x-4'>
            <li>
              <Link
                className='dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-black'
                href='/#projects'
              >
                {t('work')}
              </Link>
            </li>
            <li>
              <Link
                className='dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-black'
                href='/about'
              >
                {t('about')}
              </Link>
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
              <Link
                className='dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-black'
                href='/#contact'
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
