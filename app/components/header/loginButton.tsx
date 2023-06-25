interface LoginProps {
  provider: string;
  position: string;
  event: ReactEventHandler;
  imageURL: string;
  alt: string;
}

import Image from 'next/image';
import { ReactEventHandler } from 'react';

export default function LoginButton({
  provider,
  position,
  event,
  imageURL,
  alt,
}: LoginProps) {
  return (
    <button
      className={`absolute right-0 ${position} flex w-60 items-center justify-start rounded-sm bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-500`}
      onClick={event}
    >
      <Image src={imageURL} width={18} height={18} alt={alt} className='mr-2' />
      <span>Continue With {provider}</span>
    </button>
  );
}
