import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { LoadingFigure } from "@/components/figures/loading/figure";
import { PortFigure } from "@/components/figures/port/figure";
import { RouteFigure } from "@/components/figures/route/figure";
import { getDictionary, hasLocale, type Dictionary, type Item } from "@/content";

const reveal = (index: number) => ({ "--reveal-i": index }) as CSSProperties;

function Tag({ current, children }: { current?: boolean; children: ReactNode }) {
  return (
    <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded border border-neutral-200 bg-white px-1.5 py-px font-mono text-[10.5px] leading-[18px] tracking-wide text-neutral-500 uppercase tabular-nums">
      {current ? <span className="size-1.5 animate-pulse rounded-full bg-signal" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

function ShippingLabel({ label, name }: { label: Dictionary["label"]; name: string }) {
  return (
    <a
      href={label.href}
      target="_blank"
      rel="noreferrer"
      className="group block rotate-[-0.6deg] rounded-lg border border-dashed border-neutral-300 bg-white p-5 font-mono text-[11px] leading-[18px] text-neutral-500 shadow-[0_1px_0_#0000000a,0_8px_24px_-12px_#0000001f] transition-transform duration-300 ease-out hover:rotate-0 hover:-translate-y-0.5"
    >
      <span className="flex items-center justify-between uppercase tracking-wider">
        <span>{label.shipTo}</span>
        <span className="rounded-sm bg-signal px-1.5 text-white">{label.priority}</span>
      </span>
      <span className="mt-3 block font-display text-[26px] leading-[30px] tracking-normal text-neutral-900 normal-case">{name}</span>
      <span className="mt-1 block">{label.service}</span>
      <span className="mt-4 block border-t border-dashed border-neutral-200 pt-4 font-sans text-[13px] text-neutral-500 sm:text-[14px]">{label.note}</span>
      <span className="mt-1 inline-flex items-center gap-1 font-sans text-[13px] font-medium text-neutral-900 transition-colors group-hover:text-signal sm:text-[14px]">
        {label.cta}
        <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
      <span className="mt-5 flex items-end justify-between gap-4">
        <span className="barcode block h-9 w-40" aria-hidden="true" />
        <span className="tracking-widest text-neutral-400">FC · 2026 · 08+</span>
      </span>
    </a>
  );
}

function Row({ item }: { item: Item }) {
  const body = (
    <>
      <span className="min-w-0 flex-1">
        <span className="font-medium text-neutral-900">{item.title}</span>
        <span className="text-neutral-400"> · </span>
        <span className="text-neutral-500">{item.description}</span>
      </span>
      {item.meta ? <Tag current={item.current}>{item.meta}</Tag> : null}
      {item.href ? <ArrowUpRight className="mt-1 size-3.5 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /> : null}
    </>
  );
  const shape = "group flex items-start gap-3";
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={`${shape} -mx-2 rounded-md px-2 py-1 transition-colors duration-200 hover:bg-red-50`}>
        {body}
      </a>
    );
  }
  return <div className={`${shape} py-1`}>{body}</div>;
}

function Figure({ item, dict }: { item: Item; dict: Dictionary }) {
  switch (item.figure) {
    case undefined:
      return null;
    case "loading":
      return <LoadingFigure label={dict.figures.loading} />;
    case "route":
      return <RouteFigure label={dict.figures.route} />;
    case "port":
      return <PortFigure label={dict.figures.port} />;
    default: {
      const never: never = item.figure;
      return never;
    }
  }
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const other = lang === "es" ? "en" : "es";
  let order = 0;

  return (
    <div className="min-h-dvh bg-[#fafafa] text-[13px] leading-[22px] text-neutral-600 sm:text-[14px]">
      <header className="sticky top-0 z-10 bg-[#fafafa]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[640px] items-center justify-between px-6 py-4">
          <Link href={`/${lang}`} className="font-medium text-neutral-900">
            {dict.name}
          </Link>
          <Link
            href={`/${other}`}
            hrefLang={other}
            className="-mr-2 shrink-0 rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[12px] text-neutral-500 transition-colors duration-200 hover:border-signal hover:text-signal"
          >
            {dict.switchLabel}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[640px] px-6 pt-10 pb-32 sm:pt-16">
        <div>
          <h1 className="reveal font-display text-[32px] leading-[36px] text-balance text-neutral-900 sm:text-[40px] sm:leading-[44px]" style={reveal(order++)}>
            {dict.name}
            <span className="text-signal"> | </span>
            <span className="text-neutral-500 italic">{dict.role}</span>
          </h1>
          <p className="reveal mt-4 text-pretty text-neutral-500" style={reveal(order++)}>
            {dict.intro}
          </p>
          <div className="reveal mt-8" style={reveal(order++)}>
            <LoadingFigure label={dict.figures.loading} />
          </div>
        </div>

        {dict.sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-16 scroll-mt-20">
            <div>
              <h2 className="reveal mb-2 font-medium text-neutral-900" style={reveal(order++)}>
                {section.title}
              </h2>
              {section.intro ? <p className="mb-3 text-neutral-500">{section.intro}</p> : null}
            </div>
            <ul className="space-y-1.5">
              {section.items.map((item) =>
                item.figure ? (
                  <li key={item.title} className="reveal pb-8" style={reveal(order++)}>
                    <Row item={item} />
                    <div className="my-4">
                      <Figure item={item} dict={dict} />
                    </div>
                    {item.body ? <p className="text-pretty text-neutral-500">{item.body}</p> : null}
                  </li>
                ) : (
                  <li key={item.title} className="reveal" style={reveal(order++)}>
                    <Row item={item} />
                  </li>
                ),
              )}
            </ul>
          </section>
        ))}

        <section id="contact" className="mt-16 scroll-mt-20">
          <h2 className="reveal mb-4 font-medium text-neutral-900" style={reveal(order++)}>
            {dict.label.title}
          </h2>
          <div className="reveal max-w-[380px]" style={reveal(order++)}>
            <ShippingLabel label={dict.label} name={dict.name} />
          </div>
        </section>
      </main>
    </div>
  );
}
