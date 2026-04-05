'use client';

import { useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { InputField } from '@/types/calculations';

export interface CalculatorField extends InputField {
  value: number;
  error?: string | undefined;
}

export interface CalculatorLayoutProps {
  title: string;
  description: string;
  formula: string;
  fields: CalculatorField[];
  onFieldChange: (name: string, value: number) => void;
  onCalculate: () => void;
  onReset: () => void;
  results?: React.ReactNode;
  isCalculating?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function CalculatorLayout({
  title,
  description,
  formula,
  fields,
  onFieldChange,
  onCalculate,
  onReset,
  results,
  isCalculating = false,
  icon,
  className,
}: CalculatorLayoutProps) {
  const handleInputChange = useCallback(
    (name: string, rawValue: string) => {
      const value = rawValue === '' ? 0 : parseFloat(rawValue);
      if (!Number.isNaN(value)) {
        onFieldChange(name, value);
      }
    },
    [onFieldChange]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onCalculate();
    },
    [onCalculate]
  );

  return (
    <Card variant="glass" className={cn('max-w-2xl mx-auto', className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff]">
              {icon}
            </div>
          )}
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-[#f5f5f5]/60 mt-1">{description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <Input
                key={field.name}
                label={`${field.label} (${field.unit})`}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step}
                placeholder={field.placeholder}
                value={field.value || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                error={field.error || undefined}
                required={field.required}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="primary" isLoading={isCalculating} className="flex-1">
              Calcular
            </Button>
            <Button type="button" variant="secondary" onClick={onReset}>
              Limpiar
            </Button>
          </div>
        </form>

        {results && <div className="mt-6 pt-6 border-t border-[#f5f5f5]/10">{results}</div>}

        <div className="mt-6 pt-4 border-t border-[#f5f5f5]/10">
          <p className="text-xs text-[#f5f5f5]/50">
            <span className="text-[#00d4ff]">Fórmula:</span> {formula}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
