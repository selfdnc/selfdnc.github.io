import { motion } from "framer-motion";

export const skillCategories = [
  {
    name: "AI",
    skills: [
      { name: "Ollama" },
      { name: "RAG" },
      { name: "AI Agents" },
      { name: "OpenAI" },
      { name: "Prompt Engineering" },
      { name: "LLMs" },
    ],
  },
  {
    name: "APIs",
    skills: [
      { name: "OpenAI API" },
      { name: "Groq API" },
      { name: "Webhook" },
      { name: "REST API" },
    ],
  },
  {
    name: "Automation",
    skills: [
      { name: "n8n" },
      { name: "Make" },
      { name: "Trigger & Router" },
      { name: "Workflows" },
      { name: "Google Sheets" },
      { name: "Gmail" },
    ],
  },
  {
    name: "Database",
    skills: [{ name: "Qdrant" }, { name: "SQL*Plus" }],
  },
  {
    name: "Version Control",
    skills: [{ name: "Git" }, { name: "GitHub" }],
  },
  {
    name: "Cloud & Deployment",
    skills: [{ name: "Docker" }, { name: "Next.js" }],
  },
  {
    name: "Soft Skills",
    skills: [
      { name: "Networking" },
      { name: "Creativity" },
      { name: "Communication" },
      { name: "Problem Solving" },
    ],
  },
];

export function SkillsPanel() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 p-4">
      {skillCategories.map((cat, ci) => (
        <div key={cat.name} className="space-y-4">
          {/* Header Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <h3 className="font-display text-sm md:text-base font-bold text-cyan-200 tracking-[0.2em] whitespace-nowrap">
              {cat.name.toUpperCase()}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          </div>

          {/* Clean Pill/Tag Grid Layout */}
          <div className="flex flex-wrap justify-center gap-3">
            {cat.skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: ci * 0.05 + i * 0.03 }}
                className="px-4 py-2.5 rounded-lg bg-slate-900/60 border border-cyan-500/30 text-cyan-100 font-medium text-sm backdrop-blur-md hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all cursor-default"
              >
                {s.name}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
