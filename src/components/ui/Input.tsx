'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type InputVariant = 'default' | 'filled' | 'ghost';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
  default: `
    bg-[#121212] border border-[#f5f5f5]/10
    focus:border-[#00d4ff]/50 focus:ring-[#00d4ff]/20
    placeholder:text-[#f5f5f5]/30
  `,
  filled: `
    bg-[#0f0f0f] border border-transparent
    focus:bg-[#121212] focus:border-[#00d4ff]/30
    placeholder:text-[#f5f5f5]/30
  `,
  ghost: `
    bg-transparent border-b border-[#f5f5f5]/20
    focus:border-[#00d4ff] rounded-none px-0
    placeholder:text-[#f5f5f5]/30
  `,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-[#f5f5f5]/80 mb-2'
          >
            {label}
          </label>
        )}
        <div className='relative'>
          {leftIcon && (
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-[#f5f5f5]/50'>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 rounded-xl',
              'text-[#f5f5f5] text-base',
              'outline-none transition-all duration-200',
              'focus:ring-2 focus:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variantStyles[variant],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[#ff4444] focus:border-[#ff4444] focus:ring-[#ff4444]/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className='absolute right-3 top-1/2 -translate-y-1/2 text-[#f5f5f5]/50'>
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className='mt-1.5 text-sm text-[#ff4444]'>{error}</p>
        )}
        {hint && !error && (
          <p className='mt-1.5 text-sm text-[#f5f5f5]/50'>{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
