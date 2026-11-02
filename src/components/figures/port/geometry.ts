import { corners, cylinder, depthOf, onTop, pathOf, ring, segment, slabOf, type Plan, type Point3 } from "@/components/iso/iso-kit";
import { buildTruck, truckMarks } from "../truck/geometry";
import {
  APEX_Z,
  BASE,
  BASE_H,
  BOOM,
  BOX_H,
  BOX_L,
  BOX_W,
  COLUMNS,
  CRANE_X,
  FOOT_H,
  HULL,
  HULL_H,
  LANE_Y,
  LEG_X,
  LEG_Y,
  P,
  PICK,
  PICK_Y,
  PORTAL_Z,
  QUAY_Y,
  ROWS,
  TIERS,
  TROLLEY_Z,
  WATER,
  at,
} from "./view";

const slab = (plan: Plan, z: number, h: number, steps = 3, bevel = 0) => slabOf(plan, z, h, P, steps, bevel);
const join = (paths: string[]) => paths.filter(Boolean).join("");
const box = (x: number, y: number, w: number, d: number, r = 0.4): Plan => ({ x, y, w, d, r });

export const BASE_ART = {
  halo: slabOf(BASE, -BASE_H - FOOT_H, BASE_H, P).fill,
  feet: corners(BASE, 24).map(([x, y]) => [cylinder(x, y, 7, -BASE_H - FOOT_H, 1.4, P, 28), cylinder(x, y, 5.4, -BASE_H - FOOT_H + 1.4, FOOT_H - 1.4, P, 28)]),
  slab: slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.4),
  screws: corners(BASE, 9).map(([x, y]) => at([x, y, 0])),
  screwRings: join(corners(BASE, 9).map(([x, y]) => ring(x, y, 2.2, 0, P, 16))),
};

const WAVES: Array<[number, number, number]> = [
  [-150, -38, 14], [-96, -36, 10], [-40, -34, 16], [20, -39, 12], [84, -35, 18], [140, -40, 12],
  [100, -70, 16], [140, -64, 10], [-170, -70, 8], [80, -48, 12], [130, -52, 14],
];

export const QUAY_ART = {
  water: slab(WATER, 0, 0.3, 3),
  waves: join(WAVES.map(([x, y, l]) => onTop([[x, y], [x + l, y]], 0.3, P))),
  edge: onTop([[BASE.x + 4, QUAY_Y], [BASE.x + BASE.w - 4, QUAY_Y]], 0.3, P),
  bollards: [-160, -120, -80, 90, 130, 165].map((x) => cylinder(x, QUAY_Y + 2.6, 1.3, 0, 2.4, P, 16)),
  lanes: join([LANE_Y - 9, LANE_Y + 9].map((y) => onTop([[BASE.x + 4, y], [BASE.x + BASE.w - 4, y]], 0, P))),
  dashes: join(Array.from({ length: 21 }, (_, index) => BASE.x + 10 + index * 17).map((x) => onTop([[x, LANE_Y], [x + 8, LANE_Y]], 0, P))),
};

function container([x, y, z]: Point3) {
  const face = y + BOX_W;
  const end = x + BOX_L;
  const ribs: string[] = [];
  for (let rx = x + 3; rx < end - 2; rx += 3.6) ribs.push(segment([rx, face, z + 0.9], [rx, face, z + BOX_H - 0.9], P));
  const doors = [y + 1.6, y + BOX_W / 2, y + BOX_W - 1.6].map((dy) => segment([end, dy, z + 0.6], [end, dy, z + BOX_H - 0.6], P));
  return { body: slab(box(x, y, BOX_L, BOX_W), z, BOX_H, 2), ribs: join(ribs), doors: join(doors), depth: depthOf([x + BOX_L / 2, y + BOX_W / 2, z + BOX_H / 2], P) };
}

export type ContainerArt = ReturnType<typeof container>;

const same = (a: Point3, b: Point3) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
const cargo: Point3[] = COLUMNS.flatMap((x) => ROWS.flatMap((y) => TIERS.map((z): Point3 => [x, y, z]))).filter((slot) => !same(slot, PICK));

export const SHIP_ART = {
  hull: slab(HULL, 0, HULL_H, 6, 0.8),
  deck: onTop(
    [
      [HULL.x + 6, HULL.y + 4],
      [HULL.x + HULL.w - 10, HULL.y + 4],
    ],
    HULL_H,
    P,
  ),
  waterline: segment([HULL.x + 12, HULL.y + HULL.d, 3], [HULL.x + HULL.w - 12, HULL.y + HULL.d, 3], P),
  bridge: slab(box(-160, -64, 22, 24, 1), HULL_H, 26, 2, 0.6),
  bridgeWindows: segment([-138, -60, HULL_H + 21], [-138, -44, HULL_H + 21], P) + segment([-160, -40, HULL_H + 21], [-138, -40, HULL_H + 21], P),
  funnel: slab(box(-157, -56, 8, 8, 1), HULL_H + 26, 7, 2),
  cargo: cargo.map(container).sort((a, b) => a.depth - b.depth),
};

export const PICKED = container(PICK);

const leg = (x: number, y: number) => ({
  bogie: slab(box(x - 4.5, y - 2.4, 9, 4.8, 0.6), 0, 2.6, 2),
  post: slab(box(x - 1.6, y - 1.6, 3.2, 3.2), 2.6, PORTAL_Z - 2.6, 2),
});

export const LEGS_BACK = LEG_X.map((x) => leg(x, LEG_Y[0]));
export const LEGS_FRONT = LEG_X.map((x) => leg(x, LEG_Y[1]));

const TOP = BOOM.z + 4;
export const CRANE_TOP = {
  portals: LEG_X.map((x) => slab(box(x - 1.8, LEG_Y[0] - 1.8, 3.6, LEG_Y[1] - LEG_Y[0] + 3.6), PORTAL_Z, 4, 2)),
  beam: slab(box(LEG_X[0] - 1.8, LEG_Y[0] - 1.8, LEG_X[1] - LEG_X[0] + 3.6, 3.6), PORTAL_Z, 4, 2),
  girders: LEG_X.map((x) => slab(box(x - 1.4, BOOM.from, 2.8, BOOM.to - BOOM.from), BOOM.z, 4, 2)),
  stays: join(
    LEG_X.flatMap((x) => {
      const apex: Point3 = [x, LEG_Y[1], APEX_Z];
      return [
        segment([x, LEG_Y[1], TOP], apex, P),
        segment([x, LEG_Y[0], TOP], apex, P),
        segment(apex, [x, BOOM.from + 2, TOP], P),
        segment(apex, [x, BOOM.to - 2, TOP], P),
      ];
    }),
  ),
};

export const TROLLEY = slab(box(CRANE_X - 31, PICK_Y - 5, 62, 10, 0.6), TROLLEY_Z, 3, 2);
export const SPREADER_AT = PICK[2] + BOX_H;
export const SPREADER = slab(box(CRANE_X - 28, PICK_Y - BOX_W / 2, BOX_L, BOX_W, 0.4), SPREADER_AT, 1.6, 2);
const CABLE_POINTS: Array<[number, number]> = [
  [CRANE_X - 22, -3],
  [CRANE_X - 22, 3],
  [CRANE_X + 22, -3],
  [CRANE_X + 22, 3],
];

export function cablesPath(trolleyY: number, hookZ: number) {
  return join(CABLE_POINTS.map(([x, dy]) => pathOf([at([x, trolleyY + dy, TROLLEY_Z]), at([x, trolleyY + dy, hookZ + 1.6])])));
}

export const YARD = [
  [-172, 16, 0],
  [-172, 26.6, 0],
  [-172, 26.6, BOX_H],
  [76, 16, 0],
  [76, 26.6, 0],
  [76, 16, BOX_H],
  [76, 26.6, BOX_H],
]
  .map((slot) => container(slot as Point3))
  .sort((a, b) => a.depth - b.depth);

export const TRUCK = buildTruck({ projection: P, laneY: LANE_Y, heading: 1, cargo: { kind: "chassis" } });
export const TRUCK_MARKS = truckMarks({ projection: P, laneY: LANE_Y, heading: 1 });
