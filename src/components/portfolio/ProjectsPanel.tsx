import { motion } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "p1",
  title: "AI Autonomous Sales Agent",
  tag: "AI Automation",
  desc: "Automated outreach system using n8n and Groq AI to draft pitches and send emails via Telegram approval.",
  features: [
    "Webhook Lead Capture",
    "Groq LLaMA-3 Pitch Drafts",
    "Telegram Human Review",
    "Automated Email Delivery"
  ],
  stack: ["n8n", "Groq AI", "Telegram API", "SMTP"],
  challenges: "Preventing unauthorized email dispatch without human validation.",
  solution: "Added a Telegram approval step before the final SMTP node.",
  github: "https://github.com/selfdnc/AI-Autonomous-Sales-Agent",
  live: "#",
  workflow: ["Webhook", "Groq AI", "Telegram", "SMTP Email"],
  },
  {
    id: "p2",
    title: "n8n Support Automation",
    tag: "Workflow",
    desc: "Local RAG support agent that classifies intents, retrieves docs, and routes queries.",
    features: ["24/7 triage", "RAG knowledge base", "Webhook / Chat Trigger", "Smart Intent Triage"],
    stack: ["n8n", "Ollama (Llama 3.2)", "Qdrant", "Node", "Docker"],
    challenges: "Ensuring accurate data retrieval & classification from a local, private knowledge base.",
    solution: "Deployed a local RAG agent to classify intents and retrieve support documents privately.",
    github: "https://github.com/selfdnc/n8n-support-automation",
    live: "https://github.com/selfdnc/n8n-support-automation",
    workflow: ["Inbox", "AI Agent", "Classify", "Route", "Resolve"],
  },
  {
  id: "p3",
  title: "AI Job Hunter Agent",
  tag: "n8n Workflow",
  desc: "Automated AI agent that fetches live remote job listings, filters API noise, and extracts precise role details without hallucination.",
  features: [
    "Live API Integration",
    "Zero-Hallucination Extraction",
    "Webhook & Terminal Trigger",
    "Smart Data Sanitization"
  ],
  stack: [
    "n8n",
    "Groq (Llama 3.1)",
    "JavaScript",
    "Remote OK API",
    "cURL / Webhook"
  ],
  challenges: "Filtering out legal disclaimers/junk metadata from live API payloads while avoiding context token limits and LLM hallucinations.",
  solution: "Built a custom JavaScript data-cleaning node in n8n to slice clean job listings and passed them to a Groq-powered AI Agent for exact parsing.",
  github: "https://github.com/selfdnc/AI-JobHunter-Agent",
  live: "https://github.com/selfdnc/AI-JobHunter-Agent",
  workflow: [
    "Webhook",
    "HTTP Request",
    "Data Cleanup (JS)",
    "AI Job Hunter Agent",
    "Respond to Webhook"
  ],
},
  {
  id: "p4",
  title: "AI Image Analysis & Structured Extraction",
  tag: "AI Automation",
  desc: "Event-driven AI pipeline that processes images via Webhook, prevents duplicate entries, extracts structured visual insights using Gemini AI, and auto-syncs with Google Sheets.",
  features: [
    "HTTP Webhook Trigger",
    "Smart Deduplication Check",
    "Gemini Vision AI Analysis",
    "Automated Google Sheets Sync"
  ],
  stack: ["n8n", "Google Gemini AI", "Google Sheets API", "JavaScript", "cURL / Webhooks"],
  challenges: "Processing image binary payloads dynamically via API endpoints without relying on local file path dependencies.",
  solution: "Built a fully event-driven n8n pipeline using Webhook POST triggers, custom JavaScript binary parsers, and Gemini Vision models to structure data directly into Google Sheets.",
  github: "https://github.com/selfdnc/image-analysis-ai-agent",
  live: "https://github.com/selfdnc/image-analysis-ai-agent",
  workflow: ["Webhook POST", "Duplicate Check", "Gemini Vision AI", "Data Formatter", "Google Sheets"]
},
{
  id: "p5",
  title: "Social Media Autopilot",
  tag: "AI Agent",
  desc: "Event-driven autonomous AI agent pipeline that receives chat prompts, retains conversation memory, generates AI visual assets, and auto-posts across Telegram & Discord.",
  features: [
    "Autonomous Intent Reasoning",
    "Conversational Short-Term Memory",
    "FLUX / Hugging Face Media Generation",
    "Multi-Platform Discord & Telegram Publishing"
  ],
  stack: ["n8n", "Google Gemini 2.0", "Hugging Face (MCP)", "Discord Webhooks", "Telegram Bot API"],
  challenges: "Managing autonomous multi-tool calling sequences dynamically while maintaining conversation memory and channel posting reliability.",
  solution: "Constructed an end-to-end n8n agent workflow using Gemini reasoning, Simple Window Memory, and Hugging Face inference tools connected seamlessly to Discord webhooks.",
  github: "https://github.com/selfdnc/Social-Media-Autopilot",
  live: "https://github.com/selfdnc/Social-Media-Autopilot",
  workflow: ["Telegram Trigger", "n8n AI Agent", "Gemini 2.0 LLM", "Hugging Face Tool", "Discord Webhook", "Telegram Response"]
}
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
