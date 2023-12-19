import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';

export default function Resume() {
  const t = useTranslations('Resume');

  return (
    <section className='mb-8'>
      <h3 className='text-2xl font-semibold mb-4'>{t('title')}</h3>
      <p className='text-gray-600 dark:text-gray-200 mb-6'>
        {t('description')}
      </p>
      <a download href='/Franco_Canzani.pdf'>
        <button className='bg-black group dark:text-gray-200 dark:bg-gray-800 shadow-sm cursor-pointer text-sm flex items-center gap-x-5 text-gray-200 font-semibold rounded-md px-3 py-2'>
          {t('button')}
          <Download size={18} className='group-hover:animate-bounce' />
        </button>
      </a>
    </section>
  );
}
