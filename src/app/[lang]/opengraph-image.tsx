import { ImageResponse } from "next/og";
import { getDictionary, hasLocale, locales } from "@/content";

export const alt = "Franco Canzani — Account & Logistics Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "es");

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "84px 96px", background: "#fdfdfd" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#a3a3a3" }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, background: "#0ea5e9" }} />
          {dict.meta.tagline}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 72, lineHeight: 1.15, letterSpacing: -2 }}>
          <span style={{ fontSize: 88, color: "#171717" }}>{dict.name}</span>
          <span style={{ fontSize: 60, color: "#737373" }}>{dict.role}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", marginTop: "auto", height: 96, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, borderTop: "3px dashed #d4d4d4" }} />
          <svg width="240" height="96" viewBox="0 0 40 16" style={{ position: "absolute", left: 620, bottom: 6 }}>
            <rect x="1" y="3" width="24" height="8" rx="1" fill="#fff" stroke="#a1a1aa" strokeWidth="0.6" />
            <path d="M5 3v8M9 3v8M13 3v8M17 3v8M21 3v8" stroke="#e4e4e7" strokeWidth="0.5" />
            <path d="M1 11.4h35" stroke="#71717a" strokeWidth="0.7" />
            <path d="M26 11V6.6A1.6 1.6 0 0 1 27.6 5h4.6a1.6 1.6 0 0 1 1.3.7l2.1 3V11z" fill="#e5352c" stroke="#8f1b16" strokeWidth="0.5" />
            <path d="M31.2 6h1.6l1.6 2.4h-3.2z" fill="#ffe4e1" />
            <rect x="35" y="9.4" width="1.4" height="1.2" rx="0.3" fill="#ffb020" />
            <circle cx="6" cy="13" r="2" fill="#27272a" />
            <circle cx="11" cy="13" r="2" fill="#27272a" />
            <circle cx="31" cy="13" r="2" fill="#27272a" />
          </svg>
          <svg width="108" height="96" viewBox="0 0 18 16" style={{ position: "absolute", right: 0, bottom: 12 }}>
            <path d="M1 15V6l8-4 8 4v9z" fill="#fff" stroke="#a1a1aa" strokeWidth="0.6" />
            <rect x="5" y="9" width="8" height="6" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="0.5" />
            <path d="M5 11h8M5 13h8" stroke="#d4d4d8" strokeWidth="0.4" />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
