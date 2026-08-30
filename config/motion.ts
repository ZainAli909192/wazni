import type { Transition, Variants } from "motion/react";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionTransition: Transition = {
  duration: 0.28,
  ease: motionEase,
};

export const motionTransitionFast: Transition = {
  duration: 0.16,
  ease: motionEase,
};

export const motionTransitionEmphasis: Transition = {
  duration: 0.6,
  ease: motionEase,
};

export type RevealPreset = "fade" | "up" | "down" | "scale" | "spatial";

export const revealVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: motionTransition },
  },
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: motionTransition },
  },
  down: {
    hidden: { opacity: 0, y: -18 },
    visible: { opacity: 1, y: 0, transition: motionTransition },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: motionTransition },
  },
  spatial: {
    hidden: { opacity: 0, scale: 0, y: 40, rotateX: 18, rotateY: -8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: motionTransitionEmphasis,
    },
  },
} satisfies Record<RevealPreset, Variants>;

export const reducedRevealVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0 },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransition,
  },
};

export const wordContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.55em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: motionEase },
  },
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: motionEase },
  },
};
