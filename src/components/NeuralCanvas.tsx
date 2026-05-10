"use client";
import { useEffect, useRef } from "react";

// ─── Tunables ────────────────────────────────────────────────────────────────
const NODE_COUNT      = 68;
const CONNECT_DIST    = 180;
const NODE_SPEED      = 0.18;
const PULSE_SPEED     = 2.4;
const PULSE_SPAWN_MS  = 320;
const PULSES_MAX      = 38;
const NODE_RADIUS     = 2.2;
const NODE_RADIUS_LIT = 4.5;
const LIT_DECAY       = 0.07;
// ─────────────────────────────────────────────────────────────────────────────

interface Node  { x: number; y: number; vx: number; vy: number; lit: number }
interface Pulse { fromIdx: number; toIdx: number; t: number; speed: number }

function rand(a: number, b: number) { return a + Math.random() * (b - a); }

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    // Capture as non-null locals so nested functions satisfy strict TS.
    const canvas = el as HTMLCanvasElement;
    const c      = ctx as CanvasRenderingContext2D;

    let W = 0, H = 0, rafId = 0, alive = true, lastPulse = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-NODE_SPEED, NODE_SPEED),
        vy: rand(-NODE_SPEED, NODE_SPEED),
        lit: 0,
      }));
    }

    function resize() {
      const p = canvas.parentElement;
      if (!p) return;
      W = p.offsetWidth;
      H = p.offsetHeight;
      const dpr = devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    resize();

    function spawnPulse() {
      if (pulses.length >= PULSES_MAX) return;
      const fi = Math.floor(Math.random() * nodes.length);
      const f  = nodes[fi];
      const nb: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === fi) continue;
        const dx = nodes[i].x - f.x, dy = nodes[i].y - f.y;
        if (dx * dx + dy * dy < CONNECT_DIST * CONNECT_DIST) nb.push(i);
      }
      if (!nb.length) return;
      const ti   = nb[Math.floor(Math.random() * nb.length)];
      const dist = Math.hypot(nodes[ti].x - f.x, nodes[ti].y - f.y);
      pulses.push({ fromIdx: fi, toIdx: ti, t: 0, speed: PULSE_SPEED / dist });
    }

    function draw(ts: number) {
      if (!alive) return;
      c.clearRect(0, 0, W, H);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }
        if (n.lit > 0) n.lit = Math.max(0, n.lit - LIT_DECAY);
      }

      if (ts - lastPulse > PULSE_SPAWN_MS) { spawnPulse(); lastPulse = ts; }

      // Edges
      c.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const a = 0.18 * (1 - Math.sqrt(d2) / CONNECT_DIST);
            c.strokeStyle = `rgba(124,58,237,${a.toFixed(3)})`;
            c.beginPath();
            c.moveTo(nodes[i].x, nodes[i].y);
            c.lineTo(nodes[j].x, nodes[j].y);
            c.stroke();
          }
        }
      }

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p  = pulses[i];
        const f  = nodes[p.fromIdx];
        const to = nodes[p.toIdx];
        if (Math.hypot(to.x - f.x, to.y - f.y) > CONNECT_DIST * 1.2) {
          pulses.splice(i, 1); continue;
        }
        p.t += p.speed;
        if (p.t >= 1) { to.lit = 1; pulses.splice(i, 1); continue; }

        const px  = f.x + (to.x - f.x) * p.t;
        const py  = f.y + (to.y - f.y) * p.t;
        const t0  = Math.max(0, p.t - 0.25);
        const tx0 = f.x + (to.x - f.x) * t0;
        const ty0 = f.y + (to.y - f.y) * t0;

        const grad = c.createLinearGradient(tx0, ty0, px, py);
        grad.addColorStop(0, "rgba(168,85,247,0)");
        grad.addColorStop(1, "#a855f7");
        c.strokeStyle = grad;
        c.lineWidth   = 1.5;
        c.beginPath();
        c.moveTo(tx0, ty0);
        c.lineTo(px, py);
        c.stroke();

        const hg = c.createRadialGradient(px, py, 0, px, py, 7);
        hg.addColorStop(0, "rgba(168,85,247,0.55)");
        hg.addColorStop(1, "rgba(168,85,247,0)");
        c.fillStyle = hg;
        c.beginPath();
        c.arc(px, py, 7, 0, Math.PI * 2);
        c.fill();
      }

      // Nodes
      for (const n of nodes) {
        const r = NODE_RADIUS + (NODE_RADIUS_LIT - NODE_RADIUS) * n.lit;
        if (n.lit > 0) {
          const g = c.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
          g.addColorStop(0, `rgba(192,132,252,${(n.lit * 0.6).toFixed(3)})`);
          g.addColorStop(1, "rgba(192,132,252,0)");
          c.fillStyle = g;
          c.beginPath();
          c.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
          c.fill();
        }
        c.fillStyle = n.lit > 0
          ? `rgba(192,132,252,${(0.5 + 0.5 * n.lit).toFixed(3)})`
          : "rgba(168,85,247,0.55)";
        c.beginPath();
        c.arc(n.x, n.y, r, 0, Math.PI * 2);
        c.fill();
      }

      // Vignette
      const vx = c.createLinearGradient(0, 0, W, 0);
      vx.addColorStop(0,    "rgba(10,10,15,0.65)");
      vx.addColorStop(0.15, "rgba(10,10,15,0)");
      vx.addColorStop(0.85, "rgba(10,10,15,0)");
      vx.addColorStop(1,    "rgba(10,10,15,0.65)");
      c.fillStyle = vx;
      c.fillRect(0, 0, W, H);

      const vy = c.createLinearGradient(0, 0, 0, H);
      vy.addColorStop(0,    "rgba(10,10,15,0.65)");
      vy.addColorStop(0.12, "rgba(10,10,15,0)");
      vy.addColorStop(0.88, "rgba(10,10,15,0)");
      vy.addColorStop(1,    "rgba(10,10,15,0.65)");
      c.fillStyle = vy;
      c.fillRect(0, 0, W, H);

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  );
}
