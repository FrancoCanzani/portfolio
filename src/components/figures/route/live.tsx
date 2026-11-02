"use client";

import * as React from "react";
import { translateAlong } from "@/components/iso/iso-kit";
import { asksForStillness, useInView, useLoop } from "@/components/iso/react/live";
import { STILL_AT, momentOf } from "./model";
import { CUSTOMER_X, DEPOT_X, HEIGHT, P, WIDTH } from "./view";

interface Props {
  label: string;
  base: React.ReactNode;
  depot: React.ReactNode;
  customer: React.ReactNode;
  truckOut: React.ReactNode;
  truckBack: React.ReactNode;
}

export function RouteLive(props: Props) {
  const stage = React.useRef<HTMLDivElement>(null);
  const outRef = React.useRef<SVGGElement | null>(null);
  const backRef = React.useRef<SVGGElement | null>(null);
  const inView = useInView(stage);
  const clock = React.useRef(0);

  const draw = React.useCallback(() => {
    const moment = momentOf(clock.current);
    const truck = moment.heading === 1 ? outRef.current : backRef.current;
    const other = moment.heading === 1 ? backRef.current : outRef.current;
    if (other && other.style.display !== "none") other.style.display = "none";
    if (!truck) return;
    if (truck.style.display) truck.style.display = "";
    truck.setAttribute("transform", translateAlong(P, [DEPOT_X + (CUSTOMER_X - DEPOT_X) * moment.along, 0, 0]));
    const shown = Math.ceil(moment.load - 1e-6);
    truck.querySelectorAll<SVGGElement>("[data-pallet]").forEach((node) => {
      const display = Number(node.dataset.pallet) < shown ? "" : "none";
      if (node.style.display !== display) node.style.display = display;
    });
  }, []);

  useLoop((dt, calm) => {
    clock.current = calm ? STILL_AT : clock.current + dt;
    draw();
    return !calm;
  }, inView);

  React.useEffect(() => {
    if (asksForStillness()) clock.current = STILL_AT;
    draw();
  }, [draw]);

  return (
    <div ref={stage} className="iso-stage">
      <svg className="iso-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={props.label} focusable="false">
        {props.base}
        {props.depot}
        {props.customer}
        <g ref={outRef} transform={translateAlong(P, [DEPOT_X, 0, 0])}>
          {props.truckOut}
        </g>
        <g ref={backRef} style={{ display: "none" }}>
          {props.truckBack}
        </g>
      </svg>
    </div>
  );
}
