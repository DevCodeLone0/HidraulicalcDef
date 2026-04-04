/**
 * Hydraulic calculation functions
 * Core formulas for volume and flow calculations
 */

import { formatNumber, isPositiveNumber } from '../utils';
import type { CalculationResult } from '@/types/calculations';

const PI = Math.PI;

/**
 * Calculate volume of a cylindrical reservoir
 * Formula: V = π × r² × h
 */
export function calculateCylindricalVolume(
  radius: number,
  height: number
): CalculationResult {
  if (!isPositiveNumber(radius) || !isPositiveNumber(height)) {
    return { value: NaN, unit: 'm³', formatted: '---' };
  }

  const volume = PI * Math.pow(radius, 2) * height;

  return {
    value: volume,
    unit: 'm³',
    formatted: formatNumber(volume),
  };
}

/**
 * Calculate volume of a rectangular channel
 * Formula: V = l × w × h
 */
export function calculateRectangularVolume(
  length: number,
  width: number,
  height: number
): CalculationResult {
  if (!isPositiveNumber(length) || !isPositiveNumber(width) || !isPositiveNumber(height)) {
    return { value: NaN, unit: 'm³', formatted: '---' };
  }

  const volume = length * width * height;

  return {
    value: volume,
    unit: 'm³',
    formatted: formatNumber(volume),
  };
}

/**
 * Calculate volume of a vertical cylindrical tank
 * Formula: V = π × r² × h (same as cylindrical)
 */
export function calculateVerticalTankVolume(
  radius: number,
  height: number
): CalculationResult {
  return calculateCylindricalVolume(radius, height);
}

/**
 * Calculate volume of a trapezoidal channel
 * Formula: V = ((b + B) / 2) × h × L
 */
export function calculateTrapezoidalVolume(
  baseMinor: number,
  baseMajor: number,
  height: number,
  length: number
): CalculationResult {
  if (
    !isPositiveNumber(baseMinor) ||
    !isPositiveNumber(baseMajor) ||
    !isPositiveNumber(height) ||
    !isPositiveNumber(length)
  ) {
    return { value: NaN, unit: 'm³', formatted: '---' };
  }

  const volume = ((baseMinor + baseMajor) / 2) * height * length;

  return {
    value: volume,
    unit: 'm³',
    formatted: formatNumber(volume),
  };
}

/**
 * Calculate volume of liquid in a partially filled horizontal pipe
 * Formula: V = L × (r² × acos((r-h)/r) - (r-h) × √(2rh - h²))
 */
export function calculatePartialPipeVolume(
  diameter: number,
  length: number,
  liquidHeight: number
): CalculationResult {
  if (
    !isPositiveNumber(diameter) ||
    !isPositiveNumber(length) ||
    liquidHeight <= 0 ||
    liquidHeight > diameter
  ) {
    return { value: NaN, unit: 'm³', formatted: '---' };
  }

  const radius = diameter / 2;
  const r = radius;
  const h = liquidHeight;

  // Area of circular segment
  const segmentArea = Math.pow(r, 2) * Math.acos((r - h) / r) - (r - h) * Math.sqrt(2 * r * h - Math.pow(h, 2));
  const volume = length * segmentArea;

  return {
    value: volume,
    unit: 'm³',
    formatted: formatNumber(volume),
  };
}

/**
 * Calculate flow rate through a triangular weir
 * Formula: Q = (8/15) × C × √(2g) × tan(θ/2) × h^(5/2)
 */
export function calculateTriangularWeirFlow(
  angle: number,
  height: number,
  coefficient: number = 0.58
): CalculationResult {
  if (
    !isPositiveNumber(angle) ||
    angle <= 0 ||
    angle >= 180 ||
    !isPositiveNumber(height) ||
    coefficient <= 0
  ) {
    return { value: NaN, unit: 'm³/s', formatted: '---' };
  }

  const g = 9.81; // gravitational acceleration
  const thetaRad = (angle * PI) / 180;

  const flowRate = (8 / 15) * coefficient * Math.sqrt(2 * g) * Math.tan(thetaRad / 2) * Math.pow(height, 2.5);

  return {
    value: flowRate,
    unit: 'm³/s',
    formatted: formatNumber(flowRate, 4),
  };
}

/**
 * Calculate cross-sectional area of a circle
 * Formula: A = π × r²
 */
export function calculateCircleArea(radius: number): CalculationResult {
  if (!isPositiveNumber(radius)) {
    return { value: NaN, unit: 'm²', formatted: '---' };
  }

  const area = PI * Math.pow(radius, 2);

  return {
    value: area,
    unit: 'm²',
    formatted: formatNumber(area),
  };
}
