"use client";
// Client Component wrapper — allows ssr:false dynamic import (not permitted in
// Server Components). Keeps the canvas animation JS out of the initial bundle.
import dynamic from "next/dynamic";

const ParticleNetwork = dynamic(() => import("@/components/ParticleNetwork"), {
  ssr: false,
});

export default function ParticleNetworkLoader() {
  return <ParticleNetwork />;
}
