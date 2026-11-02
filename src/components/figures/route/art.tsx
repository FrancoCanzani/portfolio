import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import { TruckArt } from "../truck/art";
import { BASE_ART, CUSTOMER_ART, DEPOT_ART, ROAD_ART, TRUCK_BACK, TRUCK_OUT } from "./geometry";
import { RouteLive } from "./live";

const BASE = (
  <g key="base">
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
    <Solid paths={ROAD_ART.road} tone="lo" crease="none" />
    <Line d={ROAD_ART.edges} tone="lo" />
    <Line d={ROAD_ART.dashes} tone="faint" free />
    {ROAD_ART.aprons.map((paths, index) => (
      <Solid key={index} paths={paths} tone="lo" crease="none" flat />
    ))}
    <Line d={ROAD_ART.bays} tone="faint" />
    <Line d={ROAD_ART.kmMinor} tone="lo" />
    <Line d={ROAD_ART.kmMajor} tone="mid" />
  </g>
);

function building(art: typeof DEPOT_ART, key: string) {
  return (
    <g key={key}>
      <Solid paths={art.body} tone="mid" inner={<Line d={art.band} tone="faint" />} />
      <Line d={art.parapet} tone="lo" />
      <Line d={art.ribs} tone="faint" />
      <Line d={art.doors} tone="mid" />
      <Line d={art.slats} tone="faint" />
      <Line d={art.windows} tone="lo" />
      {art.bumpers.map((paths, index) => (
        <Solid key={index} paths={paths} tone="lo" crease="none" />
      ))}
      {art.vents.map((paths, index) => (
        <Solid key={index} paths={paths} tone="mid" />
      ))}
      <Line d={art.ventRings} tone="lo" />
      {art.canopy ? <Solid paths={art.canopy} tone="mid" /> : null}
      <Line d={art.canopyRods} tone="lo" />
    </g>
  );
}

const DEPOT = building(DEPOT_ART, "depot");
const CUSTOMER = building(CUSTOMER_ART, "customer");

const TRUCK_OUT_ART = <TruckArt parts={TRUCK_OUT} />;
const TRUCK_BACK_ART = <TruckArt parts={TRUCK_BACK} />;

export function RouteArt({ label }: { label: string }) {
  return <RouteLive label={label} base={BASE} depot={DEPOT} customer={CUSTOMER} truckOut={TRUCK_OUT_ART} truckBack={TRUCK_BACK_ART} />;
}
