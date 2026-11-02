import type { JSX } from "react";
import Link from "next/link";
import type { Locale } from "@/content";

function SpainFlag() {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="3" height="2" fill="#aa151b" />
      <rect y="0.5" width="3" height="1" fill="#f1bf00" />
    </svg>
  );
}

function UkFlag() {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className="size-full">
      <clipPath id="uk-flag-cross">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk-flag-cross)" stroke="#c8102e" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

const OPTIONS: Array<{ locale: Locale; label: string; Flag: () => JSX.Element }> = [
  { locale: "es", label: "Español", Flag: SpainFlag },
  { locale: "en", label: "English", Flag: UkFlag },
];

export function LangSwitch({ lang }: { lang: Locale }) {
  return (
    <nav aria-label="Language" className="flex shrink-0 items-center gap-0.5 rounded-full border border-neutral-200 bg-white p-0.5">
      {OPTIONS.map(({ locale, label, Flag }) => {
        const active = locale === lang;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            hrefLang={locale}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`flex size-6 items-center justify-center rounded-full transition-all duration-200 ${active ? "bg-neutral-100" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"}`}
          >
            <span className="block size-4 overflow-hidden rounded-full ring-1 ring-black/10">
              <Flag />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
