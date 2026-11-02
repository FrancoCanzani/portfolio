import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import { Verge } from "../scenery-art";
import { TruckArt } from "../truck/art";
import { BASE_ART, BOX_ART, DOCK_ART, TRUCK, TRUCK_MARKS, VERGE, WAREHOUSE_ART } from "./geometry";
import { LoadingLive } from "./live";

const BASE = (
  <g>
    <path className="iso-halo" d={BASE_ART.halo} />
    {BASE_ART.feet.map((pair, index) => (
      <g key={index}>
        {pair.map((paths, part) => (
          <Solid key={part} paths={paths} tone={part ? "mid" : "lo"} />
        ))}
      </g>
    ))}
    <Solid paths={BASE_ART.slab} tone="mid" />
    <Line d={BASE_ART.groove} tone="lo" />
    <Line d={BASE_ART.screwRings} tone="lo" />
    <Dots points={BASE_ART.screws} size={0.5} tone="mid" />
    <Line d={BASE_ART.bays} tone="faint" />
    <Verge art={VERGE} />
  </g>
);

const WAREHOUSE = (
  <g>
    <Solid paths={WAREHOUSE_ART.body} tone="mid" inner={<Line d={WAREHOUSE_ART.band} tone="faint" />} />
    <Line d={WAREHOUSE_ART.parapet} tone="lo" />
    <Line d={WAREHOUSE_ART.ribs} tone="faint" />
    <Line d={WAREHOUSE_ART.windows} tone="lo" />
    <Line d={WAREHOUSE_ART.frame} tone="lo" />
    <Line d={WAREHOUSE_ART.door} tone="mid" />
    {WAREHOUSE_ART.vents.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" />
    ))}
    <Line d={WAREHOUSE_ART.ventRings} tone="lo" />
    <Solid paths={DOCK_ART.dock} tone="mid" />
    <Line d={DOCK_ART.plate} tone="faint" />
    {DOCK_ART.bumpers.map((paths, index) => (
      <Solid key={index} paths={paths} tone="lo" crease="none" />
    ))}
  </g>
);

const BOX = (
  <g className="tint-kraft">
    <Solid paths={BOX_ART.body} tone="mid" crease="faint" className="iso-tint" />
    <Line d={BOX_ART.tape} className="iso-tint-line" />
  </g>
);

export function LoadingArt({ label }: { label: string }) {
  return <LoadingLive label={label} base={BASE} warehouse={WAREHOUSE} truck={<TruckArt parts={TRUCK} marks={TRUCK_MARKS} />} box={BOX} />;
}
