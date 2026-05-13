'use client';

import { ReactNode, HTMLAttributes } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedButton({ children, redirectTo = '/dashboard', onClick, ...props }: ProtectedButtonProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!user) {
      // Redirect to login page if not authenticated
      router.push(`/login?returnUrl=${encodeURIComponent(redirectTo)}`);
      return;
    }

    // If authenticated, execute the original onClick
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  );
}
