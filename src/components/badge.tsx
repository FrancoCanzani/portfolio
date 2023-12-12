import Link from 'next/link';
import Image from 'next/image';
import { ImgHTMLAttributes } from 'react';

interface BadgeProps extends ImgHTMLAttributes<HTMLImageElement> {
  href: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

export default function Badge({
  href,
  src,
  width,
  height,
  alt,
  ...props
}: BadgeProps) {
  return (
    <Link href={href} target='_blank'>
      <Image
        src={src}
        alt={alt}
        width={width || 20}
        height={height || 20}
        {...props}
      />
    </Link>
  );
}
