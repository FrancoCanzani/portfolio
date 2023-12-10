import '../globals.css';
import { notFound } from 'next/navigation';
import { Providers } from '@/components/providers';
import { Hedvig_Letters_Sans } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
const hedvig = Hedvig_Letters_Sans({ weight: '400', subsets: ['latin'] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
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
    <html lang={params.locale}>
      <body
        className={`${hedvig.className} antialiased bg-black text-white dark:bg-white dark:text-black`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
