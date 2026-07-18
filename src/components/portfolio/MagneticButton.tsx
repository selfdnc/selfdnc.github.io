import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function MagneticButton({ children, variant = "primary", className = "", ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-background shadow-[0_0_25px_rgba(125,249,255,0.35)] hover:shadow-[0_0_45px_rgba(125,249,255,0.6)]"
      : "glass text-cyan-100 hover:glow-border";

  return (
    <motion.button
      ref={ref}
      style={{ x: tx, y: ty }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative px-6 py-3 rounded-full font-display font-semibold tracking-wider transition-shadow ${styles} ${className}`}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
}
