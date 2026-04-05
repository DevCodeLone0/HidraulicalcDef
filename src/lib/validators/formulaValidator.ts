import { create, all, SymbolNode, FunctionNode } from 'mathjs';
import type { FormulaValidationResult, FormulaError } from '@/types/formulas';

// @ts-expect-error mathjs types are complex
const math = create(all);

const ALLOWED_FUNCTIONS = [
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'sinh',
  'cosh',
  'tanh',
  'sqrt',
  'cbrt',
  'pow',
  'abs',
  'sign',
  'log',
  'log10',
  'log2',
  'ln',
  'exp',
  'ceil',
  'floor',
  'round',
  'pi',
  'e',
];

export function validateFormula(expression: string): FormulaValidationResult {
  const errors: FormulaError[] = [];
  const variables: string[] = [];

  if (!expression || expression.trim() === '') {
    return {
      valid: false,
      errors: [{ message: 'La expresión no puede estar vacía', type: 'general' }],
      variables: [],
    };
  }

  try {
    const node = math.parse(expression);

    node.traverse((childNode) => {
      if (childNode.type === 'SymbolNode') {
        const symbolNode = childNode as SymbolNode;
        const name = symbolNode.name;

        if (!ALLOWED_FUNCTIONS.includes(name) && !variables.includes(name)) {
          variables.push(name);
        }
      }

      if (childNode.type === 'FunctionNode') {
        const funcNode = childNode as FunctionNode;
        const fnName = funcNode.fn.name;

        if (!ALLOWED_FUNCTIONS.includes(fnName)) {
          errors.push({
            message: `Función no reconocida: ${fnName}`,
            type: 'invalid-function',
          });
        }
      }
    });

    const testScope: Record<string, number> = {};
    variables.forEach((v) => {
      testScope[v] = 1;
    });

    try {
      const compiled = node.compile();
      compiled.evaluate(testScope);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
      errors.push({
        message: `Error al evaluar: ${errorMessage}`,
        type: 'syntax',
      });
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Error de sintaxis';
    errors.push({
      message: `Error de sintaxis: ${errorMessage}`,
      type: 'syntax',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    variables,
  };
}

export function evaluateFormula(
  expression: string,
  variableValues: Record<string, number>
): number | null {
  try {
    const result = math.evaluate(expression, variableValues);

    if (typeof result === 'number' && isFinite(result)) {
      return result;
    }

    return null;
  } catch {
    return null;
  }
}

export function formatFormulaResult(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function suggestVariables(expression: string): string[] {
  const result = validateFormula(expression);
  return result.variables;
}

export function extractVariableInfo(name: string): { label: string; unit: string } {
  const variableInfo: Record<string, { label: string; unit: string }> = {
    r: { label: 'Radio', unit: 'm' },
    h: { label: 'Altura', unit: 'm' },
    w: { label: 'Ancho', unit: 'm' },
    l: { label: 'Longitud', unit: 'm' },
    L: { label: 'Longitud', unit: 'm' },
    d: { label: 'Diámetro', unit: 'm' },
    D: { label: 'Diámetro', unit: 'm' },
    b: { label: 'Base menor', unit: 'm' },
    B: { label: 'Base mayor', unit: 'm' },
    a: { label: 'Área', unit: 'm²' },
    A: { label: 'Área', unit: 'm²' },
    v: { label: 'Velocidad', unit: 'm/s' },
    V: { label: 'Volumen', unit: 'm³' },
    q: { label: 'Caudal', unit: 'm³/s' },
    Q: { label: 'Caudal', unit: 'm³/s' },
    p: { label: 'Presión', unit: 'Pa' },
    P: { label: 'Presión', unit: 'Pa' },
    theta: { label: 'Ángulo', unit: 'rad' },
    x: { label: 'Variable x', unit: '' },
    y: { label: 'Variable y', unit: '' },
    t: { label: 'Tiempo', unit: 's' },
    n: { label: 'Coeficiente n', unit: '' },
    m: { label: 'Pendiente', unit: '' },
  };

  return variableInfo[name] || { label: name, unit: '' };
}

export function getSyntaxHelp(): { category: string; items: string[] }[] {
  return [
    {
      category: 'Operadores',
      items: ['+ (suma)', '- (resta)', '* (multiplicación)', '/ (división)', '^ (potencia)'],
    },
    {
      category: 'Funciones matemáticas',
      items: ['sqrt(x)', 'cbrt(x)', 'abs(x)', 'pow(x, n)', 'sign(x)'],
    },
    {
      category: 'Trigonometría',
      items: ['sin(x)', 'cos(x)', 'tan(x)', 'asin(x)', 'acos(x)', 'atan(x)'],
    },
    {
      category: 'Logaritmos',
      items: ['log(x)', 'log10(x)', 'ln(x)', 'exp(x)'],
    },
    {
      category: 'Constantes',
      items: ['pi = 3.14159...', 'e = 2.71828...'],
    },
    {
      category: 'Ejemplos',
      items: [
        'pi * r^2 * h',
        '(b + B) / 2 * h * L',
        'sqrt(2 * g * h)',
        'Q = (8/15) * C * sqrt(2*g) * tan(theta/2) * h^(5/2)',
      ],
    },
  ];
}
