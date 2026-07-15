"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface Stat {
  numeric: number;       // the number to count up to
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

const STATS: Stat[] = [
  { numeric: 8.84, decimals: 2, suffix: "M", label: "Nodes validated" },
  { numeric: 23, suffix: "ms", label: "P95 vector search*" },
  { numeric: 40, suffix: "K/s", label: "Batch ingest throughput*" },
  { numeric: 752, label: "Req/s · 500 users*" },
  { numeric: 1.28, decimals: 2, suffix: "M", label: "Requests · 0 engine errors*" },
  { numeric: 20, suffix: "+", label: "Services replaced" },
  { numeric: 70, suffix: "+", label: "File formats (DocIntel)" },
  { numeric: 67, label: "Graph & AEC algorithms" },
];

function useCountUp(target: number, decimals = 0, active: boolean) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  const fired = useRef(false); // only animate once

  useEffect(() => {
    if (!active || fired.current) return;
    fired.current = true;

    const duration = 1400;
    const start = performance.now();

    function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(parseFloat((ease * target).toFixed(decimals)));
      if (t < 1) raf.current = requestAnimationFrame(step);
    }

    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active, target, decimals]);

  return val;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.numeric, stat.decimals ?? 0, active);
  const display = `${stat.prefix ?? ""}${count.toLocaleString()}${stat.suffix ?? ""}`;

  return (
    <div className="text-center">
      <div className="text-2xl font-bold tabular-nums text-purple-400 sm:text-3xl">
        {display}
      </div>
      <div className="mt-1 text-xs text-zinc-500">{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView(0.2);

  return (
    <section ref={ref} className="border-y border-purple-900/30 bg-[#0d0d17] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} active={inView} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-zinc-600">
          <span className="text-zinc-500">*</span> Measured on real, reproducible
          benchmark runs.{" "}
          <a
            href="/benchmarks"
            className="text-purple-400 transition-colors hover:text-purple-300"
          >
            See methodology & conditions &rarr;
          </a>
        </p>
      </div>
    </section>
  );
}
