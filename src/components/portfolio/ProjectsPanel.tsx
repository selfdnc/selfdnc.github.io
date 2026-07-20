import { motion } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "p1",
    title: "Autonomous Sales Agent",
    tag: "AI Agent",
    desc: "Multi-agent system that qualifies leads, drafts personalized emails and books meetings.",
    features: ["LangGraph orchestration", "CRM sync", "Human-in-the-loop review", "Streamed responses"],
    stack: ["Python", "LangGraph", "OpenAI", "Postgres", "FastAPI"],
    challenges: "Guaranteeing deterministic tool routing without over-constraining the model.",
    solution: "Introduced a validator node with structured JSON schema + retry policy.",
    github: "#",
    live: "#",
    workflow: ["Trigger", "Enrich", "Draft", "Approve", "Send", "Log"],
  },
  {
    id: "p2",
    title: "n8n Support Automation",
    tag: "Workflow",
    desc: "Zero-touch ticket triage that classifies, replies and escalates across 6 channels.",
    features: ["24/7 triage", "RAG knowledge base", "Webhook / Chat Trigger", "Smart Intent Triage"],
    stack: ["n8n", "Ollama (Llama 3.2)", "Qdrant", "Node", "Docker"],
    challenges: "Ensuring accurate data retrieval & classification from a local, private knowledge base.",
    solution: "Deployed a local RAG agent to classify intents and retrieve support documents privately.",
    github: "https://github.com/selfdnc/n8n-support-automation",
    live: "https://github.com/selfdnc/n8n-support-automation",
    workflow: ["Inbox", "AI Agent", "Classify", "Route", "Draft", "Send", "Analytics"],
  },
  {
    id: "p3",
    title: "LLM Document Intelligence",
    tag: "LLM App",
    desc: "Upload 1000+ page contracts and get clause-level answers with citations in seconds.",
    features: ["Chunked ingestion", "Hybrid retrieval", "Citations", "Team workspaces"],
    stack: ["Next.js", "LangChain", "Claude", "Pinecone", "Tailwind"],
    challenges: "Balancing recall and cost on very long documents.",
    solution: "Adaptive chunking + reranker with cached embeddings per document hash.",
    github: "#",
    live: "#",
    workflow: ["Upload", "Chunk", "Embed", "Query", "Rerank", "Answer"],
  },
  {
    id: "p4",
    title: "Ops Copilot Dashboard",
    tag: "Business Automation",
    desc: "Real-time ops dashboard where an AI copilot suggests actions and executes with approval.",
    features: ["Live metrics", "Action queue", "Audit log", "Role-based access"],
    stack: ["React", "FastAPI", "Postgres", "OpenAI", "Redis"],
    challenges: "Making AI suggestions explainable to non-technical operators.",
    solution: "Rendered reasoning traces and confidence scores in the UI.",
    github: "#",
    live: "#",
    workflow: ["Ingest", "Analyze", "Suggest", "Approve", "Execute", "Report"],
  },
];

export function ProjectsPanel() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((p, i) => {
        const isOpen = openId === p.id;
        return (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`glass rounded-xl p-5 cursor-pointer transition-all hover:glow-border ${isOpen ? "md:col-span-2 glow-border" : ""}`}
            onClick={() => setOpenId(isOpen ? null : p.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-1">
                  {p.tag}
                </div>
                <h3 className="font-display font-bold text-lg text-cyan-50">{p.title}</h3>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-cyan-300 transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.slice(0, isOpen ? p.stack.length : 4).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/30 text-cyan-200 bg-cyan-500/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-5 grid gap-5 md:grid-cols-2 overflow-hidden"
              >
                <div>
                  <SubHead>Features</SubHead>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm">
                        <span className="text-cyan-300">▸</span> {f}
                      </li>
                    ))}
                  </ul>
                  <SubHead className="mt-4">Challenge</SubHead>
                  <p className="text-sm text-muted-foreground">{p.challenges}</p>
                  <SubHead className="mt-4">Solution</SubHead>
                  <p className="text-sm text-muted-foreground">{p.solution}</p>
                </div>
                <div>
                  <SubHead>Workflow / Architecture</SubHead>
                  <div className="glass rounded-lg p-4">
                    <div className="flex flex-wrap items-center gap-2 justify-center">
                      {p.workflow.map((w, idx) => (
                        <div key={w} className="flex items-center gap-2">
                          <div className="px-3 py-1.5 rounded-md bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 font-mono text-xs">
                            {w}
                          </div>
                          {idx < p.workflow.length - 1 && (
                            <span className="text-cyan-300">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={p.github}
                      className="flex items-center gap-2 px-3 py-2 rounded-md glass hover:glow-border text-sm"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                    <a
                      href={p.live}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-background text-sm font-semibold"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function SubHead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-2 ${className}`}
    >
      {children}
    </div>
  );
}
