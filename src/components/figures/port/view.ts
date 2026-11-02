import { fitProjection, iso, type Plan, type Point3 } from "@/components/iso/iso-kit";

export const WIDTH = 560;
export const HEIGHT = 340;
export const AZIMUTH = 58;

export const BASE: Plan = { x: -180, y: -78, w: 360, d: 116, r: 6 };
export const BASE_H = 8;
export const FOOT_H = 4;

export const WATER: Plan = { x: -174, y: -72, w: 348, d: 40, r: 2 };
export const QUAY_Y = WATER.y + WATER.d;
export const LANE_Y = -12;

export const HULL: Plan = { x: -164, y: -68, w: 232, d: 32, r: 12 };
export const HULL_H = 9;

export const BOX_L = 56;
export const BOX_W = 9.6;
export const BOX_H = 9.6;
export const COLUMNS = [-124, -64, -4];
export const ROWS = [-62.6, -52];
export const TIERS = [HULL_H, HULL_H + BOX_H];

export const PICK: Point3 = [COLUMNS[2], ROWS[1], TIERS[1]];
export const CRANE_X = PICK[0] + BOX_L / 2;
export const PICK_Y = PICK[1] + BOX_W / 2;

export const TRUCK_DECK = 6.8;
export const TRUCK_BOX_U = -14;
export const TRUCK_STOP = CRANE_X - TRUCK_BOX_U;
export const TRUCK_FROM = -130;
export const TRUCK_TO = 130;

export const LEG_X = [CRANE_X - 34, CRANE_X + 34];
export const LEG_Y = [QUAY_Y + 4, 6];
export const PORTAL_Z = 48;
export const BOOM: { from: number; to: number; z: number } = { from: -76, to: 24, z: 52 };
export const TROLLEY_Z = BOOM.z - 3;
export const APEX_Z = 74;

const corners = ({ x, y, w, d }: Plan, z0: number, z1: number): Point3[] => {
  const out: Point3[] = [];
  for (const px of [x, x + w]) for (const py of [y, y + d]) for (const z of [z0, z1]) out.push([px, py, z]);
  return out;
};

export const P = fitProjection(
  [...corners(BASE, -BASE_H - FOOT_H, 0), ...LEG_X.flatMap((x): Point3[] => [[x, BOOM.from, BOOM.z + 4], [x, BOOM.to, BOOM.z + 4], [x, LEG_Y[1], APEX_Z]])],
  WIDTH,
  HEIGHT,
  { pad: 6, azimuth: AZIMUTH },
);

export const at = (point: Point3) => iso(point, P);
