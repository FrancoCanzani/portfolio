'use client';

import { sendEmail } from '@/utils/actions';
import { useRef } from 'react';
import SubmitButton from './submitButton';

export default function ContactForm() {
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
            Name
          </label>
          <input
            className='ring-1 p-2 flex w-full ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-600 dark:hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
            id='name'
            name='name'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Email
          </label>
          <input
            className='ring-1 p-2 flex w-full ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-600 dark:hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
            id='email'
            name='email'
            placeholder='Enter your email'
            type='email'
            required
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Message
          </label>
          <textarea
            className='ring-1 p-2 flex w-full ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-600 dark:hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
            id='message'
            name='message'
            placeholder='Enter your message'
            required
          ></textarea>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
