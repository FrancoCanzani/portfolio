import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ItemIcon } from "@/components/item-icon";
import { SectionIndex } from "@/components/section-index";
import { getDictionary, hasLocale, type Item } from "@/content";

const reveal = (index: number) => ({ "--reveal-i": index }) as CSSProperties;

function Row({ item }: { item: Item }) {
  const body = (
    <>
      <ItemIcon name={item.icon} />
      <span className="min-w-0 flex-1">
        <span className="font-medium text-neutral-900">{item.title}</span>
        <span className="text-neutral-400"> · </span>
        <span className="text-neutral-500">{item.description}</span>
      </span>
      {item.meta ? <span className="shrink-0 text-neutral-400 tabular-nums">{item.meta}</span> : null}
      {item.href ? <ArrowUpRight className="size-3.5 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /> : null}
    </>
  );
  const shape = "group flex items-start gap-2.5 [&>*:first-child]:mt-[3px]";
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
      <header className="flex items-center justify-between px-6 pt-6">
        <Link href={`/${lang}`} className="font-medium tracking-tight text-neutral-900">
          {dict.name.split(" ")[0]}
        </Link>
        <Link
          href={`/${other}`}
          hrefLang={other}
          className="rounded-md px-2 py-1 text-[12px] text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900"
        >
          {dict.switchLabel}
        </Link>
      </header>

      <SectionIndex label={dict.indexLabel} entries={dict.sections.map(({ id, title }) => ({ id, title }))} />

      <main className="mx-auto max-w-[560px] px-6 pt-20 pb-32 sm:pt-28">
        <section className="reveal" style={reveal(order++)}>
          <h1 className="font-medium text-neutral-900">{dict.name}</h1>
          <p className="text-neutral-500">{dict.role}</p>
          {dict.summary.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-pretty text-neutral-500">
              {paragraph}
            </p>
          ))}
        </section>

        {dict.sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-12 scroll-mt-24">
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

        <footer className="reveal mt-20 text-[12px] text-neutral-400" style={reveal(order++)}>
          {dict.footer}
        </footer>
      </main>
    </div>
  );
}
