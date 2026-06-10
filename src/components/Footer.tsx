'use client';

import Link from 'next/link';
import { Brandmark, Wordmark } from '@/components/Brandmark';

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/solutions' },
      { label: 'Contact', href: '/contact' },
      { label: 'Resources', href: '/resources' },
    ],
  },
  {
    title: 'Audit',
    links: [
      { label: 'Websites', href: '/platform' },
      { label: 'YouTube', href: '/platform' },
      { label: 'Instagram', href: '/platform' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/contact' },
      { label: 'Terms', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <Brandmark className="size-9" />
              <Wordmark className="text-[1.35rem]" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              See exactly what’s costing you conversions — across websites,
              YouTube, and Instagram — with fixes ranked by impact. You decide
              what to change.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LeadLens. All rights reserved.
          </p>
          <p className="font-serif text-sm italic text-muted-foreground">
            Diagnose. Prioritize. Convert.
          </p>
        </div>
      </div>
    </footer>
  );
}
