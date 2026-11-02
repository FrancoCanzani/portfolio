import { Dots, Line, Solid } from "@/components/iso/react/draw";
import type { Flat } from "@/components/iso/iso-kit";
import type { Part } from "./geometry";
import { Hop } from "./hop";

function part(item: Part, index: number) {
  const inner = (() => {
    switch (item.kind) {
      case "solid":
        return item.accent ? (
          <g className="tint-red">
            <Solid paths={item.paths!} tone={item.tone} crease="faint" className="iso-tint" />
          </g>
        ) : (
          <Solid paths={item.paths!} tone={item.tone} crease="faint" />
        );
      case "line":
        return <Line d={item.d!} tone={item.tone} />;
      case "wheel":
        return (
          <>
            <Solid paths={item.paths!} tone="hi" crease="none" />
            <Line d={item.hub!} tone="lo" />
            <Dots points={item.dots!} size={0.32} tone="mid" />
          </>
        );
      case "pallet":
        return (
          <>
            <Solid paths={item.paths!} tone={item.tone} crease="faint" />
            {item.strap ? <Line d={item.strap} tone="lo" /> : null}
          </>
        );
      default: {
        const never: never = item.kind;
        return never;
      }
    }
  })();
  return (
    <g key={index} data-pallet={item.kind === "pallet" ? item.pallet : undefined}>
      {inner}
    </g>
  );
}

const tenth = (value: number) => Math.round(value * 10) / 10;

export function TruckArt({ parts, marks }: { parts: Part[]; marks: { exhaust: Flat; beacon: Flat } }) {
  const [ex, ey] = marks.exhaust;
  const [bx, by] = marks.beacon;
  return (
    <Hop>
      {parts.map(part)}
      <circle className="beacon" cx={tenth(bx)} cy={tenth(by)} r={1.3} />
      <g>
        {[0, 1, 2].map((index) => (
          <circle key={index} className="puff" cx={tenth(ex)} cy={tenth(ey)} r={2.2} />
        ))}
      </g>
    </Hop>
  );
}
