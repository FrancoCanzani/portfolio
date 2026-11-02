import { Plate } from "@/components/iso/react/draw";
import "@/components/iso/iso.css";
import type { RouteMarginCopy } from "@/content";
import { RouteMarginArt } from "./art";
import "./route-margin.css";

export function RouteMarginFigure({ copy, lang }: { copy: RouteMarginCopy; lang: string }) {
  return (
    <div className="iso rm-figure" data-theme="light">
      <Plate
        fig={copy.fig}
        title={copy.title}
        hint={copy.hint}
        readout={copy.readout}
        keys={[
          { mark: "lit", label: copy.keys.revenue },
          { mark: "raised", label: copy.keys.cost },
          { mark: "dotted", label: copy.keys.margin },
        ]}
        caption={copy.caption}
      >
        <RouteMarginArt text={{ lang, label: copy.label, margin: copy.margin, pallets: copy.pallets }} />
      </Plate>
    </div>
  );
}
