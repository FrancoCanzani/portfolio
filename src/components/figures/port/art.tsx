import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import { TruckArt } from "../truck/art";
import { BASE_ART, CRANE_TOP, LEGS_BACK, LEGS_FRONT, PICKED, QUAY_ART, SHIP_ART, SPREADER, TROLLEY, TRUCK, YARD, type ContainerArt } from "./geometry";
import { PortLive } from "./live";

function Container({ art, cargo = false }: { art: ContainerArt; cargo?: boolean }) {
  return (
    <g>
      <Solid paths={art.body} tone="mid" crease="faint" className={cargo ? "iso-cargo" : undefined} />
      <Line d={art.ribs} tone="faint" className={cargo ? "iso-cargo-line" : undefined} />
      <Line d={art.doors} tone="lo" className={cargo ? "iso-cargo-line" : undefined} />
    </g>
  );
}

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
    <Line d={BASE_ART.screwRings} tone="lo" />
    <Dots points={BASE_ART.screws} size={0.5} tone="mid" />
    <Solid paths={QUAY_ART.water} tone="lo" crease="none" flat className="iso-water" />
    <Line d={QUAY_ART.waves} tone="lo" className="iso-wave" />
    <Line d={QUAY_ART.edge} tone="mid" />
    <Line d={QUAY_ART.lanes} tone="faint" />
    <Line d={QUAY_ART.dashes} tone="faint" />
    {QUAY_ART.bollards.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
  </g>
);

const SHIP = (
  <g>
    <Solid paths={SHIP_ART.hull} tone="hi" />
    <Line d={SHIP_ART.waterline} tone="lo" />
    <Solid paths={SHIP_ART.bridge} tone="mid" inner={<Line d={SHIP_ART.bridgeWindows} tone="mid" />} />
    <Solid paths={SHIP_ART.funnel} tone="mid" />
    {SHIP_ART.cargo.map((art, index) => (
      <Container key={index} art={art} />
    ))}
  </g>
);

const legs = (list: typeof LEGS_BACK) => (
  <g>
    {list.map((item, index) => (
      <g key={index}>
        <Solid paths={item.bogie} tone="mid" />
        <Solid paths={item.post} tone="hi" />
      </g>
    ))}
  </g>
);

const TOP = (
  <g>
    <Line d={CRANE_TOP.stays} tone="mid" />
    {CRANE_TOP.portals.map((paths, index) => (
      <Solid key={`p${index}`} paths={paths} tone="hi" />
    ))}
    <Solid paths={CRANE_TOP.beam} tone="hi" />
    {CRANE_TOP.girders.map((paths, index) => (
      <Solid key={`g${index}`} paths={paths} tone="hi" />
    ))}
  </g>
);

const YARD_ART = (
  <g>
    {YARD.map((art, index) => (
      <Container key={index} art={art} />
    ))}
  </g>
);

export function PortArt({ label }: { label: string }) {
  return (
    <PortLive
      label={label}
      base={BASE}
      ship={SHIP}
      legsBack={legs(LEGS_BACK)}
      legsFront={legs(LEGS_FRONT)}
      top={TOP}
      yard={YARD_ART}
      truck={<TruckArt parts={TRUCK} />}
      box={<Container art={PICKED} cargo />}
      trolley={<Solid paths={TROLLEY} tone="hi" />}
      spreader={<Solid paths={SPREADER} tone="hi" />}
    />
  );
}
