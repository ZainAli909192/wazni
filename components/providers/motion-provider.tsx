"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { motionTransition } from "@/config/motion";

type MotionPreferences = {
  prefersReducedMotion: boolean;
};

const MotionPreferencesContext = createContext<MotionPreferences>({
  prefersReducedMotion: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const value = useMemo(
    () => ({ prefersReducedMotion }),
    [prefersReducedMotion],
  );

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(
      prefersReducedMotion,
    );
  }, [prefersReducedMotion]);

  return (
    <MotionPreferencesContext.Provider value={value}>
      <MotionConfig reducedMotion="user" transition={motionTransition}>
        {children}
      </MotionConfig>
    </MotionPreferencesContext.Provider>
  );
}

export function MotionPreferenceOverride({
  children,
  reduced,
}: {
  children: React.ReactNode;
  reduced: boolean;
}) {
  const value = useMemo(
    () => ({ prefersReducedMotion: reduced }),
    [reduced],
  );

  return (
    <MotionPreferencesContext.Provider value={value}>
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>
        {children}
      </MotionConfig>
    </MotionPreferencesContext.Provider>
  );
}

export function useMotionPreferences() {
  return useContext(MotionPreferencesContext);
}

export function usePrefersReducedMotion() {
  return useMotionPreferences().prefersReducedMotion;
}
