'use client';

import { useState, useCallback } from 'react';
import { Cylinder } from 'lucide-react';
import { CalculatorLayout } from './CalculatorLayout';
import { ResultRow, ResultsGroup } from './ResultRow';
import { calculateCylindricalVolume } from '@/lib/calculations/hydraulic';
import { m3Toft3, m3ToLiters, formatNumber } from '@/lib/utils';
import type { CalculatorField } from './CalculatorLayout';

const initialFields: CalculatorField[] = [
  {
    name: 'radius',
    label: 'Radio',
    unit: 'm',
    min: 0.01,
    max: 1000,
    step: 0.01,
    placeholder: 'Ej: 5',
    required: true,
    value: 0,
  },
  {
    name: 'height',
    label: 'Altura',
    unit: 'm',
    min: 0.01,
    max: 1000,
    step: 0.01,
    placeholder: 'Ej: 10',
    required: true,
    value: 0,
  },
];

export function CylindricalReservoirCalculator() {
  const [fields, setFields] = useState<CalculatorField[]>(initialFields);
  const [results, setResults] = useState<{
    volumeM3: number | null;
    volumeFt3: number | null;
    volumeLiters: number | null;
  } | null>(null);

  const handleFieldChange = useCallback((name: string, value: number) => {
    setFields((prev) =>
      prev.map((f) =>
        f.name === name
          ? {
              ...f,
              value,
              error: value <= 0 && value !== 0 ? 'El valor debe ser mayor a 0' : undefined,
            }
          : f
      )
    );
    setResults(null);
  }, []);

  const handleCalculate = useCallback(() => {
    const radius = fields.find((f) => f.name === 'radius')?.value ?? 0;
    const height = fields.find((f) => f.name === 'height')?.value ?? 0;

    if (radius <= 0 || height <= 0) {
      setFields((prev) =>
        prev.map((f) => ({
          ...f,
          error: f.value <= 0 ? 'El valor debe ser mayor a 0' : undefined,
        }))
      );
      return;
    }

    const result = calculateCylindricalVolume(radius, height);

    if (Number.isNaN(result.value)) {
      return;
    }

    setResults({
      volumeM3: result.value,
      volumeFt3: m3Toft3(result.value),
      volumeLiters: m3ToLiters(result.value),
    });
  }, [fields]);

  const handleReset = useCallback(() => {
    setFields(initialFields.map((f) => ({ ...f, value: 0, error: undefined })));
    setResults(null);
  }, []);

  return (
    <CalculatorLayout
      title="Embalse Cilíndrico"
      description="Calcula el volumen de un embalse o tanque cilíndrico"
      formula="V = π × r² × h"
      fields={fields}
      onFieldChange={handleFieldChange}
      onCalculate={handleCalculate}
      onReset={handleReset}
      icon={<Cylinder className="w-6 h-6" />}
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
          </ResultsGroup>
        )
      }
    />
  );
}
