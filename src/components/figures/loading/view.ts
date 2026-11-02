import { fitProjection, iso, type Plan, type Point3 } from "@/components/iso/iso-kit";

export const WIDTH = 560;
export const HEIGHT = 300;
const AZIMUTH = 58;

export const BASE: Plan = { x: -116, y: -54, w: 216, d: 84, r: 6 };
export const BASE_H = 8;
export const FOOT_H = 4;

export const LANE_Y = -12;
export const WAREHOUSE: Plan = { x: -110, y: -48, w: 62, d: 52, r: 1.5 };
export const WAREHOUSE_H = 32;
export const FACE_X = WAREHOUSE.x + WAREHOUSE.w;

export const DECK_Z = 7.6;
export const DOCK: Plan = { x: FACE_X, y: LANE_Y - 7, w: 8, d: 14, r: 0.4 };

export const TRUCK_STOP = DOCK.x + DOCK.w + 1 + 44;
export const TRUCK_AWAY = TRUCK_STOP + 56;

export const BOX = { l: 9, w: 8, h: 7 };
export const SLOTS = [0, 1, 2, 3, 4, 5].map((index) => 12.3 - index * 10.2);
export const DOOR_X = FACE_X + BOX.l / 2;

const corners = ({ x, y, w, d }: Plan, z0: number, z1: number): Point3[] => {
  const out: Point3[] = [];
  for (const px of [x, x + w]) for (const py of [y, y + d]) for (const z of [z0, z1]) out.push([px, py, z]);
  return out;
};

export const P = fitProjection([...corners(BASE, -BASE_H - FOOT_H, 0), ...corners(WAREHOUSE, 0, WAREHOUSE_H + 3)], WIDTH, HEIGHT, { pad: 6, azimuth: AZIMUTH });

export const at = (point: Point3) => iso(point, P);
