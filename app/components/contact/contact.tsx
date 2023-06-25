import ContactForm from './contactForm';
import Image from 'next/image';
export default function Contact() {
  return (
    <section>
      <div className='flex flex-col items-baseline justify-start'>
        <h1 className='pl-6 pt-6 text-5xl font-black uppercase sm:pl-24 md:pl-28 lg:pl-36'>
          Contact
        </h1>
        <div className='w-full bg-indigo-100'>
          <div className='flex flex-col flex-wrap items-center justify-center p-2 py-10 sm:px-24 md:px-28 lg:px-36'>
            <div className='flex items-center justify-center capitalize'>
              <a
                className='mr-3 flex items-center justify-center rounded-sm bg-black px-4 py-2 font-semibold text-white hover:bg-orange-400 lg:px-8'
                href='https://cal.com/francocanzani'
                target='blank'
              >
                <Image
                  src={'/contactFormIcons/Meeting.svg'}
                  alt='Schedule meeting icon'
                  width={25}
                  height={25}
                  className='md:mr-2 md:hidden'
                />
                <span className='hidden md:flex'> Book a Meeting</span>
              </a>
              <a
                className='mr-3 flex items-center justify-center rounded-sm bg-black px-4 py-2 font-semibold text-white hover:bg-green-500 lg:px-8'
                href='wa.link/h37pvs'
                target='blank'
              >
                <Image
                  src={'/contactFormIcons/Whatsapp.svg'}
                  alt='Chat on WhatsApp'
                  width={25}
                  height={25}
                  className='md:mr-2 md:hidden'
                />
                <span className='hidden md:flex'> Chat on WhatsApp</span>{' '}
              </a>
              <a
                className='mr-3 flex items-center justify-center rounded-sm bg-black px-4 py-2 font-semibold text-white hover:bg-red-500 lg:px-8'
                href='mailto:francocanzani@gmail.com'
                target='blank'
              >
                <Image
                  src={'/contactFormIcons/newEmail.svg'}
                  alt='Send me an email'
                  className='md:mr-2 md:hidden'
                  width={25}
                  height={25}
                />
                <span className='hidden md:flex'> Email me</span>
              </a>
            </div>
            <span className='mb-8 mt-11 font-light capitalize italic'>
              - or -
            </span>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
