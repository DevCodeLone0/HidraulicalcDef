import { create, all } from 'mathjs';

const math = create(all!);

export function parseFunction(expression: string): { valid: boolean; error?: string | undefined } {
  try {
    const node = math.parse(expression);
    const compiled = node.compile();
    compiled.evaluate({ x: 1 });
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Expresión inválida',
    };
  }
}

export function evaluateFunction(expression: string, x: number): number {
  try {
    const node = math.parse(expression);
    const compiled = node.compile();
    const result = compiled.evaluate({ x });
    if (typeof result === 'number' && Number.isFinite(result)) {
      return result;
    }
    return NaN;
  } catch {
    return NaN;
  }
}

export function calculateDefiniteIntegral(
  expression: string,
  lowerBound: number,
  upperBound: number,
  steps: number = 1000
): { value: number; error?: string | undefined } {
  try {
    const parseResult = parseFunction(expression);
    if (!parseResult.valid) {
      return { value: NaN, error: parseResult.error };
    }

    const h = (upperBound - lowerBound) / steps;
    let sum = 0;

    for (let i = 0; i <= steps; i++) {
      const x = lowerBound + i * h;
      const y = evaluateFunction(expression, x);
      if (!Number.isFinite(y)) {
        continue;
      }
      const weight = i === 0 || i === steps ? 1 : i % 2 === 0 ? 2 : 4;
      sum += weight * y;
    }

    const integral = (h / 3) * sum;
    return { value: integral };
  } catch (error) {
    return {
      value: NaN,
      error: error instanceof Error ? error.message : 'Error al calcular la integral',
    };
  }
}

export function generatePoints(
  expression: string,
  xMin: number,
  xMax: number,
  points: number = 500
): { x: number; y: number }[] {
  const result: { x: number; y: number }[] = [];
  const step = (xMax - xMin) / points;

  for (let i = 0; i <= points; i++) {
    const x = xMin + i * step;
    const y = evaluateFunction(expression, x);
    if (Number.isFinite(y)) {
      result.push({ x, y });
    }
  }

  return result;
}

export function generateAreaPoints(
  expression: string,
  lowerBound: number,
  upperBound: number,
  points: number = 100
): { x: number; y: number }[] {
  const result: { x: number; y: number }[] = [];
  const step = (upperBound - lowerBound) / points;

  for (let i = 0; i <= points; i++) {
    const x = lowerBound + i * step;
    const y = evaluateFunction(expression, x);
    if (Number.isFinite(y)) {
      result.push({ x, y: Math.max(0, y) });
    }
  }

  return result;
}

export const PREDEFINED_FUNCTIONS = [
  { label: 'x²', expression: 'x^2' },
  { label: 'x³', expression: 'x^3' },
  { label: 'sin(x)', expression: 'sin(x)' },
  { label: 'cos(x)', expression: 'cos(x)' },
  { label: 'exp(x)', expression: 'exp(x)' },
  { label: 'ln(x)', expression: 'log(x)' },
  { label: '√x', expression: 'sqrt(x)' },
  { label: '1/x', expression: '1/x' },
  { label: 'x² + 2x - 1', expression: 'x^2 + 2*x - 1' },
  { label: 'sin(x) * cos(x)', expression: 'sin(x) * cos(x)' },
];
