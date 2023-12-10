import Header from '@/components/header';
import Balancer from 'react-wrap-balancer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Footer from '@/components/footer';

export default function Component() {
  const t = useTranslations('Landing');

  return (
    <div className='py-12'>
      <Header />
      <main className='mx-auto py-12 px-4'>
        <section className='mb-10'>
          <h2 className='text-5xl font-bold capitalize'>
            <Balancer>{t('title')}.</Balancer>
          </h2>
          <p className='mt-4 max-w-prose'>{t('welcomeMessage')}</p>
        </section>
        <section>
          <h3 className='text-2xl font-semibold mb-6'>Select Work</h3>
          <div className='grid grid-cols-1 gap-4'></div>
        </section>
        <div className='columns-2 sm:columns-3 gap-4 my-8'>
          <div className='relative h-40 mb-4'>
            <Image
              alt='Me speaking on stage at React Summit about the future of Next.js'
              src='/landing/denia.jpg'
              fill
              sizes='(max-width: 768px) 213px, 33vw'
              priority
              className='rounded-lg object-cover'
            />
          </div>
          <div className='relative h-80 mb-4 sm:mb-0'>
            <Image
              alt='Me, Lydia, and Delba filming the Next.js Conf keynote'
              src='/landing/laplata.jpg'
              fill
              sizes='(max-width: 768px) 213px, 33vw'
              priority
              className='rounded-lg object-cover object-[-16px] sm:object-center'
            />
          </div>
          <div className='relative h-40 sm:h-80 sm:mb-4'>
            <Image
              alt='Me standing on stage at Reactathon delivering the keynote'
              src='/landing/f1.jpg'
              fill
              sizes='(max-width: 768px) 213px, 33vw'
              priority
              className='rounded-lg object-cover object-top sm:object-center'
            />
          </div>
          <div className='relative h-40 mb-4 sm:mb-0'>
            <Image
              alt='Me standing on stage at SmashingConf giving a talk about my optimism for the web'
              src='/landing/reactAlicante.jpg'
              fill
              sizes='(max-width: 768px) 213px, 33vw'
              priority
              className='rounded-lg object-cover'
            />
          </div>
          <div className='relative h-40 mb-4'>
            <Image
              alt='Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community'
              src='/landing/labombonera.jpg'
              fill
              sizes='(max-width: 768px) 213px, 33vw'
              priority
              className='rounded-lg object-cover'
            />
          </div>
          <div className='relative h-80'>
            <Image
              alt='My badge on top of a pile of badges from a Vercel meetup we held'
              src='/landing/sanfrancisco.jpg'
              fill
              sizes='(min-width: 768px) 213px, 33vw'
              priority
              className='rounded-lg object-cover'
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
