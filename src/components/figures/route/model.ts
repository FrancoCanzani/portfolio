export const PALLETS = 26;
export const LOOP = 11;
const T = { leave: 0.8, arrive: 4.2, unloaded: 5.0, loaded: 5.8, back: 9.2, done: 10.0 };
export const STILL_AT = 1.5;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const span = (t: number, from: number, to: number) => clamp01((t - from) / (to - from));

export interface Moment {
  heading: 1 | -1;
  along: number;
  load: number;
}

export function momentOf(time: number): Moment {
  const t = ((time % LOOP) + LOOP) % LOOP;
  const heading: 1 | -1 = t < T.unloaded ? 1 : -1;
  if (heading === 1) {
    return { heading, along: ease(span(t, T.leave, T.arrive)), load: PALLETS * (1 - span(t, T.arrive, T.unloaded)) };
  }
  return { heading, along: 1 - ease(span(t, T.loaded, T.back)), load: PALLETS * span(t, T.unloaded, T.loaded) * (1 - span(t, T.back, T.done)) };
}
