"use client";

import { m } from "framer-motion";
import type { ComponentProps } from "react";

type MotionDivProps = ComponentProps<typeof m.div>;

export const MotionDiv = (props: MotionDivProps) => <m.div {...props} />;
