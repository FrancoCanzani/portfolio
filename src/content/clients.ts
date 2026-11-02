interface Client {
  name: string;
  src: string;
  height: number;
  /** Intrinsic width ÷ height, so the row reserves space before the images load. */
  ratio: number;
  /** Artwork that is white or too pale to read once desaturated on the light page. */
  silhouette?: boolean;
}

export const clients: Client[] = [
  { name: "Ford", src: "/logos/ford.svg", height: 22, ratio: 2.778 },
  { name: "Grupo Bimbo", src: "/logos/bimbo.svg", height: 30, ratio: 1.715 },
  { name: "Lineage", src: "/logos/lineage.svg", height: 22, ratio: 3.929 },
  { name: "STEF", src: "/logos/stef.svg", height: 18, ratio: 3.34 },
  { name: "Noerpel", src: "/logos/noerpel.png", height: 22, ratio: 3.582 },
  { name: "Unexport", src: "/logos/unexport.png", height: 22, ratio: 4.031, silhouette: true },
  { name: "Fritoper", src: "/logos/fritoper.webp", height: 24, ratio: 3.436, silhouette: true },
  { name: "Deldiche", src: "/logos/deldiche.png", height: 26, ratio: 2.042 },
  { name: "Across Logistics", src: "/logos/across.png", height: 24, ratio: 3.1, silhouette: true },
  { name: "IDG", src: "/logos/idg.svg", height: 28, ratio: 1.053 },
];
