'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'default' | 'glass' | 'glass-strong' | 'gradient';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  glow?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[#121212] border border-[#f5f5f5]/10',
  glass: 'glass',
  'glass-strong': 'glass-strong',
  gradient: `
    bg-gradient-to-br from-[#00d4ff]/10 via-transparent to-[#00a8cc]/5
    border border-[#00d4ff]/20
  `,
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'glass',
      hover = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-6',
          'transition-all duration-300',
          variantStyles[variant],
          hover && 'hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
          glow && 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 pb-4 border-b border-[#f5f5f5]/10', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold text-[#00d4ff]', className)}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-[#f5f5f5]/80', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-[#f5f5f5]/10', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';
