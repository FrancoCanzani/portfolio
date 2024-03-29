import Balancer from 'react-wrap-balancer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Projects from '@/components/projects';
import Resume from '@/components/resume';
import Contact from '@/components/contact';
import Skills from '@/components/skills';

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
      </section>
      <div className='columns-2 sm:columns-3 gap-4 my-8'>
        <div className='relative h-40 mb-4'>
          <Image
            alt='Denia, Alicante, my adoptive home'
            src='/landing/denia.jpg'
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            quality={100}
            className='rounded-lg object-cover'
          />
        </div>
        <div className='relative h-80 mb-4 sm:mb-0'>
          <Image
            alt='La Plata, BsAs, where I was born and raised'
            src='/landing/laplata.jpg'
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            quality={100}
            className='rounded-lg object-cover object-[-16px] sm:object-center'
          />
        </div>
        <div className='relative h-40 sm:h-80 sm:mb-4'>
          <Image
            alt='F1, one of my passions'
            src='/landing/f1.jpg'
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            quality={100}
            className='rounded-lg object-cover object-top sm:object-center'
          />
        </div>
        <div className='relative h-40 mb-4 sm:mb-0'>
          <Image
            alt='React Alicante, my first tech conference'
            src='/landing/reactAlicante.jpg'
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            quality={100}
            className='rounded-lg object-cover'
          />
        </div>
        <div className='relative h-40 mb-4'>
          <Image
            alt='La Bombonera, one of my passions'
            src='/landing/laBombonera.jpg'
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            quality={100}
            className='rounded-lg object-cover'
          />
        </div>
        <div className='relative h-80'>
          <Image
            alt='San Francisco, my favorite city at the time'
            src='/landing/sanfrancisco.jpg'
            fill
            sizes='(min-width: 768px) 213px, 33vw'
            priority
            className='rounded-lg object-cover'
            quality={100}
          />
        </div>
      </div>
      <Projects />
      <Skills />
      <Resume />
      <Contact />
    </main>
  );
}
