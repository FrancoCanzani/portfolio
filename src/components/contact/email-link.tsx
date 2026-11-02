"use client";

import * as React from "react";
import type { ReactNode } from "react";

const subscribe = () => () => {};

/** Assembles the address only in the browser so scrapers reading the HTML never see it. */
export function EmailLink({ user, domain, icon, className }: { user: string; domain: string; icon: ReactNode; className?: string }) {
  const hydrated = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const address = hydrated ? [user, domain].join("@") : `${user} [at] ${domain.replace(".", " [dot] ")}`;

  return (
    <a
      href={hydrated ? `mailto:${address}` : undefined}
      onClick={(event) => {
        if (!hydrated) event.preventDefault();
      }}
      className={className}
    >
      <span className="text-neutral-400 transition-colors duration-200 group-hover:text-signal">{icon}</span>
      {address}
    </a>
  );
}
