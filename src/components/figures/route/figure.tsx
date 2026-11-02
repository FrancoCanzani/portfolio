import "@/components/iso/iso.css";
import { RouteArt } from "./art";
import "./route.css";

export function RouteFigure({ label }: { label: string }) {
  return (
    <div className="iso route-figure" data-theme="light">
      <RouteArt label={label} />
    </div>
  );
}
