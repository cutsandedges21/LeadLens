'use client';

const logos = ['Northwind', 'Lumen', 'Acme', 'Vertex', 'Halcyon', 'Monarch'];

export function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Trusted by growth teams optimizing every kind of page
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {logos.map((name) => (
          <span
            key={name}
            className="font-serif text-xl font-semibold tracking-tight text-foreground/35 transition-colors hover:text-foreground/60"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
