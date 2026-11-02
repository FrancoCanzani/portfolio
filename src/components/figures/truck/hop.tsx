"use client";

import * as React from "react";

export function Hop({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<SVGGElement>(null);
  const hop = () => {
    const node = ref.current;
    if (!node) return;
    node.removeAttribute("data-hop");
    void node.getBoundingClientRect();
    node.setAttribute("data-hop", "");
  };
  return (
    <g ref={ref} className="truck-hop" onClick={hop} onAnimationEnd={(event) => event.target === ref.current && ref.current?.removeAttribute("data-hop")}>
      {children}
    </g>
  );
}
