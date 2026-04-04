/**
 * Core types for hydraulic calculations
 */

export interface CalculationResult {
  value: number;
  unit: string;
  formatted: string;
}

export interface BaseCalculatorInput {
  [key: string]: number | string;
}

export interface CylindricalReservoirInput extends BaseCalculatorInput {
  radius: number;
  height: number;
}

export interface RectangularChannelInput extends BaseCalculatorInput {
  length: number;
  width: number;
  height: number;
}

export interface VerticalTankInput extends BaseCalculatorInput {
  radius: number;
  height: number;
}

export interface TrapezoidalChannelInput extends BaseCalculatorInput {
  baseMinor: number;
  baseMajor: number;
  height: number;
  length: number;
}

export interface PartialPipeInput extends BaseCalculatorInput {
  diameter: number;
  length: number;
  liquidHeight: number;
}

export interface TriangularWeirInput extends BaseCalculatorInput {
  angle: number;
  height: number;
  coefficient: number;
}

export type CalculatorType =
  | 'cylindrical'
  | 'rectangular'
  | 'vertical-tank'
  | 'trapezoidal'
  | 'partial-pipe'
  | 'triangular-weir'
  | 'inspection-well';

export interface CalculatorConfig {
  id: CalculatorType;
  name: string;
  description: string;
  icon: string;
  inputs: InputField[];
  formula: string;
}

export interface InputField {
  name: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  placeholder: string;
  required: boolean;
}

export interface CalculationHistoryEntry {
  id: string;
  type: CalculatorType;
  inputs: Record<string, number>;
  results: Record<string, number>;
  timestamp: number;
}
