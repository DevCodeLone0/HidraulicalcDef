'use client';

import { useEffect, useRef, useCallback } from 'react';
import functionPlot from 'function-plot';

export interface FunctionPlotProps {
  expression: string;
  xDomain?: [number, number];
  yDomain?: [number, number];
  showGrid?: boolean;
  area?:
    | {
        lowerBound: number;
        upperBound: number;
      }
    | undefined;
}

export function FunctionPlot({
  expression,
  xDomain = [-10, 10],
  yDomain = [-10, 10],
  showGrid = true,
  area,
}: FunctionPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<ReturnType<typeof functionPlot> | null>(null);

  const renderPlot = useCallback(() => {
    if (!containerRef.current || !expression) return;

    try {
      const functions: Array<{
        fn: string;
        color?: string;
        derivative?: { fn: string; color?: string };
      }> = [
        {
          fn: expression,
          color: '#00d4ff',
        },
      ];

      if (area) {
        functions.push({
          fn: expression,
          color: '#00d4ff',
          derivative: {
            fn: expression,
            color: 'rgba(0, 212, 255, 0.3)',
          },
        } as unknown as (typeof functions)[0]);
      }

      plotRef.current = functionPlot({
        target: containerRef.current,
        width: containerRef.current.clientWidth,
        height: 500,
        xAxis: {
          domain: xDomain,
          label: 'x',
        },
        yAxis: {
          domain: yDomain,
          label: 'y',
        },
        grid: showGrid,
        data: functions,
        disableZoom: false,
      });
    } catch (error) {
      console.error('Error rendering plot:', error);
    }
  }, [expression, xDomain, yDomain, showGrid, area]);

  useEffect(() => {
    renderPlot();

    const handleResize = () => {
      renderPlot();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [renderPlot]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#0a0a0a] rounded-xl border border-[#f5f5f5]/10 overflow-hidden"
    />
  );
}
