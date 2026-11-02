export const LEG_KM = 360;
export const TRIP_KM = LEG_KM * 2;
export const COST_PER_KM = { fuel: 0.43, driver: 0.34, vehicle: 0.38, other: 0.1 };
export const EUR_PER_KM = COST_PER_KM.fuel + COST_PER_KM.driver + COST_PER_KM.vehicle + COST_PER_KM.other;
export const OUTBOUND_PAY = 700;
export const BACKHAUL_FULL_PAY = 600;
export const PALLETS = 26;
export const COIN = 50;
export const REVENUE_COINS = Math.ceil((OUTBOUND_PAY + BACKHAUL_FULL_PAY) / COIN);
export const COST_COINS = Math.ceil((TRIP_KM * EUR_PER_KM) / COIN);

export const backhaulPay = (pallets: number) => (BACKHAUL_FULL_PAY * pallets) / PALLETS;

export function tripOf(pallets: number) {
  const revenue = OUTBOUND_PAY + backhaulPay(pallets);
  const cost = TRIP_KM * EUR_PER_KM;
  return { revenue, cost, margin: revenue - cost, share: (revenue - cost) / revenue };
}

export const LOOP = 12;
const T = { leave: 0.8, arrive: 4.4, unloaded: 5.4, loaded: 6.2, back: 9.8, done: 10.8 };
export const STILL_AT = 11.4;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const span = (t: number, from: number, to: number) => clamp01((t - from) / (to - from));

export interface Moment {
  heading: 1 | -1;
  along: number;
  km: number;
  load: number;
  revenue: number;
  cost: number;
  finished: boolean;
}

export function momentOf(time: number, pallets: number): Moment {
  const t = ((time % LOOP) + LOOP) % LOOP;
  const out = ease(span(t, T.leave, T.arrive));
  const back = ease(span(t, T.loaded, T.back));
  const km = out * LEG_KM + back * LEG_KM;
  const unloadOut = span(t, T.arrive, T.unloaded);
  const loadBack = span(t, T.unloaded, T.loaded);
  const unloadBack = span(t, T.back, T.done);
  const heading: 1 | -1 = t < T.unloaded ? 1 : -1;
  const load = heading === 1 ? PALLETS * (1 - unloadOut) : pallets * loadBack * (1 - unloadBack);
  return {
    heading,
    along: heading === 1 ? out : 1 - back,
    km,
    load,
    revenue: OUTBOUND_PAY * unloadOut + backhaulPay(pallets) * unloadBack,
    cost: km * EUR_PER_KM,
    finished: t >= T.done,
  };
}
