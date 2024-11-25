import Codewars from './codewars';
import { useTranslations } from 'next-intl';
import GitHubStats from './githubStats';

export default async function Miscellaneous() {
  const t = useTranslations('Practice');

  return (
    <section className='mb-12'>
      <h1 className='text-2xl font-bold dark:text-gray-100 mb-3'>
        {t('title')}
      </h1>
      <h2 className='text-sm mb-6'>{t('description')}</h2>
      <div className='flex w-full flex-col items-start justify-center space-y-12'>
        <GitHubStats username='FrancoCanzani' />
        <Codewars />
      </div>
    </section>
  );
}
