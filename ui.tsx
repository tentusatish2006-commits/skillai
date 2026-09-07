import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

export function AnimatedButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
} & HTMLMotionProps<'button'>) {
  const base =
    'relative overflow-hidden rounded-xl px-6 py-3 font-display font-semibold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none';
  const styles = {
    primary: 'bg-accent-500 text-ink-950 animate-pulse-glow hover:bg-accent-400',
    secondary: 'glass text-ink-100 hover:bg-ink-700/60 border border-ink-500/30',
    ghost: 'text-ink-300 hover:text-ink-100',
  }[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.span
          className="pointer-events-none absolute inset-0 -z-0"
          initial={{ x: '-120%' }}
          whileHover={{ x: '120%' }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
          }}
        />
      )}
    </motion.button>
  );
}

export function ProgressRing({
  value,
  size = 160,
  stroke = 12,
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-400)" />
            <stop offset="60%" stopColor="var(--color-accent-500)" />
            <stop offset="100%" stopColor="var(--color-amber-glow)" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-ink-700)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          filter="url(#ringGlow)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <AnimatedCounter value={value} suffix="%" className="text-3xl font-bold text-gradient" />
        {label && <span className="mt-1 text-sm text-ink-300">{label}</span>}
        {sublabel && <span className="text-xs text-ink-400">{sublabel}</span>}
      </div>
    </div>
  );
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.2,
  className = '',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  return <motion.span ref={ref} className={className} style={{ display }}>{display}</motion.span>;
}

export function Typewriter({ text, speed = 60, className = '' }: { text: string; speed?: number; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: text.length * speed / 1000, ease: 'linear' }}
        style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap', verticalAlign: 'bottom' }}
      >
        {text}
      </motion.span>
      <motion.span
        className="ml-0.5 inline-block w-[2px] bg-accent-400"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ height: '1em' }}
      />
    </motion.span>
  );
}

export function GlowCard({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`glass card-trace rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function FloatingBlobs({ count = 4 }: { count?: number }) {
  const colors = [
    'rgba(20, 216, 196, 0.18)',
    'rgba(255, 181, 71, 0.14)',
    'rgba(58, 69, 120, 0.25)',
    'rgba(20, 216, 196, 0.10)',
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 280 + i * 80,
            height: 280 + i * 80,
            background: colors[i % colors.length],
            left: `${10 + i * 22}%`,
            top: `${5 + (i % 2) * 35}%`,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export function DraggableBlob({ color, size, className }: { color: string; size: number; className?: string }) {
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={{ scale: 1.1 }}
      className={`pointer-events-auto absolute cursor-grab active:cursor-grabbing rounded-full blur-2xl ${className}`}
      style={{ width: size, height: size, background: color }}
    />
  );
}

export function SkeletonShimmer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-ink-800/60 ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(138,148,194,0.12) 50%, transparent 100%)',
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function PageWrapper({ children, k }: { children: ReactNode; k: string }) {
  return (
    <motion.div
      key={k}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 22 } },
} as const;

export const popIn = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 18 } },
} as const;
