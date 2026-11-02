import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import type { Part } from "./geometry";

function part(item: Part, index: number) {
  const inner = (() => {
    switch (item.kind) {
      case "solid":
        return <Solid paths={item.paths!} tone={item.tone} crease="faint" className={item.accent ? "iso-accent" : undefined} />;
      case "line":
        return <Line d={item.d!} tone={item.tone} />;
      case "wheel":
        return (
          <>
            <Solid paths={item.paths!} tone="hi" crease="none" />
            <Line d={item.hub!} tone="lo" />
            <Dots points={item.dots!} size={0.32} tone="mid" />
          </>
        );
      case "pallet":
        return (
          <>
            <Solid paths={item.paths!} tone={item.tone} crease="faint" />
            {item.strap ? <Line d={item.strap} tone="lo" /> : null}
          </>
        );
      default: {
        const never: never = item.kind;
        return never;
      }
    }
  })();
  return (
    <g key={index} data-pallet={item.kind === "pallet" ? item.pallet : undefined}>
      {inner}
    </g>
  );
}

export function TruckArt({ parts }: { parts: Part[] }) {
  return <>{parts.map(part)}</>;
}
