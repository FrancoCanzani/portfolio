import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { RouteFigure } from "@/components/figures/route/figure";
import { getDictionary, hasLocale, type Item } from "@/content";

const reveal = (index: number) => ({ "--reveal-i": index }) as CSSProperties;

function Row({ item }: { item: Item }) {
  const body = (
    <>
      <span className="min-w-0 flex-1">
        <span className="font-medium text-neutral-900">{item.title}</span>
        <span className="text-neutral-400"> · </span>
        <span className="text-neutral-500">{item.description}</span>
      </span>
      {item.meta ? <span className="shrink-0 text-neutral-400 tabular-nums">{item.meta}</span> : null}
      {item.href ? <ArrowUpRight className="mt-1 size-3.5 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /> : null}
    </>
  );
  const shape = "group flex items-start gap-3";
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={`${shape} -mx-2 rounded-md px-2 py-1 transition-colors duration-200 hover:bg-neutral-100`}>
        {body}
      </a>
    );
  }
  return <div className={`${shape} py-1`}>{body}</div>;
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
        <div className="mx-auto flex max-w-[1040px] items-center justify-between px-6 py-4">
          <Link href={`/${lang}`} className="font-medium text-neutral-900">
            {dict.name}
          </Link>
          <Link
            href={`/${other}`}
            hrefLang={other}
            className="-mr-2 shrink-0 rounded-md px-2 py-1 text-[12px] text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900"
          >
            {dict.switchLabel}
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1040px] flex-col gap-10 px-6 pt-10 pb-32 sm:pt-16 lg:grid lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-12">
        <div className="lg:col-start-1 lg:row-start-1">
          <h1 className="reveal text-[18px] leading-[28px] font-medium text-balance text-neutral-900 sm:text-[20px] sm:leading-[30px]" style={reveal(order++)}>
            {dict.name}
            <span className="text-neutral-300"> | </span>
            <span>{dict.role}</span>
          </h1>
          <p className="reveal mt-4 text-pretty text-neutral-500" style={reveal(order++)}>
            {dict.intro}
          </p>
        </div>

        <aside className="reveal lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start" style={reveal(order++)}>
          <RouteFigure label={dict.figureLabel} />
        </aside>

        <div className="lg:col-start-1 lg:row-start-2">
          {dict.sections.map((section, index) => (
            <section key={section.id} id={section.id} className={`${index ? "mt-12" : ""} scroll-mt-20`}>
              <h2 className="reveal mb-2 font-medium text-neutral-900" style={reveal(order++)}>
                {section.title}
              </h2>
              {section.intro ? <p className="mb-3 text-neutral-500">{section.intro}</p> : null}
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item.title} className="reveal" style={reveal(order++)}>
                    <Row item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
