import * as React from "react";
import { Solid } from "@/components/iso/react/draw";
import type { VergeArt } from "./scenery";

export function Verge({ art }: { art: VergeArt }) {
  return (
    <g>
      <Solid paths={art.strip} tone="lo" crease="none" flat className="iso-flat-verge" />
      <g className="tint-green">
        {art.bushes.map((bush, index) => (
          <g key={index}>
            <Solid paths={bush.trunk} tone="mid" crease="none" className="iso-tint" />
            <Solid paths={bush.crown} tone="mid" crease="none" className="iso-tint" />
          </g>
        ))}
      </g>
    </g>
  );
}
