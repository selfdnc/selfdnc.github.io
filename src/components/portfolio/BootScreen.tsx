import { AnimatePresence, motion } from "framer-motion";

interface Props { visible: boolean }

export function BootScreen({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-2 border-cyan-400/30 border-t-cyan-300 animate-spin" />
            <div className="absolute inset-2 rounded-full border border-cyan-400/20 border-b-cyan-300 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-black text-lg text-gradient">DC</span>
            </div>
          </div>
          <div className="mt-8 font-mono text-xs tracking-[0.4em] text-cyan-300">
            INITIALIZING AI COMMAND CENTER
          </div>
          <div className="mt-4 h-1 w-56 overflow-hidden rounded-full bg-cyan-950">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
