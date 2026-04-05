import { Metadata } from 'next';
import { IntegralGraphingCalculator } from '@/components/graphing/IntegralGraphingCalculator';

export const metadata: Metadata = {
  title: 'Graficador de Integrales | HidrauliCalc',
  description:
    'Visualiza funciones matemáticas y calcula integrales definidas con zoom y paneo interactivo.',
};

export default function GraphingPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <IntegralGraphingCalculator />
      </div>
    </main>
  );
}
