import {
  convexHull,
  corners,
  cylinder,
  depthOf,
  insetPlan,
  onTop,
  pathOf,
  planOutline,
  ring,
  segment,
  slabOf,
  type Flat,
  type Plan,
  type Point3,
  type SolidPaths,
} from "@/components/iso/iso-kit";
import { COST_COINS, PALLETS, REVENUE_COINS } from "./model";
import {
  BASE,
  BASE_H,
  BUILDING_H,
  COIN_H,
  COIN_R,
  COST_AT,
  CUSTOMER,
  DEPOT,
  FOOT_H,
  KNOB_D,
  KNOB_H,
  KNOB_W,
  P,
  RAIL,
  RAIL_FROM,
  RAIL_H,
  RAIL_TO,
  REVENUE_AT,
  ROAD,
  ROAD_H,
  ROAD_Y,
  TRAY,
  TRAY_H,
  at,
  coinZ,
} from "./view";

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

const PLATE: Plan = { x: -164, y: 26, w: 52, d: 11, r: 1.5 };
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
    const x = -117 + (234 * index) / 24;
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

function coinStack([cx, cy]: [number, number], count: number) {
  return Array.from({ length: count }, (_, index) => ({
    body: cylinder(cx, cy, COIN_R, coinZ(index), COIN_H, P, 40),
    rim: ring(cx, cy, COIN_R - 1.4, coinZ(index) + COIN_H, P, 32),
  }));
}

export const TRAY_ART = {
  tray: slab(TRAY, 0, TRAY_H, 4, 0.6),
  lip: planOutline(insetPlan(TRAY, 2), TRAY_H, P, 4),
  seats: join([REVENUE_AT, COST_AT].map(([x, y]) => ring(x, y, COIN_R + 0.8, TRAY_H, P, 40))),
  screws: [at([TRAY.x + 3, TRAY.y + 3, TRAY_H]), at([TRAY.x + TRAY.w - 3, TRAY.y + 3, TRAY_H]), at([TRAY.x + 3, TRAY.y + TRAY.d - 3, TRAY_H]), at([TRAY.x + TRAY.w - 3, TRAY.y + TRAY.d - 3, TRAY_H])],
};

export const REVENUE_ART = coinStack(REVENUE_AT, REVENUE_COINS);
export const COST_ART = coinStack(COST_AT, COST_COINS);

function railTicks() {
  const minor: string[] = [];
  const major: string[] = [];
  const edge = RAIL.y + RAIL.d;
  for (let index = 0; index <= PALLETS; index++) {
    const x = RAIL_FROM + ((RAIL_TO - RAIL_FROM) * index) / PALLETS;
    const big = index % 13 === 0;
    (big ? major : minor).push(onTop([[x, edge + 1], [x, edge + (big ? 4.6 : 2.6)]], 0, P));
  }
  return { minor: join(minor), major: join(major) };
}

const RAIL_TICKS = railTicks();
export const RAIL_ART = {
  rail: slab(RAIL, 0, RAIL_H, 3, 0.5),
  slot: onTop([[RAIL_FROM, RAIL.y + RAIL.d / 2], [RAIL_TO, RAIL.y + RAIL.d / 2]], RAIL_H, P),
  ends: [RAIL.x - 3, RAIL.x + RAIL.w].map((x) => slab({ x, y: RAIL.y - 1.5, w: 3, d: RAIL.d + 3, r: 0.8 }, 0, RAIL_H + 1.6, 2, 0.4)),
  endScrews: [RAIL.x - 1.5, RAIL.x + RAIL.w + 1.5].map((x) => at([x, RAIL.y + RAIL.d / 2, RAIL_H + 1.6])),
  minor: RAIL_TICKS.minor,
  major: RAIL_TICKS.major,
};

const KNOB: Plan = { x: RAIL_FROM - KNOB_W / 2, y: RAIL.y + RAIL.d / 2 - KNOB_D / 2, w: KNOB_W, d: KNOB_D, r: 1.4 };
export const KNOB_ART = {
  body: slab(KNOB, RAIL_H - 1, KNOB_H, 3, 0.5),
  grip: join([-1.4, 0, 1.4].map((dx) => onTop([[RAIL_FROM + dx, KNOB.y + 2], [RAIL_FROM + dx, KNOB.y + KNOB.d - 2]], RAIL_H - 1 + KNOB_H, P))),
  pointer: onTop([[RAIL_FROM, KNOB.y + KNOB.d], [RAIL_FROM, KNOB.y + KNOB.d + 2.4]], 0, P),
};

export interface Part {
  key: number;
  kind: "solid" | "line" | "wheel" | "pallet";
  paths?: SolidPaths;
  d?: string;
  tone?: "hi" | "mid" | "lo" | "faint";
  pallet?: number;
  hub?: string;
  dots?: Flat[];
  strap?: string;
}

const RAD = Math.PI / 180;

function truck(heading: 1 | -1) {
  const w = (u: number, v: number, z: number): Point3 => [heading * u, ROAD_Y + heading * v, z];
  const plan = (u0: number, u1: number, v0: number, v1: number, r = 0.8): Plan => {
    const [ax, ay] = [heading * u0, ROAD_Y + heading * v0];
    const [bx, by] = [heading * u1, ROAD_Y + heading * v1];
    return { x: Math.min(ax, bx), y: Math.min(ay, by), w: Math.abs(bx - ax), d: Math.abs(by - ay), r };
  };
  const parts: Part[] = [];
  let layer = 0;
  const keyOf = (point: Point3) => layer * 10000 + depthOf(point, P);
  const box = (u0: number, u1: number, v0: number, v1: number, z: number, h: number, tone: Part["tone"] = "mid", r = 0.8, bevel = 0) => {
    parts.push({ key: keyOf(w((u0 + u1) / 2, (v0 + v1) / 2, z + h / 2)), kind: "solid", paths: slab(plan(u0, u1, v0, v1, r), z, h, 2, bevel), tone });
  };
  const line = (points: Point3[], tone: Part["tone"] = "lo", bias = 0.05, closed = false) => {
    const mid = points.reduce((sum, p) => [sum[0] + p[0] / points.length, sum[1] + p[1] / points.length, sum[2] + p[2] / points.length] as Point3, [0, 0, 0]);
    parts.push({ key: keyOf(mid) + bias, kind: "line", d: pathOf(points.map(at), closed), tone });
  };
  const wheel = (u: number, v0: number, v1: number, r: number) => {
    const z = r;
    const rim = (v: number) => Array.from({ length: 28 }, (_, step) => w(u + r * Math.cos((step / 28) * Math.PI * 2), v, z + r * Math.sin((step / 28) * Math.PI * 2)));
    const near = depthOf(w(u, v0, z), P) > depthOf(w(u, v1, z), P) ? v0 : v1;
    const flat = [...rim(v0), ...rim(v1)].map(at);
    const hull = pathOf(convexHull(flat), true);
    const face = pathOf(rim(near).map(at), true);
    const hubRing = Array.from({ length: 20 }, (_, step) => w(u + r * 0.52 * Math.cos(step * 18 * RAD), near, z + r * 0.52 * Math.sin(step * 18 * RAD)));
    const nuts = [0, 1, 2, 3, 4].map((step) => at(w(u + r * 0.3 * Math.cos(step * 72 * RAD), near, z + r * 0.3 * Math.sin(step * 72 * RAD))));
    parts.push({
      key: keyOf(w(u, (v0 + v1) / 2, z)),
      kind: "wheel",
      paths: { fill: hull, outline: hull, crease: "", top: face, shades: ["", "", hull, ""] },
      hub: pathOf(hubRing.map(at), true),
      dots: nuts,
    });
  };
  const near = 5 * heading;
  const sideV = heading;

  const farV = -heading;
  layer = 0;
  for (const u of [37, 25]) wheel(u, farV * 3.2, farV * 5, 3.4);
  for (const u of [-34, -27, -20]) wheel(u, farV * 3.2, farV * 5, 3.1);
  layer = 1;
  box(14, 44, -3.2, 3.2, 3, 2.2, "lo", 0.4);
  box(-15, -6, -2.4, 2.4, 2, 3.6, "lo", 0.4);
  box(19, 28, -4.2, 4.2, 5.2, 1, "mid", 2, 0.3);
  box(-44, 20, -5, 5, 5.6, 2, "mid", 0.6, 0.6);
  box(-44, -42, -5.4, 5.4, 2.4, 1.2, "lo", 0.4);
  layer = 2;
  for (const u of [37, 25]) wheel(u, sideV * 3.2, sideV * 5, 3.4);
  for (const u of [-34, -27, -20]) wheel(u, sideV * 3.2, sideV * 5, 3.1);
  box(-37.5, -16.5, sideV * 3, sideV * 5.4, 6.6, 0.9, "lo", 0.4);
  box(28.8, 33.2, sideV * 3.4, sideV * 5.6, 4.2, 3.4, "mid", 1.6, 0.4);
  layer = 3;
  box(32, 44, -5, 5, 5.2, 13.6, "hi", 1.6, 0.8);
  box(33, 40.5, -4.4, 4.4, 18.8, 3, "mid", 2, 0.5);
  box(43.6, 45, -5, 5, 2.6, 3.4, "mid", 0.6);
  parts.push({ key: keyOf(w(30.5, -3.6, 13)) - 0.2, kind: "solid", paths: cylinder(heading * 30.5, ROAD_Y + heading * -3.6, 0.8, 5.2, 18.6, P, 14), tone: "mid" });
  box(17.4, 19.8, -5, 5, 7.6, 10, "mid", 0.5, 0.4);

  layer = 4;
  box(41.6, 42.8, sideV * 5, sideV * 6.4, 13, 4.2, "mid", 0.4);
  if (heading === 1) {
    line([w(44, -4, 12), w(44, 4, 12), w(44, 4, 17.4), w(44, -4, 17.4)], "mid", 0.1, true);
    line([w(44, -4.6, 7), w(44, -2.4, 7)], "mid", 0.1);
    line([w(44, 2.4, 7), w(44, 4.6, 7)], "mid", 0.1);
  } else {
    line([w(32, -3, 9), w(32, 3, 9), w(32, 3, 16), w(32, -3, 16)], "lo", 0.1, true);
    line([w(-44, -4.6, 4.8), w(-44, -2.6, 4.8)], "mid", 0.1);
    line([w(-44, 2.6, 4.8), w(-44, 4.6, 4.8)], "mid", 0.1);
  }
  line([w(34, near, 12.4), w(39.5, near, 12.4), w(39.5, near, 17.4), w(34, near, 17.4)], "mid", 0.1, true);
  line([w(40.4, near, 6), w(40.4, near, 17.4)], "lo", 0.1);
  line([w(-44, near, 7.2), w(17.4, near, 7.2)], "faint", 0.1);

  layer = 3;
  const rows = PALLETS / 2;
  const pitch = 60 / rows;
  for (let index = 0; index < PALLETS; index++) {
    const row = Math.floor(index / 2);
    const v = index % 2 === 0 ? 1 : -1;
    const u1 = 16.6 - row * pitch;
    const u0 = u1 - pitch + 0.5;
    const z = 7.6;
    const base = slab(plan(u0, u1, v * 0.25, v * 4.75, 0.2), z, 1, 2);
    const load = slab(plan(u0 + 0.2, u1 - 0.2, v * 0.45, v * 4.55, 0.4), z + 1, 6.2, 2, 0.3);
    const facing = heading * v > 0;
    const strap = facing ? pathOf([w((u0 + u1) / 2, v * 4.55, z + 1.2), w((u0 + u1) / 2, v * 4.55, z + 7.2)].map(at)) : undefined;
    parts.push({ key: keyOf(w((u0 + u1) / 2, v * 2.5, z + 3.5)), kind: "pallet", pallet: index, paths: base, tone: "lo" });
    parts.push({ key: keyOf(w((u0 + u1) / 2, v * 2.5, z + 3.6)) + 0.01, kind: "pallet", pallet: index, paths: load, strap, tone: "mid" });
  }
  return parts.sort((a, b) => a.key - b.key);
}

export const TRUCK_OUT = truck(1);
export const TRUCK_BACK = truck(-1);
