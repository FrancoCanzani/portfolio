export function markMotion(node: SVGGElement | null, x: number, last: { current: number }) {
  if (!node) return;
  const moving = Math.abs(x - last.current) > 0.01;
  last.current = x;
  if (moving !== node.hasAttribute("data-moving")) node.toggleAttribute("data-moving", moving);
  if (moving === node.hasAttribute("data-parked")) node.toggleAttribute("data-parked", !moving);
}
