'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  glow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-[#00d4ff] to-[#00a8cc]
    text-[#0a0a0a] font-semibold
    hover:from-[#00f0ff] hover:to-[#00d4ff]
    shadow-[0_0_20px_rgba(0,212,255,0.3)]
    hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]
  `,
  secondary: `
    glass text-[#00d4ff] font-medium
    border border-[#00d4ff]/30
    hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/50
  `,
  ghost: `
    text-[#f5f5f5]/80
    hover:text-[#f5f5f5] hover:bg-white/5
  `,
  danger: `
    bg-gradient-to-r from-[#ff4444] to-[#cc0000]
    text-white font-semibold
    hover:from-[#ff6666] hover:to-[#ff4444]
    shadow-[0_0_20px_rgba(255,68,68,0.3)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      glow = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled ?? isLoading}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'transition-all duration-300 ease-out',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
          'active:scale-[0.98]',
          variantStyles[variant],
          sizeStyles[size],
          glow && 'animate-pulse-glow',
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className='absolute inset-0 flex items-center justify-center'>
            <svg
              className='animate-spin h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
              />
            </svg>
          </span>
        )}
        <span className={cn(isLoading && 'invisible')}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
