/**
 * Types for custom formulas
 */

export interface CustomFormula {
  id: string;
  name: string;
  expression: string;
  variables: FormulaVariable[];
  description: string;
  category: FormulaCategory;
  createdAt: number;
  updatedAt: number;
}

export interface FormulaVariable {
  name: string;
  label: string;
  unit: string;
  defaultValue: number;
  min: number;
  max: number;
}

export type FormulaCategory =
  | 'volume'
  | 'flow'
  | 'pressure'
  | 'velocity'
  | 'area'
  | 'custom';

export interface FormulaValidationResult {
  valid: boolean;
  errors: FormulaError[];
  variables: string[];
}

export interface FormulaError {
  message: string;
  position?: number;
  type: 'syntax' | 'undefined-variable' | 'invalid-function' | 'general';
}

export interface FormulaTemplate {
  id: string;
  name: string;
  expression: string;
  variables: FormulaVariable[];
  description: string;
  category: FormulaCategory;
}
