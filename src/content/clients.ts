export interface Client {
  name: string;
  src: string;
  height: number;
  /** Artwork that is white or too pale to read once desaturated on the light page. */
  silhouette?: boolean;
}

export const clients: Client[] = [
  { name: "Ford", src: "/logos/ford.svg", height: 22 },
  { name: "Grupo Bimbo", src: "/logos/bimbo.svg", height: 30 },
  { name: "Lineage", src: "/logos/lineage.svg", height: 22 },
  { name: "STEF", src: "/logos/stef.svg", height: 18 },
  { name: "Noerpel", src: "/logos/noerpel.png", height: 22 },
  { name: "Unexport", src: "/logos/unexport.png", height: 22, silhouette: true },
  { name: "Fritoper", src: "/logos/fritoper.webp", height: 24, silhouette: true },
  { name: "Deldiche", src: "/logos/deldiche.png", height: 26 },
  { name: "Across Logistics", src: "/logos/across.png", height: 24, silhouette: true },
  { name: "IDG", src: "/logos/idg.svg", height: 28 },
];
