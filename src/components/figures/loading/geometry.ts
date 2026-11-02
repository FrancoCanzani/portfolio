import { corners, cylinder, onTop, pathOf, planOutline, insetPlan, ring, segment, slabOf, type Plan, type Point3 } from "@/components/iso/iso-kit";
import { vergeOf } from "../scenery";
import { buildTruck, truckMarks } from "../truck/geometry";
import { BASE, BASE_H, BOX, DECK_Z, DOCK, FACE_X, FOOT_H, LANE_Y, P, WAREHOUSE, WAREHOUSE_H, at } from "./view";

const slab = (plan: Plan, z: number, h: number, steps = 3, bevel = 0) => slabOf(plan, z, h, P, steps, bevel);
const join = (paths: string[]) => paths.filter(Boolean).join("");
const loop = (points: Point3[]) => pathOf(points.map(at), true);

export const BASE_ART = {
  halo: slabOf(BASE, -BASE_H - FOOT_H, BASE_H, P).fill,
  feet: corners(BASE, 24).map(([x, y]) => [cylinder(x, y, 7, -BASE_H - FOOT_H, 1.4, P, 28), cylinder(x, y, 5.4, -BASE_H - FOOT_H + 1.4, FOOT_H - 1.4, P, 28)]),
  slab: slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.4),
  groove: planOutline(insetPlan(BASE, 4.5), 0, P),
  screws: corners(BASE, 9).map(([x, y]) => at([x, y, 0])),
  screwRings: join(corners(BASE, 9).map(([x, y]) => ring(x, y, 2.2, 0, P, 16))),
  bays: join([LANE_Y - 9, LANE_Y + 9].map((y) => onTop([[FACE_X + 10, y], [BASE.x + BASE.w - 10, y]], 0, P))),
};

const { x, y, w, d } = WAREHOUSE;
const side = x + w;
const front = y + d;
const doorY = [DOCK.y + 1.5, DOCK.y + DOCK.d - 1.5];

export const WAREHOUSE_ART = {
  body: slab(WAREHOUSE, 0, WAREHOUSE_H, 3, 0.8),
  parapet: planOutline(insetPlan(WAREHOUSE, 1.6), WAREHOUSE_H, P, 3),
  door: loop([
    [side, doorY[0], DECK_Z],
    [side, doorY[1], DECK_Z],
    [side, doorY[1], DECK_Z + 12],
    [side, doorY[0], DECK_Z + 12],
  ]),
  frame: loop([
    [side, doorY[0] - 1.2, DECK_Z],
    [side, doorY[1] + 1.2, DECK_Z],
    [side, doorY[1] + 1.2, DECK_Z + 13.2],
    [side, doorY[0] - 1.2, DECK_Z + 13.2],
  ]),
  windows: join(
    [y + 6, y + 14, front - 10].map((wy) =>
      loop([
        [side, wy, 24],
        [side, wy + 4.5, 24],
        [side, wy + 4.5, 28],
        [side, wy, 28],
      ]),
    ),
  ),
  ribs: join([0, 1, 2, 3, 4, 5].map((step) => segment([x + 6 + step * 10, front, 1], [x + 6 + step * 10, front, WAREHOUSE_H - 1.2], P))),
  band: segment([x, front, 21], [side, front, 21], P) + segment([side, front, 21], [side, y, 21], P),
  vents: [x + 16, x + 40].map((vx) => cylinder(vx, y + 16, 2.8, WAREHOUSE_H, 2.4, P, 20)),
  ventRings: join([x + 16, x + 40].map((vx) => ring(vx, y + 16, 1.6, WAREHOUSE_H + 2.4, P, 16))),
};

export const DOCK_ART = {
  dock: slab(DOCK, 0, DECK_Z, 2, 0.4),
  plate: onTop(
    [
      [DOCK.x + 1, DOCK.y + 2],
      [DOCK.x + 1, DOCK.y + DOCK.d - 2],
    ],
    DECK_Z,
    P,
  ),
  bumpers: [DOCK.y + 1, DOCK.y + DOCK.d - 3].map((by) => slab({ x: DOCK.x + DOCK.w, y: by, w: 1.2, d: 2, r: 0.3 }, 3, 3, 2)),
};

export const BOX_ART = {
  body: slab({ x: -BOX.l / 2, y: LANE_Y - BOX.w / 2, w: BOX.l, d: BOX.w, r: 0.3 }, DECK_Z, BOX.h, 2, 0.3),
  tape: onTop(
    [
      [-BOX.l / 2, LANE_Y],
      [BOX.l / 2, LANE_Y],
    ],
    DECK_Z + BOX.h,
    P,
  ) + segment([BOX.l / 2, LANE_Y, DECK_Z + BOX.h], [BOX.l / 2, LANE_Y, DECK_Z + BOX.h - 2.4], P),
};

export const TRUCK = buildTruck({ projection: P, laneY: LANE_Y, heading: 1, cargo: { kind: "flatbed" } });
export const TRUCK_MARKS = truckMarks({ projection: P, laneY: LANE_Y, heading: 1 });
export const VERGE = vergeOf(P, { x: BASE.x + 6, y: 10, w: BASE.w - 12, d: 14, r: 2 }, [[-98, 17, 3.4], [-84, 19, 2.4], [-20, 17, 2.8], [40, 18, 3.2], [54, 16.5, 2.2], [86, 17.5, 3]]);
