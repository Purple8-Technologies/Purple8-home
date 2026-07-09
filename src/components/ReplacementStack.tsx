"use client";

const replacements = [
  // Data & storage
  { old: "PostgreSQL / MongoDB", new: "BrickCore storage" },
  { old: "Neo4j", new: "Native graph engine" },
  { old: "Pinecone / Weaviate", new: "HNSW vector index" },
  { old: "Elasticsearch", new: "Full-text search" },
  { old: "Redis", new: "In-process memory layer" },
  // Retrieval & AI
  { old: "LangChain", new: "Built-in RAG pipelines" },
  { old: "LangGraph", new: "Journey Engine (stateful)" },
  { old: "LangSmith", new: "Immutable graph audit trail" },
  { old: "RAGAS", new: "Built-in RAG evaluation" },
  { old: "spaCy NER", new: "GLiNER extraction" },
  // Document intelligence (IDP)
  { old: "Unstructured.io", new: "DocIntel — 70+ formats" },
  { old: "Azure Document Intelligence", new: "DocIntel IDP" },
  { old: "AWS Textract / ABBYY", new: "Self-hosted OCR" },
  // Workflow & data movement
  { old: "Airflow / Temporal", new: "Workflow orchestration + SLA" },
  { old: "Debezium / Kafka Connect", new: "Change Data Capture" },
  // Security & identity
  { old: "Auth0 / Okta", new: "JWT + SSO + RBAC" },
  { old: "HashiCorp Vault", new: "AES-256 envelope KMS" },
  { old: "Splunk / SIEM", new: "SOC vertical" },
  // Ops & tooling
  { old: "Datadog", new: "SLA monitoring + /metrics" },
  { old: "Apollo Federation", new: "Supergraph federation" },
  { old: "Retool", new: "LCNC admin console" },
  { old: "S3 + Lambda glue", new: "DocIntel connectors" },
];

export default function ReplacementStack() {
  return (
    <section className="relative py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4">
            What You Cancel
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Two products — Purple8 and DocIntel — replace 20+ services across your
            whole stack. Deploy anywhere: no external dependencies, no egress, no
            integration sprawl.
          </p>
        </div>

        {/* Replacement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {replacements.map(({ old, new: newService }, idx) => (
            <div
              key={idx}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Old Service (Strikethrough) */}
              <div className="flex items-center gap-2 mb-3">
                <div className="text-zinc-500 line-through text-sm font-medium">
                  {old}
                </div>
                <div className="text-zinc-600">→</div>
              </div>

              {/* New Service */}
              <div className="text-purple-300 font-semibold text-base">
                {newService}
              </div>

              {/* Hover Indicator */}
              <div className="absolute inset-0 rounded-lg bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            No API gateway. No sidecar. No Kubernetes operators.{" "}
            <span className="text-purple-400 font-medium">
              Just one process, one port, one binary.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
