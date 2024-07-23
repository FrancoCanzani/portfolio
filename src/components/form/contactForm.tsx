'use client';

import { sendEmail } from '@/utils/actions';
import { useRef } from 'react';
import SubmitButton from '../submitButton';

export default function ContactForm({
  name,
  email,
  message,
  namePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
}: {
  name: string;
  email: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await sendEmail(formData);
        if (formRef.current != null) {
          formRef.current.reset();
        }
      }}
      ref={formRef}
    >
      <div className='space-y-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {name}
          </label>
          <input
            className='ring-1 p-2 flex w-full hover:transition-all duration-500 ring-transparent rounded-sm bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50'
            id='name'
            name='name'
            placeholder={namePlaceholder}
            required
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {email}
          </label>
          <input
            className='p-2 flex w-full ring-1 hover:transition-all duration-500 ring-transparent rounded-sm bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50'
            id='email'
            name='email'
            placeholder={emailPlaceholder}
            type='email'
            required
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {message}
          </label>
          <textarea
            className='p-2 flex w-full ring-1 hover:transition-all duration-500 ring-transparent rounded-sm bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50'
            id='message'
            name='message'
            placeholder={messagePlaceholder}
            required
          ></textarea>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
