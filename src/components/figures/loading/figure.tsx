import "@/components/iso/iso.css";
import "../figures.css";
import { LoadingArt } from "./art";

export function LoadingFigure({ label }: { label: string }) {
  return (
    <div className="iso">
      <LoadingArt label={label} />
    </div>
  );
}
