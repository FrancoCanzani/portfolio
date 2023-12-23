'use client';

import { useFormStatus } from 'react-dom';
import { useLocale } from 'next-intl';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  const locale = useLocale();

  const pendingText = locale == 'en' ? 'Sending...' : 'Enviando...';
  const text = locale == 'en' ? 'Send message' : 'Enviar';

  return (
    <button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className='p-2 ring-1 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-600 dark:hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
    >
      {pending ? pendingText : text}
    </button>
  );
}
