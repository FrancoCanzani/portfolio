import {
  corners,
  cylinder,
  insetPlan,
  onTop,
  pathOf,
  planOutline,
  ring,
  segment,
  slabOf,
  type Plan,
  type Point3,
} from "@/components/iso/iso-kit";
import { buildTruck } from "../truck/geometry";
import { PALLETS } from "./model";
import { BASE, BASE_H, BUILDING_H, CUSTOMER, DEPOT, FOOT_H, P, ROAD, ROAD_H, ROAD_Y, at } from "./view";

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
};

const PLATE: Plan = { x: -140, y: 20, w: 52, d: 10, r: 1.5 };
export const PLATE_ART = {
  plate: slab(PLATE, 0, 0.8, 3),
  line: planOutline(insetPlan(PLATE, 1.6), 0.8, P),
  screws: [at([PLATE.x + 3.4, PLATE.y + PLATE.d / 2, 0.8]), at([PLATE.x + PLATE.w - 3.4, PLATE.y + PLATE.d / 2, 0.8])],
  rule: join([0, 1, 2].map((row) => onTop([[PLATE.x + 8, PLATE.y + 3.3 + row * 2.2], [PLATE.x + (row === 1 ? 30 : 42), PLATE.y + 3.3 + row * 2.2]], 0.8, P))),
};

function dashes() {
  const out: string[] = [];
  for (let x = ROAD.x + 8; x + 8 < ROAD.x + ROAD.w; x += 16) out.push(onTop([[x, ROAD_Y], [x + 8, ROAD_Y]], ROAD_H, P));
  return join(out);
}

function kmTicks() {
  const minor: string[] = [];
  const major: string[] = [];
  const edge = ROAD.y + ROAD.d;
  for (let index = 0; index <= 24; index++) {
    const x = -97 + (194 * index) / 24;
    const big = index % 4 === 0;
    (big ? major : minor).push(onTop([[x, edge + 0.8], [x, edge + (big ? 4.4 : 2.6)]], 0, P));
  }
  return { minor: join(minor), major: join(major) };
}

const KM = kmTicks();
export const ROAD_ART = {
  road: slab(ROAD, 0, ROAD_H, 2),
  edges: join([ROAD.y + 1.6, ROAD.y + ROAD.d - 1.6].map((y) => onTop([[ROAD.x, y], [ROAD.x + ROAD.w, y]], ROAD_H, P))),
  dashes: dashes(),
  aprons: [DEPOT, CUSTOMER].map((plan) => slab({ x: plan.x + 4, y: plan.y + plan.d, w: plan.w - 8, d: ROAD.y - plan.y - plan.d, r: 0 }, 0, 0.4, 2)),
  bays: join(
    [DEPOT, CUSTOMER].flatMap((plan) =>
      [0, 1, 2, 3, 4].map((step) => {
        const x = plan.x + 9 + step * 17;
        return onTop([[x, plan.y + plan.d + 1], [x, ROAD.y - 1]], 0.4, P);
      }),
    ),
  ),
  kmMinor: KM.minor,
  kmMajor: KM.major,
};

function building(plan: Plan, canopy: boolean) {
  const face = plan.y + plan.d;
  const side = plan.x + plan.w;
  const doors = [0, 1, 2, 3].map((step) => plan.x + 10 + step * 19);
  const doorLoops = doors.map((x) => loop([[x, face, 1], [x + 12, face, 1], [x + 12, face, 14], [x, face, 14]]));
  const slats = join(doors.flatMap((x) => [3.6, 6.2, 8.8, 11.4].map((z) => segment([x + 0.8, face, z], [x + 11.2, face, z], P))));
  const bumpers = doors.flatMap((x) => [slab({ x: x + 1, y: face, w: 2, d: 1.2, r: 0.3 }, 1.6, 2.4, 2), slab({ x: x + 9, y: face, w: 2, d: 1.2, r: 0.3 }, 1.6, 2.4, 2)]);
  const windows = join([0, 1, 2].map((row) => loop([[side, plan.y + 6 + row * 8, 17], [side, plan.y + 11 + row * 8, 17], [side, plan.y + 11 + row * 8, 21.5], [side, plan.y + 6 + row * 8, 21.5]])));
  const ribs = join([0, 1, 2, 3, 4, 5, 6, 7].map((step) => segment([plan.x + 5 + step * 11, face, 16.5], [plan.x + 5 + step * 11, face, BUILDING_H - 1.2], P)));
  return {
    body: slab(plan, 0, BUILDING_H, 3, 0.8),
    parapet: planOutline(insetPlan(plan, 1.6), BUILDING_H, P, 3),
    band: segment([plan.x, face, 15.6], [side, face, 15.6], P) + segment([side, face, 15.6], [side, plan.y, 15.6], P),
    doors: join(doorLoops),
    slats,
    bumpers,
    windows,
    ribs,
    vents: [plan.x + 20, plan.x + 44, plan.x + 68].map((x) => cylinder(x, plan.y + 14, 2.6, BUILDING_H, 2.4, P, 20)),
    ventRings: join([plan.x + 20, plan.x + 44, plan.x + 68].map((x) => ring(x, plan.y + 14, 1.5, BUILDING_H + 2.4, P, 16))),
    canopy: canopy ? slab({ x: plan.x + 6, y: face, w: plan.w - 12, d: 5, r: 0.6 }, 15.6, 1.2, 2) : null,
    canopyRods: canopy ? join([plan.x + 10, plan.x + plan.w - 10].map((x) => segment([x, face + 4.6, 15.6], [x, face, 22], P))) : "",
  };
}

export const DEPOT_ART = building(DEPOT, false);
export const CUSTOMER_ART = building(CUSTOMER, true);

export const TRUCK_OUT = buildTruck({ projection: P, laneY: ROAD_Y, heading: 1, cargo: { kind: "pallets", count: PALLETS } });
export const TRUCK_BACK = buildTruck({ projection: P, laneY: ROAD_Y, heading: -1, cargo: { kind: "pallets", count: PALLETS } });
