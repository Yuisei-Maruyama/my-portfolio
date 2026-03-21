"use client";

import { m } from "framer-motion";
import type { ComponentProps } from "react";

export const MotionDiv = (props: ComponentProps<typeof m.div>) => <m.div {...props} />;
export const MotionA = (props: ComponentProps<typeof m.a>) => <m.a {...props} />;
