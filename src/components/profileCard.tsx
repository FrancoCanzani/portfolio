import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ProfileCard() {
  const t = useTranslations('Profile');

  return (
    <div className='flex items-center justify-start'>
      <Image
        src={'/pic.png'}
        alt='profile pic'
        height={30}
        width={30}
        priority
        className='rounded-md mr-2'
      />
      <div>
        <h1 className='text-xs font-bold capitalize'>Franco Canzani</h1>
        <h2 className='text-xs text-gray-600 dark:text-gray-300'>
          {t('description')}
        </h2>
      </div>
    </div>
  );
}
