import '../globals.css';
import Header from '@/components/header';
import { notFound } from 'next/navigation';
import { Providers } from '@/components/providers';
import { Inter } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/footer';
const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });
  // Read metadata from the JSON file based on the locale
  const metadata = require(`../../../messages/metadata.${locale}.json`);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}
const locales = ['en', 'es'];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!locales.includes(params.locale as any)) notFound();

  return (
    <html lang={params.locale} className='scroll-smooth'>
      <body
        className={`${inter.className} antialiased max-w-2xl py-12 mx-auto dark:bg-black dark:text-white bg-[#fcfcfc] text-black`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
