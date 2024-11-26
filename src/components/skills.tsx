import { useTranslations } from 'next-intl';

export default function Skills() {
  const t = useTranslations('Skills');

  return (
    <section className='mb-12'>
      <h1 className='text-2xl font-bold dark:text-gray-100 mb-3'>
        {t('title')}
      </h1>
      <h2 className='text-sm mb-6'>{t('description')}</h2>
      <div className='ring-1 hover:transition-all duration-500 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50 text-sm'>
        <p className='inline-flex justify-between border-b p-2 w-full border-gray-300'>
          <span className='font-semibold'>Languages</span>{' '}
          <span className='text-gray-600 dark:text-gray-200'>
            Javascript & Python
          </span>
        </p>
        <p className='inline-flex justify-between border-b p-2 w-full border-gray-300'>
          <span className='font-semibold'>Frameworks</span>{' '}
          <span className='text-gray-600 dark:text-gray-200'>
            Express, FastApi & NextJs
          </span>
        </p>{' '}
        <p className='inline-flex justify-between border-b p-2 w-full border-gray-300'>
          <span className='font-semibold'>Runtimes</span>{' '}
          <span className='text-gray-600 dark:text-gray-200'>NodeJs</span>
        </p>{' '}
        <p className='inline-flex justify-between border-b p-2 w-full border-gray-300'>
          <span className='font-semibold'>Libraries</span>{' '}
          <span className='text-gray-600 dark:text-gray-200'>
            React & TailwindCss
          </span>
        </p>{' '}
        <p className='inline-flex justify-between border-b p-2 w-full border-gray-300'>
          <span className='font-semibold'>Databases</span>{' '}
          <span className='text-gray-600 dark:text-gray-200'>MongoDB</span>
        </p>
        <p className='inline-flex justify-between bg-gray-100 dark:bg-gray-800 dark:text-white p-2 w-full border-gray-300'>
          <span className='font-semibold'>Currently learning</span>{' '}
          <span className='text-gray-600 dark:text-gray-200'>
            SQLite & Golang
          </span>
        </p>
      </div>
    </section>
  );
}
