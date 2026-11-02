import { convexHull, cylinder, depthOf, iso, pathOf, slabOf, type Flat, type Plan, type Point3, type Projection, type SolidPaths } from "@/components/iso/iso-kit";

export interface Part {
  key: number;
  kind: "solid" | "line" | "wheel" | "pallet";
  paths?: SolidPaths;
  d?: string;
  tone?: "hi" | "mid" | "lo" | "faint";
  accent?: boolean;
  pallet?: number;
  hub?: string;
  dots?: Flat[];
  strap?: string;
}

type Cargo = { kind: "pallets"; count: number } | { kind: "flatbed" } | { kind: "chassis" };

interface TruckOptions {
  projection: Projection;
  laneY: number;
  heading: 1 | -1;
  cargo: Cargo;
}

const RAD = Math.PI / 180;

/** Articulated truck centred on x = 0, facing +x when heading is 1. The tractor is drawn in the accent colour. */
export function buildTruck({ projection: P, laneY, heading, cargo }: TruckOptions): Part[] {
  const at = (point: Point3) => iso(point, P);
  const w = (u: number, v: number, z: number): Point3 => [heading * u, laneY + heading * v, z];
  const plan = (u0: number, u1: number, v0: number, v1: number, r = 0.8): Plan => {
    const [ax, ay] = [heading * u0, laneY + heading * v0];
    const [bx, by] = [heading * u1, laneY + heading * v1];
    return { x: Math.min(ax, bx), y: Math.min(ay, by), w: Math.abs(bx - ax), d: Math.abs(by - ay), r };
  };
  const parts: Part[] = [];
  let layer = 0;
  const keyOf = (point: Point3) => layer * 10000 + depthOf(point, P);
  const box = (u0: number, u1: number, v0: number, v1: number, z: number, h: number, tone: Part["tone"] = "mid", r = 0.8, bevel = 0, accent = false) => {
    parts.push({ key: keyOf(w((u0 + u1) / 2, (v0 + v1) / 2, z + h / 2)), kind: "solid", paths: slabOf(plan(u0, u1, v0, v1, r), z, h, P, 2, bevel), tone, accent });
  };
  const line = (points: Point3[], tone: Part["tone"] = "lo", bias = 0.05, closed = false) => {
    const mid = points.reduce((sum, p) => [sum[0] + p[0] / points.length, sum[1] + p[1] / points.length, sum[2] + p[2] / points.length] as Point3, [0, 0, 0]);
    parts.push({ key: keyOf(mid) + bias, kind: "line", d: pathOf(points.map(at), closed), tone });
  };
  const wheel = (u: number, v0: number, v1: number, r: number) => {
    const z = r;
    const rim = (v: number) => Array.from({ length: 28 }, (_, step) => w(u + r * Math.cos((step / 28) * Math.PI * 2), v, z + r * Math.sin((step / 28) * Math.PI * 2)));
    const near = depthOf(w(u, v0, z), P) > depthOf(w(u, v1, z), P) ? v0 : v1;
    const hull = pathOf(convexHull([...rim(v0), ...rim(v1)].map(at)), true);
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
  const pallets = cargo.kind !== "chassis";

  layer = 0;
  for (const u of [37, 25]) wheel(u, farV * 3.2, farV * 5, 3.4);
  for (const u of [-34, -27, -20]) wheel(u, farV * 3.2, farV * 5, 3.1);
  layer = 1;
  box(14, 44, -3.2, 3.2, 3, 2.2, "lo", 0.4);
  box(-15, -6, -2.4, 2.4, 2, 3.6, "lo", 0.4);
  box(19, 28, -4.2, 4.2, 5.2, 1, "mid", 2, 0.3);
  if (pallets) box(-44, 20, -5, 5, 5.6, 2, "mid", 0.6, 0.6);
  else {
    box(-44, 16, -1.6, 1.6, 5, 1.8, "mid", 0.4);
    for (const u of [-42, -28, -14, 0, 14]) box(u - 1, u + 1, -5, 5, 5.4, 1.4, "mid", 0.3);
  }
  box(-44, -42, -5.4, 5.4, 2.4, 1.2, "lo", 0.4);
  layer = 2;
  for (const u of [37, 25]) wheel(u, sideV * 3.2, sideV * 5, 3.4);
  for (const u of [-34, -27, -20]) wheel(u, sideV * 3.2, sideV * 5, 3.1);
  box(-37.5, -16.5, sideV * 3, sideV * 5.4, 6.6, 0.9, "lo", 0.4);
  box(28.8, 33.2, sideV * 3.4, sideV * 5.6, 4.2, 3.4, "mid", 1.6, 0.4);
  layer = 3;
  box(32, 44, -5, 5, 5.2, 13.6, "hi", 1.6, 0.8, true);
  box(33, 40.5, -4.4, 4.4, 18.8, 3, "hi", 2, 0.5, true);
  box(43.6, 45, -5, 5, 2.6, 3.4, "mid", 0.6);
  parts.push({ key: keyOf(w(30.5, -3.6, 13)) - 0.2, kind: "solid", paths: cylinder(heading * 30.5, laneY + heading * -3.6, 0.8, 5.2, 18.6, P, 14), tone: "mid" });
  if (pallets) box(17.4, 19.8, -5, 5, 7.6, 10, "mid", 0.5, 0.4);

  layer = 4;
  box(41.6, 42.8, sideV * 5, sideV * 6.4, 13, 4.2, "mid", 0.4);
  if (heading === 1) {
    line([w(44, -4, 12), w(44, 4, 12), w(44, 4, 17.4), w(44, -4, 17.4)], "hi", 0.1, true);
    line([w(44, -4.6, 7), w(44, -2.4, 7)], "hi", 0.1);
    line([w(44, 2.4, 7), w(44, 4.6, 7)], "hi", 0.1);
  } else {
    line([w(32, -3, 9), w(32, 3, 9), w(32, 3, 16), w(32, -3, 16)], "hi", 0.1, true);
    line([w(-44, -4.6, 4.8), w(-44, -2.6, 4.8)], "mid", 0.1);
    line([w(-44, 2.6, 4.8), w(-44, 4.6, 4.8)], "mid", 0.1);
  }
  line([w(34, near, 12.4), w(39.5, near, 12.4), w(39.5, near, 17.4), w(34, near, 17.4)], "hi", 0.1, true);
  line([w(40.4, near, 6), w(40.4, near, 17.4)], "hi", 0.1);
  if (pallets) line([w(-44, near, 7.2), w(17.4, near, 7.2)], "faint", 0.1);

  if (cargo.kind === "pallets") {
    layer = 3;
    const rows = cargo.count / 2;
    const pitch = 60 / rows;
    for (let index = 0; index < cargo.count; index++) {
      const row = Math.floor(index / 2);
      const v = index % 2 === 0 ? 1 : -1;
      const u1 = 16.6 - row * pitch;
      const u0 = u1 - pitch + 0.5;
      const z = 7.6;
      const base = slabOf(plan(u0, u1, v * 0.25, v * 4.75, 0.2), z, 1, P, 2);
      const load = slabOf(plan(u0 + 0.2, u1 - 0.2, v * 0.45, v * 4.55, 0.4), z + 1, 6.2, P, 2, 0.3);
      const facing = heading * v > 0;
      const strap = facing ? pathOf([w((u0 + u1) / 2, v * 4.55, z + 1.2), w((u0 + u1) / 2, v * 4.55, z + 7.2)].map(at)) : undefined;
      parts.push({ key: keyOf(w((u0 + u1) / 2, v * 2.5, z + 3.5)), kind: "pallet", pallet: index, paths: base, tone: "lo" });
      parts.push({ key: keyOf(w((u0 + u1) / 2, v * 2.5, z + 3.6)) + 0.01, kind: "pallet", pallet: index, paths: load, strap, tone: "mid" });
    }
  }
  return parts.sort((a, b) => a.key - b.key);
}

export function truckMarks({ projection, laneY, heading }: Omit<TruckOptions, "cargo">) {
  const w = (u: number, v: number, z: number): Point3 => [heading * u, laneY + heading * v, z];
  return { exhaust: iso(w(30.5, -3.6, 25), projection), beacon: iso(w(36.75, 0, 22.6), projection) };
}
