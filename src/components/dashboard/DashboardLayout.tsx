'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Brandmark, Wordmark } from '@/components/Brandmark'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <Brandmark className="size-8" />
          <Wordmark />
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-full p-2 text-foreground transition-colors hover:bg-accent"
        >
          <Menu className="size-6" />
        </button>
      </header>

      <Sidebar open={open} onClose={() => setOpen(false)} />

      <main className="p-4 sm:p-6 lg:ml-64 lg:p-8">{children}</main>
    </div>
  )
}
