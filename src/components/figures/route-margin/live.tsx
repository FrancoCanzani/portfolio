"use client";

import * as React from "react";
import { translateAlong } from "@/components/iso/iso-kit";
import { asksForStillness, follow, useInView, useLoop, useReadout } from "@/components/iso/react/live";
import { COIN, LOOP, PALLETS, STILL_AT, TRIP_KM, momentOf, tripOf } from "./model";
import { COIN_H, COST_AT, CUSTOMER_X, DEPOT_X, HEIGHT, RAIL, RAIL_FROM, RAIL_TO, REVENUE_AT, TRAY_H, WIDTH, at, coinZ, P } from "./view";

export interface RouteMarginText {
  lang: string;
  label: string;
  margin: string;
  pallets: string;
}

interface Props {
  text: RouteMarginText;
  base: React.ReactNode;
  depot: React.ReactNode;
  customer: React.ReactNode;
  tray: React.ReactNode;
  revenue: React.ReactNode;
  cost: React.ReactNode;
  truckOut: React.ReactNode;
  truckBack: React.ReactNode;
  rail: React.ReactNode;
  knob: React.ReactNode;
}

const TOUR = [26, 13, 0];
const DROP = 9;
const PREVIEW_MS = 1600;

const topOf = (count: number) => (count > 0 ? coinZ(count - 1) + COIN_H : TRAY_H);
const REST_FROM = at([REVENUE_AT[0], REVENUE_AT[1], TRAY_H]);
const REST_TO = at([COST_AT[0], COST_AT[1], TRAY_H]);
const knobAt = (pallets: number) => RAIL_FROM + ((RAIL_TO - RAIL_FROM) * pallets) / PALLETS;

function stackTo(nodes: NodeListOf<SVGGElement> | undefined, amount: number, over?: number) {
  if (!nodes) return;
  const whole = Math.floor(amount + 1e-6);
  const part = amount - whole;
  nodes.forEach((node, index) => {
    let opacity = "0";
    let lift = "";
    if (index < whole) opacity = "1";
    else if (index === whole && part > 0.02) {
      opacity = `${Math.round(part * 100) / 100}`;
      lift = translateAlong(P, [0, 0, DROP * (1 - part) * (1 - part)]);
    }
    if (node.style.opacity !== opacity) node.style.opacity = opacity;
    if ((node.getAttribute("transform") ?? "") !== lift) {
      if (lift) node.setAttribute("transform", lift);
      else node.removeAttribute("transform");
    }
    if (over !== undefined) {
      const red = index >= over && index < Math.ceil(amount);
      if (red !== node.hasAttribute("data-over")) node.toggleAttribute("data-over", red);
    }
  });
}

export function RouteMarginLive(props: Props) {
  const { text } = props;
  const { anchor, say } = useReadout<HTMLDivElement>();
  const svg = React.useRef<SVGSVGElement | null>(null);
  const outRef = React.useRef<SVGGElement | null>(null);
  const backRef = React.useRef<SVGGElement | null>(null);
  const revenueRef = React.useRef<SVGGElement | null>(null);
  const costRef = React.useRef<SVGGElement | null>(null);
  const knobRef = React.useRef<SVGGElement | null>(null);
  const wireRef = React.useRef<SVGPathElement | null>(null);
  const endsRef = React.useRef<(SVGCircleElement | null)[]>([null, null]);
  const inView = useInView(anchor);
  const [valueNow, setValueNow] = React.useState(TOUR[0]!);

  const clock = React.useRef(0);
  const pallets = React.useRef(TOUR[0]!);
  const knob = React.useRef(knobAt(TOUR[0]!));
  const tourStep = React.useRef(0);
  const user = React.useRef(false);
  const dragging = React.useRef(false);
  const previewUntil = React.useRef(0);

  const money = React.useMemo(() => new Intl.NumberFormat(text.lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0, signDisplay: "always" }), [text.lang]);
  const share = React.useMemo(() => new Intl.NumberFormat(text.lang, { style: "percent", maximumFractionDigits: 1, signDisplay: "always" }), [text.lang]);
  const whole = React.useMemo(() => new Intl.NumberFormat(text.lang, { maximumFractionDigits: 0 }), [text.lang]);

  const summary = React.useCallback(
    (count: number) => {
      const trip = tripOf(count);
      return `${count} ${text.pallets} · ${text.margin} ${money.format(trip.margin)} (${share.format(trip.share)})`;
    },
    [money, share, text.margin, text.pallets],
  );

  const draw = React.useCallback(() => {
    const count = pallets.current;
    const moment = momentOf(clock.current, count);
    const truck = moment.heading === 1 ? outRef.current : backRef.current;
    const other = moment.heading === 1 ? backRef.current : outRef.current;
    if (other && other.style.display !== "none") other.style.display = "none";
    if (truck) {
      if (truck.style.display) truck.style.display = "";
      const x = DEPOT_X + (CUSTOMER_X - DEPOT_X) * moment.along;
      truck.setAttribute("transform", translateAlong(P, [x, 0, 0]));
      const shown = Math.ceil(moment.load - 1e-6);
      truck.querySelectorAll<SVGGElement>("[data-pallet]").forEach((node) => {
        const visible = Number(node.dataset.pallet) < shown;
        const display = visible ? "" : "none";
        if (node.style.display !== display) node.style.display = display;
      });
    }
    const revenueCoins = moment.revenue / COIN;
    const costCoins = moment.cost / COIN;
    stackTo(revenueRef.current?.querySelectorAll<SVGGElement>("[data-coin]"), revenueCoins);
    stackTo(costRef.current?.querySelectorAll<SVGGElement>("[data-coin]"), costCoins, Math.floor(revenueCoins + 1e-6));
    const from = at([REVENUE_AT[0], REVENUE_AT[1], topOf(Math.ceil(revenueCoins - 0.02))]);
    const to = at([COST_AT[0], COST_AT[1], topOf(Math.ceil(costCoins - 0.02))]);
    wireRef.current?.setAttribute("d", `M${from[0].toFixed(1)} ${from[1].toFixed(1)}L${to[0].toFixed(1)} ${to[1].toFixed(1)}`);
    [from, to].forEach((point, index) => {
      endsRef.current[index]?.setAttribute("cx", point[0].toFixed(1));
      endsRef.current[index]?.setAttribute("cy", point[1].toFixed(1));
    });
    knobRef.current?.setAttribute("transform", translateAlong(P, [knob.current - RAIL_FROM, 0, 0]));
    if (performance.now() < previewUntil.current || dragging.current) say(summary(count));
    else if (moment.finished) say(summary(count));
    else say(`${whole.format(moment.km)} / ${whole.format(TRIP_KM)} km · ${text.margin} ${money.format(moment.revenue - moment.cost)}`);
  }, [money, say, summary, text.margin, whole]);

  const kick = useLoop((dt, calm) => {
    const target = knobAt(pallets.current);
    knob.current = follow(knob.current, target, dt, 0.08, calm);
    if (calm) {
      clock.current = STILL_AT;
      draw();
      return knob.current !== target || dragging.current;
    }
    const before = Math.floor(clock.current / LOOP);
    clock.current += dt;
    if (Math.floor(clock.current / LOOP) !== before && !user.current) {
      tourStep.current = (tourStep.current + 1) % TOUR.length;
      pallets.current = TOUR[tourStep.current]!;
      setValueNow(pallets.current);
    }
    draw();
    return true;
  }, inView);

  const choose = React.useCallback(
    (count: number) => {
      const next = Math.min(PALLETS, Math.max(0, Math.round(count)));
      user.current = true;
      previewUntil.current = performance.now() + PREVIEW_MS;
      pallets.current = next;
      setValueNow(next);
      kick();
    },
    [kick],
  );

  const palletsAt = React.useCallback((clientX: number, clientY: number) => {
    const node = svg.current;
    const matrix = node?.getScreenCTM();
    if (!node || !matrix) return pallets.current;
    const point = new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse());
    const from = at([RAIL_FROM, RAIL.y, 0]);
    const to = at([RAIL_TO, RAIL.y, 0]);
    const t = ((point.x - from[0]) * (to[0] - from[0]) + (point.y - from[1]) * (to[1] - from[1])) / ((to[0] - from[0]) ** 2 + (to[1] - from[1]) ** 2);
    return t * PALLETS;
  }, []);

  React.useEffect(() => {
    clock.current = asksForStillness() ? STILL_AT : 0;
    draw();
  }, [draw]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    choose(palletsAt(event.clientX, event.clientY));
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) choose(palletsAt(event.clientX, event.clientY));
  };
  const onPointerUp = () => {
    dragging.current = false;
    previewUntil.current = performance.now() + PREVIEW_MS;
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
    if (step) {
      event.preventDefault();
      choose(pallets.current + step);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      choose(event.key === "Home" ? 0 : PALLETS);
    }
  };

  return (
    <div
      ref={anchor}
      className="iso-stage rm-stage"
      tabIndex={0}
      role="slider"
      aria-label={text.label}
      aria-valuemin={0}
      aria-valuemax={PALLETS}
      aria-valuenow={valueNow}
      aria-valuetext={summary(valueNow)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <svg ref={svg} className="iso-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true" focusable="false">
        {props.base}
        {props.depot}
        {props.customer}
        {props.tray}
        <g ref={revenueRef}>{props.revenue}</g>
        <g ref={costRef}>{props.cost}</g>
        <path ref={wireRef} className="iso-line" data-tone="mid" data-dotted="" d="" />
        <circle ref={(node) => void (endsRef.current[0] = node)} className="iso-wire-end" r={1} cx={REST_FROM[0]} cy={REST_FROM[1]} />
        <circle ref={(node) => void (endsRef.current[1] = node)} className="iso-wire-end" r={1} cx={REST_TO[0]} cy={REST_TO[1]} />
        <g ref={outRef} transform={translateAlong(P, [DEPOT_X, 0, 0])}>
          {props.truckOut}
        </g>
        <g ref={backRef} style={{ display: "none" }}>
          {props.truckBack}
        </g>
        {props.rail}
        <g ref={knobRef}>{props.knob}</g>
      </svg>
    </div>
  );
}
