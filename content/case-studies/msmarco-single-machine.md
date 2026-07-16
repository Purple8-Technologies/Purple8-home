---
title: "8.84M documents on a single 24 GB machine"
description: "How a knowledge-heavy team replaced a five-service RAG stack with one Purple8 process — and cut their infrastructure to a single box."
date: "2026-07-16"
customer: "Internal Benchmark"
industry: "AI Infrastructure"
result: "8.84M-doc corpus ingested with ~9 GB peak RSS — no swap, one machine"
tags: ["rag", "benchmark"]
---

## The challenge

A knowledge-intensive workload needed retrieval over the full MS MARCO corpus —
8.84 million passages — with graph relationships, vector search, and full-text
in one place. The incumbent approach meant a vector database, a graph database,
a relational store, an orchestration layer, and a tracing service, each on its
own infrastructure.

## What we did

The entire corpus was ingested into a single Purple8 process on an Apple
M-series machine with 24 GB of RAM. The storage engine's seal-and-evict cycle
kept peak memory bounded regardless of corpus size.

## The result

- **Peak RSS: ~9 GB** — a sawtooth across all 90 seal cycles that never grew
  with N.
- **RAM returned to the OS after ingest:** −3,626 MB; query-time steady state
  settled around 5.4 GB.
- **No swap required** on a 24 GB machine.
- **One process** replaced what would otherwise be five separate services.

The takeaway: the same 24 GB machine can ingest 2M, 5M, or 8M+ nodes with
identical peak-memory behaviour. Never project memory by multiplying per-node
size by N — that's the old model, not the Cortex model.
