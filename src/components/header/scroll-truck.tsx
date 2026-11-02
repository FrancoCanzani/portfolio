"use client";

import * as React from "react";

const TRUCK_W = 40;
const DEPOT_W = 18;
const WHEEL_R = 2;
const WHEELS = [6, 11, 31];

export function ScrollTruck() {
  const lane = React.useRef<HTMLDivElement>(null);
  const truck = React.useRef<HTMLDivElement>(null);
  const wheels = React.useRef<SVGGElement[]>([]);

  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const room = (lane.current?.clientWidth ?? 0) - TRUCK_W - DEPOT_W - 4;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      const x = Math.max(0, room) * progress;
      if (truck.current) truck.current.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      const turn = ((x / WHEEL_R) * 180) / Math.PI;
      wheels.current.forEach((node, index) => node?.setAttribute("transform", `rotate(${turn.toFixed(1)} ${WHEELS[index]} 13)`));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={lane} className="relative h-5 min-w-0 flex-1" aria-hidden="true">
      <span className="absolute right-0 bottom-[2px] left-1 border-t border-dashed border-neutral-300" />
      <div ref={truck} className="absolute bottom-[1px] left-0 will-change-transform">
        <svg width={TRUCK_W} height={16} viewBox="0 0 40 16" className="block overflow-visible">
          <rect x="1" y="3" width="24" height="8" rx="1" fill="#fff" stroke="#a1a1aa" strokeWidth="0.8" />
          <path d="M5 3v8M9 3v8M13 3v8M17 3v8M21 3v8" stroke="#e4e4e7" strokeWidth="0.6" />
          <path d="M1 11.4h35" stroke="#71717a" strokeWidth="0.9" />
          <path d="M26 11V6.6A1.6 1.6 0 0 1 27.6 5h4.6a1.6 1.6 0 0 1 1.3.7l2.1 3V11z" fill="var(--color-signal)" stroke="#8f1b16" strokeWidth="0.6" />
          <path d="M31.2 6h1.6l1.6 2.4h-3.2z" fill="#ffe4e1" />
          <rect x="35" y="9.4" width="1.4" height="1.2" rx="0.3" fill="#ffb020" />
          {WHEELS.map((cx, index) => (
            <g
              key={cx}
              ref={(node) => {
                if (node) wheels.current[index] = node;
              }}
            >
              <circle cx={cx} cy="13" r={WHEEL_R} fill="#27272a" />
              <path d={`M${cx - 1.2} 13h2.4M${cx} 11.8v2.4`} stroke="#a1a1aa" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
      </div>
      <svg width={DEPOT_W} height={16} viewBox="0 0 18 16" className="absolute right-0 bottom-[2px] block">
        <path d="M1 15V6l8-4 8 4v9z" fill="#fff" stroke="#a1a1aa" strokeWidth="0.8" />
        <rect x="5" y="9" width="8" height="6" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="0.6" />
        <path d="M5 11h8M5 13h8" stroke="#d4d4d8" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
