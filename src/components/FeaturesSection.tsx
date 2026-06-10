'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ClipboardCheck, Globe, ArrowUpRight } from 'lucide-react';
import { YouTubeIcon, InstagramIcon } from '@/components/PlatformIcons';

function RankedVisual() {
  const rows = [
    { label: 'Rewrite primary CTA', impact: '+12%', w: '92%' },
    { label: 'Compress hero image', impact: '+7%', w: '64%' },
    { label: 'Add testimonials', impact: '+5%', w: '48%' },
    { label: 'Tighten headline', impact: '+4%', w: '36%' },
  ];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Prioritized fixes
      </p>
      <div className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">{r.label}</span>
              <span className="font-bold text-brand">{r.impact}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-brand/70" style={{ width: r.w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaybookVisual() {
  const items = [
    'Change button text to “Start free audit”',
    'Move social proof above the fold',
    'Reduce form from 6 fields to 3',
  ];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Do this next
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li
            key={t}
            className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          >
            <ClipboardCheck className="mt-0.5 size-4 shrink-0 text-brand" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlatformVisual() {
  const platforms = [
    { Icon: Globe, label: 'Website', note: 'Landing pages & funnels' },
    { Icon: YouTubeIcon, label: 'YouTube', note: 'Channels & video pages' },
    { Icon: InstagramIcon, label: 'Instagram', note: 'Profiles & posts' },
  ];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-3">
        {platforms.map((p) => (
          <div
            key={p.label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-background px-4 py-3"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-foreground">
              <p.Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{p.label}</p>
              <p className="text-xs text-muted-foreground">{p.note}</p>
            </div>
            <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    eyebrow: 'Ranked by impact',
    Icon: TrendingUp,
    title: 'Every finding tied to revenue, not vibes.',
    body: 'LeadLens doesn’t hand you a 40-point checklist. It estimates the conversion lift behind each fix and sorts them, so you spend effort where it actually pays back.',
    visual: <RankedVisual />,
    reverse: false,
  },
  {
    eyebrow: 'Clear, do-it-yourself fixes',
    Icon: ClipboardCheck,
    title: 'Plain-English changes you can ship today.',
    body: 'No jargon, no vague “improve UX.” Each recommendation is specific and actionable — exactly what to change and why. You stay in control of what gets done.',
    visual: <PlaybookVisual />,
    reverse: true,
  },
  {
    eyebrow: 'One tool, three platforms',
    Icon: Globe,
    title: 'Audit websites, YouTube, and Instagram.',
    body: 'Conversion isn’t only a website problem. Point LeadLens at a channel or profile and get the same impact-ranked guidance, tuned to how that platform converts.',
    visual: <PlatformVisual />,
    reverse: false,
  },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">
          What you get
        </span>
        <h2 className="font-editorial mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          A consultant-grade audit, without the consultant.
        </h2>
      </div>

      <div className="mt-16 space-y-20 lg:space-y-28">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className={f.reverse ? 'lg:order-2' : ''}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <f.Icon className="size-3.5 text-brand" />
                {f.eyebrow}
              </span>
              <h3 className="font-editorial mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {f.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className={f.reverse ? 'lg:order-1' : ''}
            >
              {f.visual}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
