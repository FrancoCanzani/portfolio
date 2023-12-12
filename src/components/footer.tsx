import Badge from './badge';

export default function Footer() {
  return (
    <footer className='min-w-full px-4 flex items-center justify-between'>
      <p className='text-sm'>
        Made with <strong>NextJS</strong>, deployed on <strong>Vercel ▴</strong>
      </p>
      <div className='flex items-center justify-center gap-x-2'>
        <Badge
          href='https://twitter.com/ControlControlV'
          height={20}
          width={20}
          alt='X icon'
          src='/icons/twitter.svg'
        />
        <Badge
          href='https://ar.linkedin.com/in/franco-canzani'
          height={20}
          width={20}
          alt='X icon'
          src='/icons/linkedin.svg'
        />
        <Badge
          href='https://github.com/FrancoCanzani'
          height={20}
          width={20}
          alt='X icon'
          src='/icons/github.svg'
        />
      </div>
    </footer>
  );
}
