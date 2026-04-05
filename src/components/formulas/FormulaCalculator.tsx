'use client';

import { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  validateFormula,
  evaluateFormula,
  extractVariableInfo,
} from '@/lib/validators/formulaValidator';
import { Calculator, Play, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import type { CustomFormula } from '@/types/formulas';

interface FormulaCalculatorProps {
  formula: CustomFormula;
  onBack?: () => void;
}

export function FormulaCalculator({ formula, onBack }: FormulaCalculatorProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    formula.variables.forEach((v) => {
      initial[v.name] = v.defaultValue.toString();
    });
    return initial;
  });
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validation = validateFormula(formula.expression);

  const handleValueChange = (varName: string, value: string) => {
    setValues((prev) => ({ ...prev, [varName]: value }));
    setResult(null);
    setError(null);
  };

  const handleCalculate = useCallback(() => {
    const numericValues: Record<string, number> = {};

    for (const [key, value] of Object.entries(values)) {
      const num = parseFloat(value);
      if (isNaN(num)) {
        setError(`Valor inválido para ${key}`);
        return;
      }
      numericValues[key] = num;
    }

    const evalResult = evaluateFormula(formula.expression, numericValues);

    if (evalResult === null) {
      setError('Error al evaluar la fórmula');
      setResult(null);
    } else {
      setResult(evalResult);
      setError(null);
    }
  }, [formula.expression, values]);

  const handleReset = useCallback(() => {
    const initial: Record<string, string> = {};
    formula.variables.forEach((v) => {
      initial[v.name] = v.defaultValue.toString();
    });
    setValues(initial);
    setResult(null);
    setError(null);
  }, [formula.variables]);

  return (
    <Card variant="glass-strong" className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          {formula.name}
        </CardTitle>
        <p className="text-sm text-[#f5f5f5]/60 font-mono mt-1">{formula.expression}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {formula.description && (
            <p className="text-sm text-[#f5f5f5]/50">{formula.description}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formula.variables.map((variable) => {
              const info = extractVariableInfo(variable.name);
              return (
                <Input
                  key={variable.name}
                  label={`${variable.label || info.label} (${variable.unit || info.unit})`}
                  type="number"
                  value={values[variable.name] || ''}
                  onChange={(e) => handleValueChange(variable.name, e.target.value)}
                  placeholder={variable.defaultValue.toString()}
                  hint={`Min: ${variable.min} | Max: ${variable.max}`}
                />
              );
            })}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#ff4444]/10 border border-[#ff4444]/30">
              <XCircle className="w-5 h-5 text-[#ff4444]" />
              <p className="text-sm text-[#ff4444]">{error}</p>
            </div>
          )}

          {result !== null && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30">
              <CheckCircle2 className="w-6 h-6 text-[#00d4ff]" />
              <div>
                <p className="text-sm text-[#00d4ff]/80">Resultado</p>
                <p className="text-2xl font-bold text-[#00d4ff] font-mono">{result.toFixed(4)}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          onClick={handleCalculate}
          disabled={!validation.valid}
          variant="primary"
          className="flex-1"
        >
          <Play className="w-4 h-4" />
          Calcular
        </Button>
        <Button onClick={handleReset} variant="secondary">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        {onBack && (
          <Button onClick={onBack} variant="ghost">
            Volver
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
