import { fitProjection, iso, type Plan, type Point3 } from "@/components/iso/iso-kit";

export const WIDTH = 560;
export const HEIGHT = 300;
const AZIMUTH = 58;

export const BASE: Plan = { x: -150, y: -62, w: 300, d: 96, r: 6 };
export const BASE_H = 8;
export const FOOT_H = 4;

export const ROAD: Plan = { x: -144, y: -8, w: 288, d: 22, r: 0 };
export const ROAD_Y = 3;
export const ROAD_H = 0.6;

export const DEPOT: Plan = { x: -140, y: -52, w: 86, d: 32, r: 1.5 };
export const CUSTOMER: Plan = { x: 54, y: -52, w: 86, d: 32, r: 1.5 };
export const BUILDING_H = 26;

export const DEPOT_X = -97;
export const CUSTOMER_X = 97;

const corners = ({ x, y, w, d }: Plan, z0: number, z1: number): Point3[] => {
  const out: Point3[] = [];
  for (const px of [x, x + w]) for (const py of [y, y + d]) for (const z of [z0, z1]) out.push([px, py, z]);
  return out;
};

export const P = fitProjection([...corners(BASE, -BASE_H - FOOT_H, 0), ...corners(DEPOT, 0, BUILDING_H + 3), ...corners(CUSTOMER, 0, BUILDING_H + 3)], WIDTH, HEIGHT, {
  pad: 6,
  azimuth: AZIMUTH,
});

export const at = (point: Point3) => iso(point, P);
