"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

const MotionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
};

export default MotionProvider;
