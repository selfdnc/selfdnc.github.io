import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
  as?: "button" | "a";
  href?: string;
  download?: boolean;
}

export function MagneticButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  as = "button",
  href,
  download,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-background shadow-[0_0_25px_rgba(125,249,255,0.35)] hover:shadow-[0_0_45px_rgba(125,249,255,0.6)]"
      : "glass text-cyan-100 hover:glow-border";

  const base = `relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-display font-semibold tracking-wider transition-shadow ${styles} ${className}`;

  if (as === "a") {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        style={{ x: sx, y: sy }}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={base}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={base}
    >
      {children}
    </motion.button>
  );
}

