import Balancer from 'react-wrap-balancer';
import { useTranslations } from 'next-intl';
import Projects from '@/components/projects';
import Resume from '@/components/resume';
import Contact from '@/components/contact';
import Skills from '@/components/skills';
import Miscellaneous from '@/components/miscellaneous';
import Image from 'next/image';

export default function Component() {
  const t = useTranslations('Landing');

  return (
    <main className='mx-auto px-4'>
      <section className='mb-10'>
        <h2 className='text-5xl mb-4 font-bold capitalize'>
          <Balancer>{t('title')}.</Balancer>
        </h2>
        <p className='text-gray-600 dark:text-gray-200'>
          {t('welcomeMessage')}
        </p>
        <div className='w-full h-[400px] overflow-hidden relative mt-6 rounded-md'>
          <Image
            alt={'Denia, Alicante, Spain'}
            src={'/landing/denia.jpg'}
            fill
            sizes='100vw'
            priority
            quality={100}
            className='object-cover'
          />
        </div>
      </section>
      <Projects />
      <Skills />
      <Miscellaneous />
      <Resume />
      <Contact />
    </main>
  );
}
