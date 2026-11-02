import { BOX_H, LANE_Y, PICK, PICK_Y, TRUCK_DECK, TRUCK_FROM, TRUCK_STOP, TRUCK_TO } from "./view";

const LOOP = 14;
export const STILL_AT = 5.2;

const REST = 38;
const LIFT = 42;
const SHIP_TOP = PICK[2] + BOX_H;
const TRUCK_TOP = TRUCK_DECK + BOX_H;
const SHIP_FROM = -90;
const SHIP_TO = 110;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const span = (t: number, from: number, to: number) => clamp01((t - from) / (to - from));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export type Holder = "ship" | "hook" | "truck";

export interface Moment {
  time: number;
  shipX: number;
  shipAlpha: number;
  truckX: number;
  truckAlpha: number;
  trolleyY: number;
  hookZ: number;
  holder: Holder;
  boxAlpha: number;
}

function hookAt(t: number) {
  if (t < 2.6) return REST;
  if (t < 3.4) return mix(REST, SHIP_TOP, ease(span(t, 2.6, 3.4)));
  if (t < 4.4) return mix(SHIP_TOP, LIFT, ease(span(t, 3.4, 4.4)));
  if (t < 6) return LIFT;
  if (t < 7) return mix(LIFT, TRUCK_TOP, ease(span(t, 6, 7)));
  if (t < 7.6) return mix(TRUCK_TOP, REST, ease(span(t, 7, 7.6)));
  return REST;
}

function trolleyAt(t: number) {
  if (t < 4.4) return PICK_Y;
  if (t < 6) return mix(PICK_Y, LANE_Y, ease(span(t, 4.4, 6)));
  if (t < 7.6) return LANE_Y;
  return mix(LANE_Y, PICK_Y, ease(span(t, 7.6, 9.4)));
}

export function momentOf(time: number): Moment {
  const t = ((time % LOOP) + LOOP) % LOOP;
  const docking = t < 8.6;
  const shipX = docking ? mix(SHIP_FROM, 0, ease(span(t, 0, 2.4))) : mix(0, SHIP_TO, ease(span(t, 8.6, 12)));
  const shipAlpha = docking ? span(t, 0, 0.8) : 1 - span(t, 11, 12);
  const arriving = t < 7.6;
  const truckX = arriving ? mix(TRUCK_FROM, TRUCK_STOP, ease(span(t, 0, 2.6))) : mix(TRUCK_STOP, TRUCK_TO, ease(span(t, 7.6, 10)));
  const truckAlpha = arriving ? span(t, 0, 0.6) : 1 - span(t, 9.4, 10);
  const holder: Holder = t < 3.4 ? "ship" : t < 7 ? "hook" : "truck";
  const boxAlpha = holder === "ship" ? shipAlpha : holder === "truck" ? truckAlpha : 1;
  return { time, shipX, shipAlpha, truckX, truckAlpha, trolleyY: trolleyAt(t), hookZ: hookAt(t), holder, boxAlpha };
}
