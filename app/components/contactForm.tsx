import { SERVICE_KEY, TEMPLATE_KEY, API_KEY } from '../../emailCredentials';

import { useState, FormEvent, useRef, ChangeEvent } from 'react';

import emailjs from 'emailjs-com';
import { EmailJSResponseStatus } from 'emailjs-com/es/models/EmailJSResponseStatus';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [formStatus, setFormStatus] = useState<{
    status: string;
    color: string;
  }>({
    status: '',
    color: '',
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEmailInput(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleMessageInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  function sendEmail() {
    if (form.current) {
      emailjs.sendForm(SERVICE_KEY, TEMPLATE_KEY, form.current, API_KEY).then(
        (result: EmailJSResponseStatus) => {
          setFormStatus({ status: 'Form submitted', color: 'bg-green-100' });
          setTimeout(() => {
            setFormStatus({ status: '', color: '' });
          }, 5000);
          // Reset input fields
          setName('');
          setEmail('');
          setMessage('');
        },
        (error: any) => {
          setFormStatus({
            status: 'Failed to submit, try again',
            color: 'bg-red-100',
          });
          setTimeout(() => {
            setFormStatus({ status: '', color: '' });
          }, 5000);
        }
      );
    }
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendEmail();
  }

  return (
    <form
      ref={form}
      onSubmit={handleFormSubmit}
      className='flex flex-col justify-center capitalize'
    >
      <h1 className='mb-3 text-2xl font-bold'>Get in touch</h1>
      <div className='mb-7 md:flex md:items-center'>
        <div className='mr-2 flex flex-col'>
          <label htmlFor='name' className='font-semibold'>
            Your name
          </label>
          <input
            type='text'
            name='name'
            required
            className='rounded-sm px-2 py-1'
            placeholder='John Doe'
            value={name}
            onChange={handleNameInput}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='email' className='font-semibold'>
            Email
          </label>
          <input
            name='email'
            required
            type='text'
            placeholder='your@email.com'
            className='rounded-sm px-2 py-1'
            value={email}
            onChange={handleEmailInput}
          />
        </div>
      </div>
      <label htmlFor='message' className='font-semibold'>
        Message
      </label>
      <textarea
        required
        rows={5}
        name='message'
        id='message'
        className='rounded-sm px-2 py-1'
        placeholder='Say Hi!'
        value={message}
        onChange={handleMessageInput}
      ></textarea>
      <div className='mt-4 flex items-center'>
        <button
          type='submit'
          className='mr-4 bg-black px-4 py-2 font-semibold text-white hover:bg-green-700'
        >
          Submit
        </button>
        <span className={`${formStatus.color} px-4 py-2 font-semibold`}>
          {formStatus.status}
        </span>
      </div>
    </form>
  );
}
