"use client";

import * as React from "react";
import type { Dictionary } from "@/content";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@./-";
const STEP_MS = 55;
const CHAR_STAGGER_MS = 28;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

function useInView<T extends Element>() {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, inView] as const;
}

function Flap({ text, active, delay = 0, tone = "amber" }: { text: string; active: boolean; delay?: number; tone?: "amber" | "green" | "light" }) {
  const [shown, setShown] = React.useState(() => " ".repeat(text.length));

  React.useEffect(() => {
    if (!active) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settleAt = Array.from(text, (_, i) => (still ? 0 : delay + i * CHAR_STAGGER_MS + Math.random() * 160));
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      setShown(Array.from(text, (char, i) => (elapsed >= settleAt[i] || char === " " ? char : randomGlyph())).join(""));
      if (elapsed < Math.max(...settleAt)) timer = window.setTimeout(tick, STEP_MS);
    };
    let timer = window.setTimeout(tick, 0);
    return () => window.clearTimeout(timer);
  }, [text, active, delay]);

  const color = tone === "green" ? "text-emerald-400" : tone === "light" ? "text-neutral-200" : "text-amber-300";
  return (
    <span className={`inline-flex flex-wrap gap-px ${color}`}>
      <span className="sr-only">{text}</span>
      {Array.from({ length: text.length }, (_, i) => shown[i] ?? " ").map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="relative inline-flex w-[1.15ch] justify-center rounded-[2px] bg-[#1d1d1f] leading-[1.7] after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-black/50"
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

function Clock() {
  const [time, setTime] = React.useState<string | null>(null);
  React.useEffect(() => {
    const format = new Intl.DateTimeFormat("es-ES", { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit" });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 10_000);
    return () => window.clearInterval(id);
  }, []);
  const [hours, minutes] = (time ?? "--:--").split(":");
  return (
    <span className="tabular-nums text-amber-300">
      {hours}
      <span className="animate-pulse">:</span>
      {minutes}
    </span>
  );
}

const rowShape =
  "grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-t border-white/[0.06] px-4 py-3 sm:grid-cols-[7.5rem_1fr_auto] sm:px-5";

export function DeparturesBoard({ contact }: { contact: Dictionary["contact"] }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = () => {
    navigator.clipboard?.writeText(contact.email).then(() => setCopied(true), () => undefined);
  };

  const rows = [
    {
      key: "email",
      destination: "EMAIL",
      value: contact.email,
      status: copied ? contact.status.copied : contact.status.available,
      href: `mailto:${contact.email}`,
      onClick: copyEmail,
    },
    {
      key: "linkedin",
      destination: "LINKEDIN",
      value: contact.linkedin.handle,
      status: contact.status.online,
      href: contact.linkedin.href,
      external: true,
    },
  ];

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl bg-[#111113] font-mono text-[11px] shadow-[0_1px_0_#0000000a,0_16px_32px_-16px_#00000059] ring-1 ring-black/80 sm:text-[13px]"
    >
      <div className="flex items-center justify-between px-4 py-3 tracking-[0.2em] uppercase sm:px-5">
        <span className="text-neutral-400">{contact.board}</span>
        <Clock />
      </div>
      <div className={`${rowShape} hidden text-[10px] tracking-[0.18em] text-neutral-500 uppercase sm:grid sm:text-[10.5px]`}>
        <span>{contact.columns.destination}</span>
        <span>{contact.columns.contact}</span>
        <span className="text-right">{contact.columns.status}</span>
      </div>
      {rows.map((row, index) => (
        <a
          key={row.key}
          href={row.href}
          onClick={row.onClick}
          target={row.external ? "_blank" : undefined}
          rel={row.external ? "noreferrer" : undefined}
          className={`${rowShape} transition-colors duration-200 hover:bg-white/[0.03] focus-visible:bg-white/[0.05] focus-visible:outline-none`}
        >
          <span className="order-1">
            <Flap text={row.destination} active={inView} delay={index * 240} tone="light" />
          </span>
          <span className="order-2 justify-self-end sm:order-3">
            <Flap text={row.status.toUpperCase()} active={inView} delay={index * 240 + 500} tone="green" />
          </span>
          <span className="order-3 col-span-2 sm:order-2 sm:col-span-1">
            <Flap text={row.value} active={inView} delay={index * 240 + 150} />
          </span>
        </a>
      ))}
    </div>
  );
}
