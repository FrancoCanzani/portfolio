import "@/components/iso/iso.css";
import "../figures.css";
import { PortArt } from "./art";

export function PortFigure({ label }: { label: string }) {
  return (
    <div className="iso">
      <PortArt label={label} />
    </div>
  );
}
