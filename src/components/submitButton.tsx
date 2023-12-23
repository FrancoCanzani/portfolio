'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      aria-disabled={pending}
      className='p-2 ring-1 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
    >
      {pending ? 'Sending...' : 'Send message'}
    </button>
  );
}
