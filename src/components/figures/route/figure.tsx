import "@/components/iso/iso.css";
import "../figures.css";
import { RouteArt } from "./art";

export function RouteFigure({ label }: { label: string }) {
  return (
    <div className="iso">
      <RouteArt label={label} />
    </div>
  );
}
