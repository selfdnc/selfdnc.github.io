import { motion } from "framer-motion";

const flow = ["User", "AI Agent", "Prompt Engineering", "OpenAI", "Database", "Automation", "Email", "Dashboard"];

export function WorkflowVisualization() {
  return (
    <div className="glass rounded-2xl p-6 overflow-hidden">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_10px_#7df9ff]" />
        <h3 className="font-display font-bold tracking-widest text-cyan-100">
          LIVE AUTOMATION PIPELINE
        </h3>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {flow.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px #7df9ff",
                  "0 0 24px #7df9ff",
                  "0 0 0px #7df9ff",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
              className="rounded-lg border border-cyan-400/40 bg-gradient-to-br from-cyan-500/15 to-blue-500/5 px-4 py-2.5 font-display font-semibold tracking-wide text-cyan-50 text-sm"
            >
              {step}
            </motion.div>
            {i < flow.length - 1 && (
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3], x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="text-cyan-300 text-xl"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
