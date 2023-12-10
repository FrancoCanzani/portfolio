import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function SwitchLanguage() {
  const currentLocale = useLocale();

  return (
    <div>
      {currentLocale == 'es' ? (
        <Link href={'/en'} className='underline'>
          En
        </Link>
      ) : (
        <Link href={'/es'} className='underline'>
          Es
        </Link>
      )}
    </div>
  );
}
