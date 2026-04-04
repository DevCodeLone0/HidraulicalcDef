'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface DynamicGradientProps {
  children?: ReactNode;
  className?: string;
}

export function DynamicGradient({ children, className = '' }: DynamicGradientProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient blobs */}
      <motion.div
        className='absolute -top-40 -right-40 w-80 h-80 rounded-full'
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute -bottom-40 -left-40 w-96 h-96 rounded-full'
        style={{
          background: 'radial-gradient(circle, rgba(0,168,204,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full'
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className='relative z-10'>{children}</div>
    </div>
  );
}

export function GlowOrb({
  color = '#00d4ff',
  size = 300,
  blur = 60,
  className = '',
}: {
  color?: string;
  size?: number;
  blur?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
