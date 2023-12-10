import Link from 'next/link';
import { ToggleMode } from './toggleMode';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className='mb-10 w-full'>
      <h1 className='text-lg leading-5 font-semibold mx-auto px-4 uppercase'>
        Franco <br /> Canzani
      </h1>
      <nav className='mt-4 border-y w-full'>
        <ul className='flex justify-between w-full px-4 border-y-[0.2px] border-opacity-5 border-white py-2'>
          <div className='flex space-x-4'>
            <li>
              <Link className='text-gray-400 hover:text-white' href='#'>
                {t('work')}
              </Link>
            </li>
            <li>
              <Link className='text-gray-400 hover:text-white' href='#'>
                {t('about')}
              </Link>
            </li>
            <li>
              <Link className='text-gray-400 hover:text-white' href='#'>
                {t('contact')}
              </Link>
            </li>
          </div>
          <div>
            <li>
              <ToggleMode text={t('mode')} />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
