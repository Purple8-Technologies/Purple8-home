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
  { numeric: 9, suffix: "M+", label: "Nodes validated" },
  { numeric: 3.5, suffix: "ms", label: "p50 at 100K passages" },
  { numeric: 182, suffix: "×", label: "Faster than BM25" },
  { numeric: 4100, suffix: "+", label: "Automated tests" },
  { numeric: 70, suffix: "+", label: "File formats (DocIntel)" },
  { numeric: 0.85, decimals: 2, label: "Hybrid RAG MRR@10" },
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
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
