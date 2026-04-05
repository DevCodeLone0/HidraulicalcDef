'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FunctionPlot } from './FunctionPlot';
import {
  parseFunction,
  calculateDefiniteIntegral,
  PREDEFINED_FUNCTIONS,
} from '@/lib/graphing/integral';
import { formatNumber } from '@/lib/utils';
import { TrendingUp, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

export function IntegralGraphingCalculator() {
  const [expression, setExpression] = useState('x^2');
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(2);
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [showGrid, setShowGrid] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [result, setResult] = useState<{ value: number; expression: string } | null>(null);

  const validationResult = useMemo(() => {
    if (!expression) return { valid: false, error: 'Ingresa una función' };
    return parseFunction(expression);
  }, [expression]);

  const handleCalculate = useCallback(() => {
    if (!validationResult.valid) {
      setError(validationResult.error);
      return;
    }

    const integralResult = calculateDefiniteIntegral(expression, lowerBound, upperBound);

    if (integralResult.error) {
      setError(integralResult.error);
      return;
    }

    setResult({
      value: integralResult.value,
      expression: `∫(${expression})dx from ${lowerBound} to ${upperBound}`,
    });
    setError(undefined);
  }, [expression, lowerBound, upperBound, validationResult]);

  const handleReset = useCallback(() => {
    setExpression('x^2');
    setLowerBound(0);
    setUpperBound(2);
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
    setShowGrid(true);
    setError(undefined);
    setResult(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    const xRange = (xMax - xMin) / 4;
    const yRange = (yMax - yMin) / 4;
    setXMin((prev) => prev + xRange);
    setXMax((prev) => prev - xRange);
    setYMin((prev) => prev + yRange);
    setYMax((prev) => prev - yRange);
  }, [xMin, xMax, yMin, yMax]);

  const handleZoomOut = useCallback(() => {
    const xRange = (xMax - xMin) / 2;
    const yRange = (yMax - yMin) / 2;
    setXMin((prev) => prev - xRange);
    setXMax((prev) => prev + xRange);
    setYMin((prev) => prev - yRange);
    setYMax((prev) => prev + yRange);
  }, [xMin, xMax, yMin, yMax]);

  return (
    <div className="space-y-6">
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <CardTitle>Graficador de Integrales</CardTitle>
              <p className="text-sm text-[#f5f5f5]/60 mt-1">
                Visualiza funciones y calcula integrales definidas
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                label="Función f(x)"
                value={expression}
                onChange={(e) => {
                  setExpression(e.target.value);
                  setError(undefined);
                }}
                error={
                  error ||
                  (!validationResult.valid && expression ? validationResult.error : undefined)
                }
                placeholder="Ej: x^2, sin(x), e^x"
                hint="Usa sintaxis mathjs: ^ para potencia, sin(), cos(), sqrt(), etc."
              />
            </div>

            <Input
              label="Límite inferior (a)"
              type="number"
              value={lowerBound}
              onChange={(e) => setLowerBound(parseFloat(e.target.value) || 0)}
            />

            <Input
              label="Límite superior (b)"
              type="number"
              value={upperBound}
              onChange={(e) => setUpperBound(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-[#f5f5f5]/60">Ejemplos:</span>
            {PREDEFINED_FUNCTIONS.slice(0, 6).map((fn) => (
              <button
                key={fn.expression}
                onClick={() => {
                  setExpression(fn.expression);
                  setError(undefined);
                }}
                className="px-3 py-1 text-sm bg-[#0a0a0a] border border-[#00d4ff]/30 rounded-lg text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors"
              >
                {fn.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="primary" onClick={handleCalculate} disabled={!validationResult.valid}>
              Calcular Integral
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {validationResult.valid && (
        <Card variant="glass">
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#00d4ff]">Gráfica</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  className={showGrid ? 'text-[#00d4ff]' : ''}
                >
                  Grid
                </Button>
              </div>
            </div>

            <FunctionPlot
              expression={expression}
              xDomain={[xMin, xMax]}
              yDomain={[yMin, yMax]}
              showGrid={showGrid}
              area={result ? { lowerBound, upperBound } : undefined}
            />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card variant="gradient">
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-[#f5f5f5]/60 mb-2">Resultado de la integral</p>
              <p className="text-lg font-mono text-[#f5f5f5]/80 mb-4">{result.expression}</p>
              <p className="text-4xl font-bold text-[#00d4ff]">{formatNumber(result.value, 4)}</p>
              <p className="text-sm text-[#f5f5f5]/50 mt-2">unidades cuadradas</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
