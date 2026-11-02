"use client";

import * as React from "react";
import { translateAlong } from "@/components/iso/iso-kit";
import { useInView, useLoop } from "@/components/iso/react/live";
import { markMotion } from "../truck/motion";
import { STILL_AT, momentOf } from "./model";
import { HEIGHT, P, SLOTS, WIDTH } from "./view";

interface Props {
  label: string;
  base: React.ReactNode;
  warehouse: React.ReactNode;
  truck: React.ReactNode;
  box: React.ReactNode;
}

const STILL = momentOf(STILL_AT);
const opacity = (value: number) => (value >= 1 ? "" : String(Math.round(value * 100) / 100));
const BACK_TO_FRONT = SLOTS.map((_, index) => SLOTS.length - 1 - index);

export function LoadingLive(props: Props) {
  const stage = React.useRef<HTMLDivElement>(null);
  const truck = React.useRef<SVGGElement>(null);
  const boxes = React.useRef<Array<SVGGElement | null>>([]);
  const inView = useInView(stage);
  const clock = React.useRef(STILL_AT);
  const lastX = React.useRef(STILL.truckX);

  const draw = React.useCallback(() => {
    const moment = momentOf(clock.current);
    truck.current?.setAttribute("transform", translateAlong(P, [moment.truckX, 0, 0]));
    if (truck.current) truck.current.style.opacity = opacity(moment.truckAlpha);
    markMotion(truck.current, moment.truckX, lastX);
    moment.boxes.forEach((state, index) => {
      const node = boxes.current[index];
      if (!node) return;
      node.style.display = state.alpha > 0 ? "" : "none";
      node.style.opacity = opacity(state.alpha);
      node.setAttribute("transform", translateAlong(P, [state.x, 0, 0]));
    });
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
        {props.warehouse}
        <g ref={truck} transform={translateAlong(P, [STILL.truckX, 0, 0])}>
          {props.truck}
        </g>
        {BACK_TO_FRONT.map((index) => {
          const state = STILL.boxes[index];
          return (
            <g
              key={index}
              ref={(node) => {
                boxes.current[index] = node;
              }}
              transform={translateAlong(P, [state.x, 0, 0])}
              style={{ display: state.alpha > 0 ? undefined : "none", opacity: state.alpha < 1 ? state.alpha : undefined }}
            >
              {props.box}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
