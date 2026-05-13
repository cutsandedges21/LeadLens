'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { ThemeToggle } from '@/components/ThemeToggle'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const isAuth = pathname?.startsWith('/auth') || pathname?.startsWith('/login')

  return (
    <>
      {!isDashboard && !isAuth && <Navigation />}
      {children}
      {!isDashboard && !isAuth && <ThemeToggle />}
    </>
  )
}