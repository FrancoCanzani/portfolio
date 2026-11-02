import { Award, ChartLine, Code, GraduationCap, Languages, Route, Sparkles, Truck, type LucideIcon } from "lucide-react";
import type { IconName } from "@/content";

const TINTS: Record<IconName, string> = {
  truck: "bg-amber-500",
  route: "bg-orange-500",
  chart: "bg-blue-500",
  code: "bg-violet-500",
  languages: "bg-emerald-500",
  graduation: "bg-neutral-800",
  award: "bg-rose-500",
  linkedin: "bg-[#0a66c2]",
  sparkles: "bg-neutral-800",
};

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const GLYPHS: Record<Exclude<IconName, "linkedin">, LucideIcon> = {
  truck: Truck,
  route: Route,
  chart: ChartLine,
  code: Code,
  languages: Languages,
  graduation: GraduationCap,
  award: Award,
  sparkles: Sparkles,
};

export function ItemIcon({ name }: { name: IconName }) {
  const glyph = "size-2.5 text-white";
  let inner: React.ReactNode;
  if (name === "linkedin") inner = <LinkedInGlyph className={glyph} />;
  else {
    const Glyph = GLYPHS[name];
    inner = <Glyph className={glyph} strokeWidth={2.5} aria-hidden="true" />;
  }
  return <span className={`grid size-4 shrink-0 place-items-center rounded-[4px] ${TINTS[name]}`}>{inner}</span>;
}
