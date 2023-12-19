import { useTranslations } from 'next-intl';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import ContactForm from './contactForm';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <section className='mb-6'>
      <h3 className='text-2xl font-semibold mb-4'>{t('title')}</h3>
      <div className='flex items-center gap-4 mb-4'>
        <ContactBadge href='mailto:francocanzani@gmail.com'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            data-slot='icon'
            className='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
            />
          </svg>
        </ContactBadge>
        <ContactBadge href='https://wa.me/+34692027108'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='23'
            viewBox='0 0 24 24'
          >
            <g fill='none'>
              <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
              <path
                fill='currentColor'
                d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.958 9.958 0 0 1-4.863-1.26l-.305-.178l-3.032.892a1.01 1.01 0 0 1-1.28-1.145l.026-.109l.892-3.032A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2m0 2a8 8 0 0 0-6.759 12.282c.198.312.283.696.216 1.077l-.039.163l-.441 1.501l1.501-.441c.433-.128.883-.05 1.24.177A8 8 0 1 0 12 4M9.102 7.184a.695.695 0 0 1 .684.075c.504.368.904.862 1.248 1.344l.327.474l.153.225a.712.712 0 0 1-.046.864l-.075.076l-.924.686a.227.227 0 0 0-.067.291c.21.38.581.947 1.007 1.373c.427.426 1.02.822 1.426 1.055c.088.05.194.034.266-.031l.038-.045l.601-.915a.711.711 0 0 1 .973-.158l.543.379c.54.385 1.059.799 1.47 1.324a.696.696 0 0 1 .089.703c-.396.924-1.399 1.711-2.441 1.673l-.159-.01l-.191-.018a4.966 4.966 0 0 1-.108-.014l-.238-.04c-.924-.174-2.405-.698-3.94-2.232c-1.534-1.535-2.058-3.016-2.232-3.94l-.04-.238l-.025-.208l-.013-.175a3.76 3.76 0 0 1-.004-.075c-.038-1.044.753-2.047 1.678-2.443'
              />
            </g>
          </svg>
        </ContactBadge>
        <ContactBadge href='https://github.com/' target='_blank'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='23'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2'
            />
          </svg>
        </ContactBadge>
        <ContactBadge
          href='https://twitter.com/ControlControlV'
          target='_blank'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='23'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z'
            />
          </svg>
        </ContactBadge>
      </div>
      <ContactForm />
    </section>
  );
}

interface ContactBadgeProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}
function ContactBadge({ children, ...props }: ContactBadgeProps) {
  return (
    <a
      {...props}
      className='rounded-md bg-gray-50 dark:bg-gray-800 flex items-center justify-center shadow-md p-2 cursor-pointer w-10 h-10'
    >
      {children}
    </a>
  );
}
