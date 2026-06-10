'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { LayoutGrid, FileText, BarChart3, Settings, HelpCircle, LogOut, X } from 'lucide-react'
import { Brandmark, Wordmark } from '@/components/Brandmark'

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Audits', href: '/dashboard/audits' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/dashboard/help' },
]

export function Sidebar({
  open = false,
  onClose,
}: {
  open?: boolean
  onClose?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:z-30 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <Brandmark className="size-9" />
            <Wordmark />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon className="size-[18px]" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="border-t border-sidebar-border p-3">
          <div className="mb-2 flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
