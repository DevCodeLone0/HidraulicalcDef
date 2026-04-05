'use client';

import { useState, useCallback } from 'react';
import { Triangle } from 'lucide-react';
import { CalculatorLayout } from './CalculatorLayout';
import { ResultRow, ResultsGroup } from './ResultRow';
import { calculateTriangularWeirFlow } from '@/lib/calculations/hydraulic';
import { formatNumber } from '@/lib/utils';
import type { CalculatorField } from './CalculatorLayout';

const initialFields: CalculatorField[] = [
  {
    name: 'angle',
    label: 'Ángulo (θ)',
    unit: '°',
    min: 1,
    max: 179,
    step: 1,
    placeholder: 'Ej: 90',
    required: true,
    value: 0,
  },
  {
    name: 'height',
    label: 'Altura de carga',
    unit: 'm',
    min: 0.01,
    max: 10,
    step: 0.01,
    placeholder: 'Ej: 0.5',
    required: true,
    value: 0,
  },
  {
    name: 'coefficient',
    label: 'Coeficiente (C)',
    unit: '',
    min: 0.1,
    max: 1.5,
    step: 0.01,
    placeholder: 'Ej: 0.58',
    required: false,
    value: 0.58,
  },
];

export function TriangularWeirCalculator() {
  const [fields, setFields] = useState<CalculatorField[]>(initialFields);
  const [results, setResults] = useState<{
    flowRateM3s: number | null;
    flowRateLs: number | null;
    flowRateM3h: number | null;
  } | null>(null);

  const handleFieldChange = useCallback((name: string, value: number) => {
    setFields((prev) =>
      prev.map((f) =>
        f.name === name
          ? {
              ...f,
              value,
              error:
                value <= 0 && value !== 0 && name !== 'coefficient'
                  ? 'El valor debe ser mayor a 0'
                  : undefined,
            }
          : f
      )
    );
    setResults(null);
  }, []);

  const handleCalculate = useCallback(() => {
    const angle = fields.find((f) => f.name === 'angle')?.value ?? 0;
    const height = fields.find((f) => f.name === 'height')?.value ?? 0;
    const coefficient = fields.find((f) => f.name === 'coefficient')?.value ?? 0.58;

    if (angle <= 0 || angle >= 180 || height <= 0) {
      setFields((prev) =>
        prev.map((f) => ({
          ...f,
          error:
            f.value <= 0 && f.name !== 'coefficient'
              ? 'El valor debe ser mayor a 0'
              : f.name === 'angle' && f.value >= 180
                ? 'El ángulo debe ser menor a 180°'
                : undefined,
        }))
      );
      return;
    }

    const result = calculateTriangularWeirFlow(angle, height, coefficient);

    if (Number.isNaN(result.value)) {
      return;
    }

    const flowRateLs = result.value * 1000;
    const flowRateM3h = result.value * 3600;

    setResults({
      flowRateM3s: result.value,
      flowRateLs,
      flowRateM3h,
    });
  }, [fields]);

  const handleReset = useCallback(() => {
    setFields(
      initialFields.map((f) => ({
        ...f,
        value: f.name === 'coefficient' ? 0.58 : 0,
        error: undefined,
      }))
    );
    setResults(null);
  }, []);

  return (
    <CalculatorLayout
      title="Vertedero Triangular"
      description="Calcula el caudal a través de un vertedero triangular (V-notch)"
      formula="Q = (8/15) × C × √(2g) × tan(θ/2) × h^(5/2)"
      fields={fields}
      onFieldChange={handleFieldChange}
      onCalculate={handleCalculate}
      onReset={handleReset}
      icon={<Triangle className="w-6 h-6" />}
      results={
        results && (
          <ResultsGroup title="Resultados">
            <ResultRow
              label="Caudal"
              value={formatNumber(results.flowRateM3s ?? 0, 4)}
              unit="m³/s"
              highlight
            />
            <ResultRow label="Caudal" value={formatNumber(results.flowRateLs ?? 0, 2)} unit="L/s" />
            <ResultRow
              label="Caudal"
              value={formatNumber(results.flowRateM3h ?? 0, 2)}
              unit="m³/h"
            />
          </ResultsGroup>
        )
      }
    />
  );
}
