import { fitProjection, iso, type Plan, type Point3 } from "@/components/iso/iso-kit";

export const WIDTH = 640;
export const HEIGHT = 250;
export const AZIMUTH = 62;

export const BASE: Plan = { x: -176, y: -62, w: 352, d: 108, r: 6 };
export const BASE_H = 8;
export const FOOT_H = 4;

export const ROAD: Plan = { x: -170, y: -8, w: 340, d: 22, r: 0 };
export const ROAD_Y = 3;
export const ROAD_H = 0.6;

export const DEPOT: Plan = { x: -160, y: -52, w: 86, d: 32, r: 1.5 };
export const CUSTOMER: Plan = { x: 74, y: -52, w: 86, d: 32, r: 1.5 };
export const BUILDING_H = 26;

export const DEPOT_X = -117;
export const CUSTOMER_X = 117;

export const TRAY: Plan = { x: -27, y: -50, w: 54, d: 22, r: 3 };
export const TRAY_H = 2;
export const COIN_R = 6.6;
export const COIN_H = 1.25;
export const COIN_PITCH = 1.55;
export const REVENUE_AT: [number, number] = [-13, -39];
export const COST_AT: [number, number] = [13, -39];

export const RAIL: Plan = { x: 30, y: 28, w: 124, d: 4, r: 1.2 };
export const RAIL_H = 2.4;
export const RAIL_FROM = 36;
export const RAIL_TO = 148;
export const KNOB_W = 6;
export const KNOB_D = 9;
export const KNOB_H = 6;

export const coinZ = (index: number) => TRAY_H + index * COIN_PITCH;

const corners = ({ x, y, w, d }: Plan, z0: number, z1: number): Point3[] => {
  const out: Point3[] = [];
  for (const px of [x, x + w]) for (const py of [y, y + d]) for (const z of [z0, z1]) out.push([px, py, z]);
  return out;
};

export const P = fitProjection(
  [...corners(BASE, -BASE_H - FOOT_H, 0), [REVENUE_AT[0], REVENUE_AT[1] - COIN_R, coinZ(27)], ...corners(DEPOT, 0, BUILDING_H + 3), ...corners(CUSTOMER, 0, BUILDING_H + 3)],
  WIDTH,
  HEIGHT,
  { pad: 8, azimuth: AZIMUTH },
);

export const at = (point: Point3) => iso(point, P);
