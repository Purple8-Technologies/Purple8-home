"use client";
import { useEffect, useRef, useState } from "react";

type LineType =
  | "prompt"
  | "agent"
  | "tool"
  | "result"
  | "output"
  | "comment"
  | "blank";

interface CodeLine {
  text: string;
  type: LineType;
}

// An AI agent building an entire supplier-risk backend through Purple8's MCP
// server — no human writes application code, the agent just calls tools.
const LINES: CodeLine[] = [
  { text: "You  ▸  Stand up a supplier-risk backend from these contracts.", type: "prompt" },
  { text: "", type: "blank" },
  { text: "Claude  ▸  connected to Purple8 MCP · 71 tools", type: "agent" },
  { text: "", type: "blank" },
  { text: '→ data.ingest_file("contracts/*.pdf")', type: "tool" },
  { text: "✓ 1,204 docs · entities + edges extracted", type: "result" },
  { text: "→ graph.communities()", type: "tool" },
  { text: "✓ 37 supplier clusters mapped", type: "result" },
  { text: '→ journey.define("supplier_approval", stages=6)', type: "tool" },
  { text: "✓ workflow live · SLA + HITL gates armed", type: "result" },
  { text: '→ rag.hybrid_query("which suppliers breach SLA?")', type: "tool" },
  { text: "✓ 9 suppliers flagged · vector+graph+text · 238ms", type: "result" },
  { text: "", type: "blank" },
  { text: "▶  Backend live. 0 lines of glue code. ✓", type: "output" },
];

const CHAR_DELAY = 20;
const LINE_PAUSE = 130;
const END_PAUSE = 3600;

const colorMap: Record<LineType, string> = {
  prompt: "text-zinc-200 font-medium",
  agent: "text-purple-300",
  tool: "text-violet-400",
  result: "text-green-400",
  output: "text-green-300 font-semibold",
  comment: "text-zinc-500 italic",
  blank: "",
};

interface DisplayLine {
  text: string;
  type: LineType;
  done: boolean;
}

export default function CodeTerminal() {
  const [displayed, setDisplayed] = useState<DisplayLine[]>([]);
  const [cursor, setCursor] = useState(true);
  // A single ref holds the active timer — cleanup always cancels exactly one ID.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(true); // guard against stale closures after unmount

  // Blinking cursor — independent interval, never restarts
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  // Typewriter engine — restarts itself via recursive schedule
  useEffect(() => {
    runningRef.current = true;

    let lineIdx = 0;
    let charIdx = 0;
    // committed lines are kept in a ref-like local array so the closure
    // never reads stale React state between setTimeout calls.
    const committed: DisplayLine[] = [];

    function schedule(fn: () => void, delay: number) {
      timerRef.current = setTimeout(fn, delay);
    }

    function tick() {
      if (!runningRef.current) return;

      // ── All lines typed: pause then wipe and restart ──
      if (lineIdx >= LINES.length) {
        schedule(() => {
          if (!runningRef.current) return;
          setDisplayed([]);
          // Reset local state and restart
          lineIdx = 0;
          charIdx = 0;
          committed.length = 0;
          schedule(tick, 80);
        }, END_PAUSE);
        return;
      }

      const line = LINES[lineIdx];

      // ── Blank line: commit immediately, move on ──
      if (line.type === "blank") {
        committed.push({ text: "", type: "blank", done: true });
        setDisplayed([...committed]);
        lineIdx++;
        charIdx = 0;
        schedule(tick, LINE_PAUSE);
        return;
      }

      // ── Render partial line ──
      const partial = line.text.slice(0, charIdx);
      const isLineDone = charIdx === line.text.length;

      if (isLineDone) {
        // Commit this line and advance
        committed.push({ text: line.text, type: line.type, done: true });
        setDisplayed([...committed]);
        lineIdx++;
        charIdx = 0;
        schedule(tick, LINE_PAUSE);
      } else {
        setDisplayed([
          ...committed,
          { text: partial, type: line.type, done: false },
        ]);
        charIdx++;
        schedule(tick, CHAR_DELAY);
      }
    }

    // Small initial delay so layout paint settles first
    schedule(tick, 500);

    return () => {
      runningRef.current = false;
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []); // run once — the loop is self-sustaining

  // Scroll to bottom only when a full line is committed (not every char)
  const prevLineCount = useRef(0);
  useEffect(() => {
    const committed = displayed.filter((l) => l.done).length;
    if (committed !== prevLineCount.current) {
      prevLineCount.current = committed;
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
    }
  }, [displayed]);

  const lastLine = displayed[displayed.length - 1];
  const isTyping = lastLine && !lastLine.done;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-purple-900/40 bg-[#0d0d17] shadow-2xl shadow-purple-950/50">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800/60 bg-[#11111b] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 flex-1 text-center font-mono text-xs text-zinc-600">
          claude · purple8-mcp
        </span>
      </div>

      {/* Code body */}
      <div
        ref={bodyRef}
        className="h-[360px] overflow-y-auto p-5 font-mono text-[13px] leading-7"
        style={{ scrollbarWidth: "none" }}
      >
        {displayed.map((line, i) => (
          <div key={i} className="flex">
            <span className={colorMap[line.type]}>
              {line.text}
              {/* Inline cursor while typing this line */}
              {i === displayed.length - 1 && isTyping && (
                <span
                  className="ml-px inline-block h-[14px] w-[2px] align-middle bg-purple-400"
                  style={{ opacity: cursor ? 1 : 0, transition: "opacity 0.1s" }}
                />
              )}
            </span>
          </div>
        ))}
        {/* Cursor on empty line after all lines are done */}
        {lastLine?.done && (
          <div className="flex">
            <span
              className="inline-block h-[14px] w-[2px] align-middle bg-purple-400"
              style={{ opacity: cursor ? 1 : 0, transition: "opacity 0.1s" }}
            />
          </div>
        )}
      </div>

      {/* Fade-out gradient at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0d0d17] to-transparent" />
    </div>
  );
}
