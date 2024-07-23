import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default async function Codewars() {
  const t = await useTranslations('Practice');

  const res = await fetch(
    'https://www.codewars.com/api/v1/users/FrancoCanzani'
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return (
    <div className='w-full'>
      <h2 className='text-sm mb-3'>{t('codewars')}</h2>
      <div className='flex-col w-full text-sm space-y-1 mb-6 p-1.5 ring-1 hover:transition-all duration-500 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-orange-300 hover:shadow dark:hover:ring-orange-800 border-orange-500 shadow-md dark:shadow-none dark:hover:shadow-orange-300 shadow-orange-300/10 dark:border-orange-800'>
        <div className='flex items-end justify-between w-full'>
          <Image
            alt='Codewars icon'
            src='/icons/codewars.png'
            height={35}
            width={35}
            quality={100}
          />
          <div>
            Profile:{' '}
            <a
              href='https://www.codewars.com/users/FrancoCanzani'
              target='_blank'
              className='hover:underline font-medium'
            >
              <strong>{data.username}</strong>
            </a>
          </div>
        </div>
        <div className='flex items-center justify-between w-full'>
          <p>
            Honor: <strong>{data.honor}</strong>
          </p>
          <p>
            Honor Percentile: <strong>Top 37.987%</strong>
          </p>
        </div>
        <div className='flex items-center justify-between w-full'>
          <p>
            Rank: <strong>{data.ranks.overall.name}</strong>
          </p>
          <p>
            Total Completed Kata:{' '}
            <strong>{data.codeChallenges.totalCompleted}</strong>
          </p>
        </div>
        <div className='flex items-center justify-start w-full'>
          Languages:
          {Object.keys(data.ranks.languages).map((lang, index, array) => (
            <strong
              key={lang}
              className={`capitalize mr-1 ${index == 0 && 'ml-1'}`}
            >
              {lang}
              {index !== array.length - 1 ? ',' : ''}
            </strong>
          ))}
        </div>
      </div>
    </div>
  );
}
