"use client";

import * as React from "react";
import { iso, translateAlong } from "@/components/iso/iso-kit";
import { useInView, useLoop } from "@/components/iso/react/live";
import { SPREADER_AT, cablesPath } from "./geometry";
import { markMotion } from "../truck/motion";
import { STILL_AT, momentOf, type Moment } from "./model";
import { BOX_H, BOX_L, BOX_W, HEIGHT, LANE_Y, P, PICK, PICK_Y, TRUCK_BOX_U, TRUCK_DECK, WIDTH } from "./view";

interface Props {
  label: string;
  base: React.ReactNode;
  ship: React.ReactNode;
  legsBack: React.ReactNode;
  legsFront: React.ReactNode;
  top: React.ReactNode;
  yard: React.ReactNode;
  truck: React.ReactNode;
  box: React.ReactNode;
  trolley: React.ReactNode;
  spreader: React.ReactNode;
}

function boxOffset(moment: Moment): [number, number, number] {
  switch (moment.holder) {
    case "ship":
      return [moment.shipX, 0, Math.sin(moment.time * 1.8) * 0.5];
    case "hook":
      return [0, moment.trolleyY - PICK_Y, moment.hookZ - BOX_H - PICK[2]];
    case "truck":
      return [moment.truckX + TRUCK_BOX_U - BOX_L / 2 - PICK[0], LANE_Y - BOX_W / 2 - PICK[1], TRUCK_DECK - PICK[2]];
    default: {
      const never: never = moment.holder;
      return never;
    }
  }
}

const STILL = momentOf(STILL_AT);

function gullAt(time: number) {
  const angle = time * 0.45;
  const [x, y] = iso([120 + 34 * Math.cos(angle), -52 + 16 * Math.sin(angle), 46 + 3 * Math.sin(time * 1.3)], P);
  return `translate(${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10})`;
}

const opacity = (value: number) => (value >= 1 ? "" : String(Math.round(value * 100) / 100));

export function PortLive(props: Props) {
  const stage = React.useRef<HTMLDivElement>(null);
  const ship = React.useRef<SVGGElement>(null);
  const truck = React.useRef<SVGGElement>(null);
  const boxBehind = React.useRef<SVGGElement>(null);
  const boxFront = React.useRef<SVGGElement>(null);
  const trolley = React.useRef<SVGGElement>(null);
  const spreader = React.useRef<SVGGElement>(null);
  const cables = React.useRef<SVGPathElement>(null);
  const inView = useInView(stage);
  const clock = React.useRef(STILL_AT);
  const lastX = React.useRef(STILL.truckX);
  const gull = React.useRef<SVGGElement>(null);

  const draw = React.useCallback(() => {
    const moment = momentOf(clock.current);
    const bob = Math.sin(clock.current * 1.8) * 0.5;
    ship.current?.setAttribute("transform", translateAlong(P, [moment.shipX, 0, bob]));
    if (ship.current) ship.current.style.opacity = opacity(moment.shipAlpha);
    truck.current?.setAttribute("transform", translateAlong(P, [moment.truckX, 0, 0]));
    if (truck.current) truck.current.style.opacity = opacity(moment.truckAlpha);
    markMotion(truck.current, moment.truckX, lastX);
    gull.current?.setAttribute("transform", gullAt(clock.current));
    const shown = moment.holder === "ship" ? boxBehind.current : boxFront.current;
    const hidden = moment.holder === "ship" ? boxFront.current : boxBehind.current;
    if (hidden) hidden.style.display = "none";
    if (shown) {
      shown.style.display = "";
      shown.style.opacity = opacity(moment.boxAlpha);
      shown.setAttribute("transform", translateAlong(P, boxOffset(moment)));
    }
    trolley.current?.setAttribute("transform", translateAlong(P, [0, moment.trolleyY - PICK_Y, 0]));
    spreader.current?.setAttribute("transform", translateAlong(P, [0, moment.trolleyY - PICK_Y, moment.hookZ - SPREADER_AT]));
    cables.current?.setAttribute("d", cablesPath(moment.trolleyY, moment.hookZ));
  }, []);

  useLoop((dt, calm) => {
    clock.current = calm ? STILL_AT : clock.current + dt;
    draw();
    return !calm;
  }, inView);

  React.useEffect(draw, [draw]);

  return (
    <div ref={stage} className="iso-stage">
      <svg className="iso-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={props.label} focusable="false">
        {props.base}
        <g ref={ship} transform={translateAlong(P, [STILL.shipX, 0, 0])}>
          {props.ship}
        </g>
        <g ref={boxBehind} style={{ display: "none" }}>
          {props.box}
        </g>
        {props.legsBack}
        <g ref={truck} transform={translateAlong(P, [STILL.truckX, 0, 0])}>
          {props.truck}
        </g>
        <g ref={boxFront} transform={translateAlong(P, boxOffset(STILL))}>
          {props.box}
        </g>
        <g ref={trolley} transform={translateAlong(P, [0, STILL.trolleyY - PICK_Y, 0])}>
          {props.trolley}
        </g>
        <path ref={cables} className="iso-line" data-tone="mid" d={cablesPath(STILL.trolleyY, STILL.hookZ)} />
        <g ref={spreader} transform={translateAlong(P, [0, STILL.trolleyY - PICK_Y, STILL.hookZ - SPREADER_AT])}>
          {props.spreader}
        </g>
        {props.legsFront}
        <g ref={gull} transform={gullAt(STILL_AT)}>
          <path className="gull gull-wings" d="M-4 0 Q-2 -2.4 0 0 Q2 -2.4 4 0" />
        </g>
        {props.yard}
        {props.top}
      </svg>
    </div>
  );
}
