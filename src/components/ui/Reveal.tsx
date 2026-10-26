"use client";

import React, { type CSSProperties, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type Tag = "div" | "p" | "li" | "ol" | "section" | "span" | "article" | "header" | "footer";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: Tag;
  className?: string;
  spot?: boolean;
  style?: CSSProperties;
  id?: string;
  yOffset?: number;
  duration?: number;
  once?: boolean;
}

/** Framer Motion powered scroll-triggered fade and smooth physics reveal. */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  spot = false,
  style,
  id,
  yOffset = 24,
  duration = 0.65,
  once = true,
}: RevealProps) {
  const Component: any = (motion as any)[as] || motion.div;

  return (
    <Component
      id={id}
      data-spot={spot ? "" : undefined}
      className={`rv in ${className}`}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}

/** Word-by-word masked headline reveal powered by Framer Motion. */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
  mark,
}: {
  mark?: string;
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  id?: string;
}) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay / 1000,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag: any = (motion as any)[Tag] || motion.h2;

  return (
    <MotionTag
      id={id}
      className={`rt in ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            variants={wordVariants}
            className={`w ${mark === w ? "w-mark" : ""}`}
            style={{ display: "inline-block" }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </MotionTag>
  );
}

/** Stagger container for cascading reveals (Bento grids, feature lists, pricing tiers). */
export function MotionStaggerContainer({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: Tag;
  style?: CSSProperties;
}) {
  const MotionComponent: any = (motion as any)[as] || motion.div;

  return (
    <MotionComponent
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </MotionComponent>
  );
}

/** Stagger item for children inside MotionStaggerContainer. */
export function MotionStaggerItem({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Interactive card with spring hover lift & tap feedback. */
export function MotionCard({
  children,
  className = "",
  style,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      onClick={onClick}
      whileHover={{
        y: -4,
        transition: { type: "spring" as const, stiffness: 380, damping: 22 },
      }}
      whileTap={{ scale: 0.985 }}
    >
      {children}
    </motion.div>
  );
}

/** Interactive button or link with magnetic spring hover and click squash. */
export function MotionButton({
  children,
  className = "",
  href,
  onClick,
  style,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const commonProps = {
    className,
    style,
    onClick,
    "aria-label": ariaLabel,
    whileHover: {
      scale: 1.03,
      y: -2,
      transition: { type: "spring" as const, stiffness: 420, damping: 20 },
    },
    whileTap: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  };

  if (href) {
    return (
      <motion.a href={href} {...(commonProps as any)}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...(commonProps as any)}>
      {children}
    </motion.button>
  );
}

export { motion };
