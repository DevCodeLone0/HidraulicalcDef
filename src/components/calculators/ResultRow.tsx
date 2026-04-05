'use client';

import { cn } from '@/lib/utils';

export interface ResultRowProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  className?: string;
}

export function ResultRow({ label, value, unit, highlight = false, className }: ResultRowProps) {
  return (
    <div
      className={cn(
        'flex justify-between items-center py-3 px-4 rounded-lg',
        'transition-all duration-200',
        highlight ? 'bg-[#00d4ff]/10 border border-[#00d4ff]/20' : 'bg-[#0a0a0a]',
        className
      )}
    >
      <span className="text-[#f5f5f5]/70 text-sm">{label}</span>
      <span
        className={cn(
          'font-mono font-semibold',
          highlight ? 'text-[#00d4ff] text-lg' : 'text-[#f5f5f5] text-base'
        )}
      >
        {value}
        {unit && <span className="text-[#f5f5f5]/50 ml-1">{unit}</span>}
      </span>
    </div>
  );
}

export interface ResultsGroupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ResultsGroup({ title, children, className }: ResultsGroupProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {title && (
        <h4 className="text-sm font-medium text-[#00d4ff] mb-3 uppercase tracking-wider">
          {title}
        </h4>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
}
