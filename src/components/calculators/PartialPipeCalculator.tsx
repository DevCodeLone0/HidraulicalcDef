'use client';

import { useState, useCallback } from 'react';
import { CircleDashed } from 'lucide-react';
import { CalculatorLayout } from './CalculatorLayout';
import { ResultRow, ResultsGroup } from './ResultRow';
import { calculatePartialPipeVolume } from '@/lib/calculations/hydraulic';
import { m3Toft3, m3ToLiters, formatNumber } from '@/lib/utils';
import type { CalculatorField } from './CalculatorLayout';

const initialFields: CalculatorField[] = [
  {
    name: 'diameter',
    label: 'Diámetro',
    unit: 'm',
    min: 0.01,
    max: 10,
    step: 0.01,
    placeholder: 'Ej: 1',
    required: true,
    value: 0,
  },
  {
    name: 'length',
    label: 'Longitud',
    unit: 'm',
    min: 0.01,
    max: 10000,
    step: 0.01,
    placeholder: 'Ej: 50',
    required: true,
    value: 0,
  },
  {
    name: 'liquidHeight',
    label: 'Altura del líquido',
    unit: 'm',
    min: 0.01,
    max: 10,
    step: 0.01,
    placeholder: 'Ej: 0.5',
    required: true,
    value: 0,
  },
];

export function PartialPipeCalculator() {
  const [fields, setFields] = useState<CalculatorField[]>(initialFields);
  const [results, setResults] = useState<{
    volumeM3: number | null;
    volumeFt3: number | null;
    volumeLiters: number | null;
    fillPercentage: number | null;
  } | null>(null);

  const handleFieldChange = useCallback((name: string, value: number) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.name === name) {
          const diameter =
            name === 'diameter' ? value : (prev.find((p) => p.name === 'diameter')?.value ?? 0);
          const currentLiquidHeight =
            name === 'liquidHeight'
              ? value
              : (prev.find((p) => p.name === 'liquidHeight')?.value ?? 0);
          const error =
            value <= 0 && value !== 0
              ? 'El valor debe ser mayor a 0'
              : name === 'liquidHeight' && currentLiquidHeight > diameter
                ? 'La altura no puede superar el diámetro'
                : undefined;
          return { ...f, value, error };
        }
        return f;
      })
    );
    setResults(null);
  }, []);

  const handleCalculate = useCallback(() => {
    const diameter = fields.find((f) => f.name === 'diameter')?.value ?? 0;
    const length = fields.find((f) => f.name === 'length')?.value ?? 0;
    const liquidHeight = fields.find((f) => f.name === 'liquidHeight')?.value ?? 0;

    if (diameter <= 0 || length <= 0 || liquidHeight <= 0) {
      setFields((prev) =>
        prev.map((f) => ({
          ...f,
          error: f.value <= 0 ? 'El valor debe ser mayor a 0' : undefined,
        }))
      );
      return;
    }

    if (liquidHeight > diameter) {
      setFields((prev) =>
        prev.map((f) =>
          f.name === 'liquidHeight' ? { ...f, error: 'La altura no puede superar el diámetro' } : f
        )
      );
      return;
    }

    const result = calculatePartialPipeVolume(diameter, length, liquidHeight);

    if (Number.isNaN(result.value)) {
      return;
    }

    const fillPercentage = (liquidHeight / diameter) * 100;

    setResults({
      volumeM3: result.value,
      volumeFt3: m3Toft3(result.value),
      volumeLiters: m3ToLiters(result.value),
      fillPercentage,
    });
  }, [fields]);

  const handleReset = useCallback(() => {
    setFields(initialFields.map((f) => ({ ...f, value: 0, error: undefined })));
    setResults(null);
  }, []);

  return (
    <CalculatorLayout
      title="Tubo Parcial"
      description="Calcula el volumen de líquido en un tubo horizontal parcialmente lleno"
      formula="V = L × (r² × acos((r-h)/r) - (r-h) × √(2rh - h²))"
      fields={fields}
      onFieldChange={handleFieldChange}
      onCalculate={handleCalculate}
      onReset={handleReset}
      icon={<CircleDashed className="w-6 h-6" />}
      results={
        results && (
          <ResultsGroup title="Resultados">
            <ResultRow
              label="Volumen"
              value={formatNumber(results.volumeM3 ?? 0)}
              unit="m³"
              highlight
            />
            <ResultRow label="Volumen" value={formatNumber(results.volumeFt3 ?? 0)} unit="ft³" />
            <ResultRow label="Volumen" value={formatNumber(results.volumeLiters ?? 0)} unit="L" />
            <ResultRow
              label="Porcentaje de llenado"
              value={formatNumber(results.fillPercentage ?? 0)}
              unit="%"
            />
          </ResultsGroup>
        )
      }
    />
  );
}
