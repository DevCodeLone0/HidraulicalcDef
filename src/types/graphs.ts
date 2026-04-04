/**
 * Types for graphing and integral calculations
 */

export interface GraphConfig {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  grid: boolean;
  showAxes: boolean;
}

export interface FunctionInput {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}

export interface IntegralConfig {
  functionId: string;
  lowerBound: number;
  upperBound: number;
  showArea: boolean;
  fillColor: string;
}

export interface GraphPoint {
  x: number;
  y: number;
}

export interface GraphState {
  functions: FunctionInput[];
  integrals: IntegralConfig[];
  viewport: GraphConfig;
  zoom: number;
  panX: number;
  panY: number;
}

export interface PlotBounds {
  x: { min: number; max: number };
  y: { min: number; max: number };
}
