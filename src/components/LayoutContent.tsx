'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ThemeToggle } from '@/components/ThemeToggle'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/settings')
  const isAuth = pathname?.startsWith('/auth') || pathname?.startsWith('/login')
  const isChrome = !isDashboard && !isAuth

  return (
    <>
      {isChrome && <Navigation />}
      <div className="flex-1">{children}</div>
      {isChrome && <Footer />}
      {isChrome && <ThemeToggle />}
    </>
  )
}
