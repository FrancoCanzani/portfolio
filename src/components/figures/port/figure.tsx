import "@/components/iso/iso.css";
import "../figures.css";
import { PortArt } from "./art";

export function PortFigure({ label }: { label: string }) {
  return (
    <div className="iso figure" data-theme="light">
      <PortArt label={label} />
    </div>
  );
}
