"use client";

import { useEffect, useState } from "react";

interface Entry {
  id: string;
  title: string;
}

export function SectionIndex({ label, entries }: { label: string; entries: Entry[] }) {
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (seen) => {
        const visible = seen.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    for (const { id } of entries) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label={label} className="fixed top-1/2 left-[calc(50%-280px-160px)] hidden w-32 -translate-y-1/2 text-[12px] leading-[22px] xl:block">
      <p className="mb-1 text-neutral-900">{label}</p>
      <ul>
        {entries.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className="flex items-center gap-1.5 text-neutral-400 transition-colors duration-200 hover:text-neutral-700 aria-[current]:text-neutral-900"
            >
              <span className={`size-1 rounded-full bg-current transition-opacity duration-200 ${active === id ? "opacity-100" : "opacity-0"}`} />
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
