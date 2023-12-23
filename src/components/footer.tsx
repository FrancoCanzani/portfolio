import { ToggleMode } from './toggleMode';

export default function Footer() {
  return (
    <footer className='min-w-full pt-12 px-4 flex items-center justify-between'>
      <p className='text-sm'>
        Made with <strong>NextJS</strong>, deployed on <strong>Vercel ▴</strong>
      </p>

      <ToggleMode />
    </footer>
  );
}
