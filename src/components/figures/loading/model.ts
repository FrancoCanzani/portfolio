import { DOOR_X, SLOTS, TRUCK_AWAY, TRUCK_STOP } from "./view";

export const LOOP = 12;
export const STILL_AT = 5.4;

const FIRST_BOX = 1.8;
const BOX_EVERY = 1;
const SLIDE = 0.8;
const LEAVE = 8.4;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const span = (t: number, from: number, to: number) => clamp01((t - from) / (to - from));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export interface BoxState {
  x: number;
  alpha: number;
}

export interface Moment {
  truckX: number;
  truckAlpha: number;
  boxes: BoxState[];
}

export function momentOf(time: number): Moment {
  const t = ((time % LOOP) + LOOP) % LOOP;
  const leaving = t >= LEAVE;
  const truckX = leaving ? mix(TRUCK_STOP, TRUCK_AWAY, ease(span(t, LEAVE, LEAVE + 2))) : mix(TRUCK_AWAY, TRUCK_STOP, ease(span(t, 0, 1.6)));
  const truckAlpha = leaving ? 1 - span(t, LEAVE + 1.4, LEAVE + 2) : span(t, 0, 0.5);
  const boxes = SLOTS.map((slot, index) => {
    const start = FIRST_BOX + index * BOX_EVERY;
    if (t < start) return { x: DOOR_X, alpha: 0 };
    const target = truckX + slot;
    if (leaving) return { x: target, alpha: truckAlpha };
    return { x: mix(DOOR_X, target, ease(span(t, start, start + SLIDE))), alpha: span(t, start, start + 0.15) };
  });
  return { truckX, truckAlpha, boxes };
}
