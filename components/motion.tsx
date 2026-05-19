'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'p' | 'h2' | 'h3';
}

export function FadeUp({
  children,
  delay = 0,
  className,
  as = 'div',
}: FadeUpProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      variants={fadeUpVariants}
    >
      {children}
    </Component>
  );
}

export function Fade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      variants={fadeVariants}
    >
      {children}
    </motion.div>
  );
}

interface RevealWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
}: RevealWordsProps) {
  const words = text.split(' ');

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerList({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerListProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}

interface ParallaxImageWrapperProps {
  children: ReactNode;
  className?: string;
}

// Animates on mount (not on viewport intersection) — used for hero/featured
// images that may be above the fold. Using `whileInView` here would keep the
// image at opacity 0 until the IntersectionObserver fires, which on slow
// hydration can leave hero photos invisible.
export function ParallaxFade({
  children,
  className,
}: ParallaxImageWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1.04, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Variant for below-the-fold featured images — animates on viewport enter.
export function ParallaxFadeInView({
  children,
  className,
}: ParallaxImageWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1.04, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
