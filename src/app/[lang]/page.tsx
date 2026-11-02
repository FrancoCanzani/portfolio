import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { LangSwitch } from "@/components/header/lang-switch";
import { ScrollTruck } from "@/components/header/scroll-truck";
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

function Emphasis({ text }: { text: string }) {
  return text
    .split("**")
    .map((part, i) => (i % 2 ? <strong key={i} className="font-semibold text-neutral-900">{part}</strong> : part));
}

function ShippingLabel({ label, name }: { label: Dictionary["label"]; name: string }) {
  return (
    <div className="rotate-[-0.6deg] rounded-lg border border-dashed border-neutral-300 bg-white p-5 font-mono text-[11px] leading-[18px] text-neutral-500 shadow-[0_1px_0_#0000000a,0_8px_24px_-12px_#0000001f] transition-transform duration-300 ease-out hover:rotate-0">
      <div className="flex items-center justify-between tracking-wider uppercase">
        <span>{label.shipTo}</span>
        <span className="rounded-sm bg-signal px-1.5 text-white">{label.priority}</span>
      </div>
      <p className="mt-3 font-sans text-[22px] leading-[28px] font-medium tracking-[-0.01em] text-neutral-900">{name}</p>
      <p className="mt-0.5">{label.service}</p>
      <p className="mt-4 border-t border-dashed border-neutral-200 pt-4 font-sans text-[13px] text-pretty text-neutral-500 sm:text-[14px]">{label.note}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 font-sans text-[13px] sm:text-[14px]">
        <a
          href={`mailto:${label.email}`}
          className="inline-flex items-center rounded-full bg-neutral-900 px-3.5 py-1.5 font-medium text-white transition-colors duration-200 hover:bg-signal"
        >
          {label.emailCta}
        </a>
        <a
          href={label.href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3.5 py-1.5 font-medium text-neutral-900 transition-colors duration-200 hover:border-signal hover:text-signal"
        >
          {label.linkedinCta}
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-2 select-all">{label.email}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="barcode block h-9 w-40" aria-hidden="true" />
        <span className="tracking-widest text-neutral-400">FC · 08+ YRS</span>
      </div>
    </div>
  );
}

function Milestone({ item }: { item: Item }) {
  return (
    <>
      <span className="absolute top-[3px] -left-[5px] flex size-[9px]" aria-hidden="true">
        {item.current ? <span className="absolute inset-0 animate-ping rounded-[2px] bg-sky-500 opacity-60" /> : null}
        <span className={`relative size-[9px] rounded-[2px] ring-4 ring-[#fafafa] ${item.current ? "bg-sky-500" : "bg-neutral-300"}`} />
      </span>
      {item.period ? <p className="mb-1 font-mono text-[11px] leading-[16px] text-neutral-400 tabular-nums">{item.period}</p> : null}
    </>
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
  let order = 0;

  return (
    <div className="min-h-dvh bg-[#fafafa] text-[13px] leading-[22px] text-neutral-600 sm:text-[14px]">
      <header className="sticky top-0 z-10 bg-[#fafafa]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[640px] items-center gap-4 px-6 py-2">
          <ScrollTruck />
          <LangSwitch lang={lang} />
        </div>
      </header>

      <main className="mx-auto max-w-[640px] px-6 pt-10 pb-32 sm:pt-16">
        <div>
          <h1 className="reveal text-[24px] leading-[32px] font-medium tracking-[-0.01em] text-balance text-neutral-900 sm:text-[28px] sm:leading-[36px]" style={reveal(order++)}>
            {dict.greeting} {dict.name}
            <span className="block text-neutral-500">{dict.role}</span>
          </h1>
          <p className="reveal mt-4 text-[18px] leading-[28px] text-pretty text-neutral-600 sm:text-[20px] sm:leading-[30px]" style={reveal(order++)}>
            <Emphasis text={dict.intro} />
          </p>
        </div>

        {dict.sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-16 scroll-mt-20">
            <div>
              <h2 className="reveal mb-2 font-medium text-neutral-900" style={reveal(order++)}>
                {section.title}
              </h2>
              {section.intro ? <p className="mb-3 text-neutral-500">{section.intro}</p> : null}
            </div>
            <ul className={section.timeline ? "ml-1 border-l border-dashed border-neutral-300" : "space-y-1.5"}>
              {section.items.map((item) => (
                <li key={item.title} className={`reveal ${section.timeline ? "relative pb-12 pl-6 last:pb-0" : ""}`} style={reveal(order++)}>
                  {section.timeline ? <Milestone item={item} /> : null}
                  <Row item={item} />
                  {item.figure ? (
                    <div className="my-4">
                      <Figure item={item} dict={dict} />
                    </div>
                  ) : null}
                  {item.body ? <p className="text-pretty text-neutral-500">{item.body}</p> : null}
                </li>
              ))}
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
