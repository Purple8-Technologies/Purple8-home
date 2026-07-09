import { ImageResponse } from "next/og";

// Static social-share image (1200×630). Generated at build time under
// `output: "export"` because this route has no dynamic params. This wires
// og:image; Twitter's crawler falls back to og:image for summary_large_image.

export const alt = "Purple8 — Your entire backend. One process.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Required for the metadata image route under `output: "export"` (Next 16).
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0f",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top pill */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #6b21a8",
              borderRadius: "9999px",
              padding: "8px 20px",
              color: "#c4b5fd",
              fontSize: 24,
              letterSpacing: 2,
            }}
          >
            AI-NATIVE BACKEND
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 82, fontWeight: 800 }}>
            Your entire backend.
          </div>
          <div style={{ display: "flex", color: "#a855f7", fontSize: 82, fontWeight: 800 }}>
            One process. Zero to wire.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              color: "#a1a1aa",
              fontSize: 32,
              maxWidth: 980,
            }}
          >
            Graph · vector · RAG · document intelligence · workflows — in one
            embedded engine. You build the frontend.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #27272a",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", color: "#ffffff", fontSize: 30, fontWeight: 700 }}>
            purple8.ai
          </div>
          <div style={{ display: "flex", color: "#8b5cf6", fontSize: 28, fontWeight: 600 }}>
            Replaces 20+ services
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
