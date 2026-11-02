import { cylinder, slabOf, type Plan, type Projection } from "@/components/iso/iso-kit";

export function vergeOf(projection: Projection, plan: Plan, bushes: Array<[number, number, number]>) {
  return {
    strip: slabOf(plan, 0, 0.3, projection, 3),
    bushes: bushes.map(([x, y, r]) => ({
      trunk: cylinder(x, y, r * 0.75, 0, r * 0.9, projection, 20),
      crown: cylinder(x, y, r, r * 0.9, r * 1.1, projection, 24, r * 0.3),
    })),
  };
}

export type VergeArt = ReturnType<typeof vergeOf>;

export const CONTAINER_TINTS = ["blue", "rust", "mustard", "teal", "rust", "blue", "teal", "mustard"] as const;
export type Tint = "red" | "blue" | "rust" | "mustard" | "teal" | "green" | "kraft";
