'use client';

import { useState, useCallback } from 'react';
import { Archive } from 'lucide-react';
import { CalculatorLayout } from './CalculatorLayout';
import { ResultRow, ResultsGroup } from './ResultRow';
import { calculateCylindricalVolume } from '@/lib/calculations/hydraulic';
import { m3ToLiters, formatNumber } from '@/lib/utils';
import type { CalculatorField } from './CalculatorLayout';

const initialFields: CalculatorField[] = [
  {
    name: 'diameter',
    label: 'Diámetro',
    unit: 'm',
    min: 0.5,
    max: 5,
    step: 0.01,
    placeholder: 'Ej: 1.2',
    required: true,
    value: 0,
  },
  {
    name: 'depth',
    label: 'Profundidad total',
    unit: 'm',
    min: 0.5,
    max: 20,
    step: 0.01,
    placeholder: 'Ej: 3',
    required: true,
    value: 0,
  },
  {
    name: 'waterLevel',
    label: 'Nivel de agua',
    unit: 'm',
    min: 0.01,
    max: 20,
    step: 0.01,
    placeholder: 'Ej: 1.5',
    required: true,
    value: 0,
  },
];

export function InspectionWellCalculator() {
  const [fields, setFields] = useState<CalculatorField[]>(initialFields);
  const [results, setResults] = useState<{
    volumeM3: number | null;
    volumeLiters: number | null;
    fillPercentage: number | null;
  } | null>(null);

  const handleFieldChange = useCallback((name: string, value: number) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.name === name) {
          const depth =
            name === 'depth' ? value : (prev.find((p) => p.name === 'depth')?.value ?? 0);
          const currentWaterLevel =
            name === 'waterLevel' ? value : (prev.find((p) => p.name === 'waterLevel')?.value ?? 0);
          let error: string | undefined;

          if (value <= 0 && value !== 0) {
            error = 'El valor debe ser mayor a 0';
          } else if (name === 'waterLevel' && currentWaterLevel > depth) {
            error = 'El nivel no puede superar la profundidad';
          }

          return { ...f, value, error };
        }
        return f;
      })
    );
    setResults(null);
  }, []);

  const handleCalculate = useCallback(() => {
    const diameter = fields.find((f) => f.name === 'diameter')?.value ?? 0;
    const depth = fields.find((f) => f.name === 'depth')?.value ?? 0;
    const waterLevel = fields.find((f) => f.name === 'waterLevel')?.value ?? 0;

    if (diameter <= 0 || depth <= 0 || waterLevel <= 0) {
      setFields((prev) =>
        prev.map((f) => ({
          ...f,
          error: f.value <= 0 ? 'El valor debe ser mayor a 0' : undefined,
        }))
      );
      return;
    }

    if (waterLevel > depth) {
      setFields((prev) =>
        prev.map((f) =>
          f.name === 'waterLevel' ? { ...f, error: 'El nivel no puede superar la profundidad' } : f
        )
      );
      return;
    }

    const radius = diameter / 2;
    const result = calculateCylindricalVolume(radius, waterLevel);

    if (Number.isNaN(result.value)) {
      return;
    }

    const fillPercentage = (waterLevel / depth) * 100;

    setResults({
      volumeM3: result.value,
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
      title="Pozo de Inspección"
      description="Calcula el volumen de agua en un pozo de inspección cilíndrico"
      formula="V = π × r² × h"
      fields={fields}
      onFieldChange={handleFieldChange}
      onCalculate={handleCalculate}
      onReset={handleReset}
      icon={<Archive className="w-6 h-6" />}
      results={
        results && (
          <ResultsGroup title="Resultados">
            <ResultRow
              label="Volumen"
              value={formatNumber(results.volumeM3 ?? 0)}
              unit="m³"
              highlight
            />
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
