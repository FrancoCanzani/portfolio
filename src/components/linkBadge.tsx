import cn from '@/utils/cn';
import { ReactNode, AnchorHTMLAttributes } from 'react';

interface LinkBadgeProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}
export function LinkBadge({ children, className, ...props }: LinkBadgeProps) {
  return (
    <a
      {...props}
      className={cn(
        'font-normal p-2 ring-1 hover:transition-all duration-500 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50',
        className
      )}
    >
      {children}
    </a>
  );
}
