import { Metadata } from 'next';
import { TriangularWeirCalculator } from '@/components/calculators/TriangularWeirCalculator';

export const metadata: Metadata = {
  title: 'Vertedero Triangular | HidrauliCalc',
  description: 'Calcula el caudal a través de un vertedero triangular (V-notch).',
};

export default function TriangularWeirPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <TriangularWeirCalculator />
      </div>
    </main>
  );
}
