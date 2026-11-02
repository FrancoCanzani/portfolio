import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { EmailLink } from "@/components/contact/email-link";
import { LangSwitch } from "@/components/header/lang-switch";
import { ScrollTruck } from "@/components/header/scroll-truck";
import { LoadingFigure } from "@/components/figures/loading/figure";
import { PortFigure } from "@/components/figures/port/figure";
import { RouteFigure } from "@/components/figures/route/figure";
import { clients, getDictionary, hasLocale, type Dictionary, type Item } from "@/content";

const reveal = (index: number) => ({ "--reveal-i": index }) as CSSProperties;

function Tag({ current, children }: { current?: boolean; children: ReactNode }) {
  return (
    <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded border border-neutral-200 bg-white px-1.5 py-px font-mono text-[10.5px] leading-[18px] tracking-wide text-neutral-500 tabular-nums">
      {current ? <span className="size-1.5 animate-pulse rounded-full bg-signal" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
    </svg>
  );
}

const contactLinkClass =
  "group -mx-2 inline-flex items-center gap-2.5 rounded-md px-2 py-1 text-neutral-900 transition-colors duration-200 hover:bg-red-50 hover:text-signal";

function ContactLink({ href, icon, external, children }: { href: string; icon: ReactNode; external?: boolean; children: ReactNode }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={contactLinkClass}>
      <span className="text-neutral-400 transition-colors duration-200 group-hover:text-signal">{icon}</span>
      {children}
      {external ? <ArrowUpRight className="size-3.5 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /> : null}
    </a>
  );
}

function Emphasis({ text }: { text: string }) {
  return text
    .split("**")
    .map((part, i) => (i % 2 ? <strong key={i} className="font-semibold text-neutral-900">{part}</strong> : part));
}

function Milestone({ item }: { item: Item }) {
  return (
    <>
      <span className="absolute top-[3px] -left-[5px] flex size-[9px]" aria-hidden="true">
        {item.current ? <span className="absolute inset-0 animate-ping rounded-[2px] bg-sky-500 opacity-60" /> : null}
        <span className={`relative size-[9px] rounded-[2px] ring-4 ring-[#fdfdfd] ${item.current ? "bg-sky-500" : "bg-neutral-300"}`} />
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
    <div className="min-h-dvh bg-[#fdfdfd] text-[13px] leading-[22px] text-neutral-600 sm:text-[14px]">
      <header className="sticky top-0 z-10 bg-[#fdfdfd]/80 backdrop-blur-md">
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
          <div className="reveal mt-10" style={reveal(order++)}>
            <p className="mb-4 text-center text-neutral-400">{dict.clientsTitle}</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              {clients.map((client) => (
                <li key={client.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={client.src}
                    alt={client.name}
                    title={client.name}
                    style={{ height: client.height }}
                    className={`w-auto opacity-60 transition duration-300 hover:opacity-100 ${
                      client.silhouette ? "brightness-0" : "grayscale hover:grayscale-0"
                    }`}
                  />
                </li>
              ))}
            </ul>
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
            {dict.contact.title}
          </h2>
          <ul className="reveal space-y-1.5" style={reveal(order++)}>
            <li>
              <EmailLink
                user={dict.contact.email.user}
                domain={dict.contact.email.domain}
                icon={<Mail className="size-4" aria-hidden="true" />}
                className={contactLinkClass}
              />
            </li>
            <li>
              <ContactLink href={dict.contact.linkedin.href} icon={<LinkedInIcon />} external>
                {dict.contact.linkedin.handle}
              </ContactLink>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
