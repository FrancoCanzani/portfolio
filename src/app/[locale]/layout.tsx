import '../globals.css';
import Header from '@/components/header';
import { Providers } from '@/components/providers';
import { Inter } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/footer';
import FloatingMenu from '@/components/floatingMenu';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });
  const metadata = require(`../../../messages/metadata.${locale}.json`);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className='scroll-smooth' suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased container max-w-3xl py-12 mx-auto`}
      >
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
            <Footer />
            <FloatingMenu />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
