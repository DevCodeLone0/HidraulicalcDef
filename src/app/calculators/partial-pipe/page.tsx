import { Metadata } from 'next';
import { PartialPipeCalculator } from '@/components/calculators/PartialPipeCalculator';

export const metadata: Metadata = {
  title: 'Tubo Parcial | HidrauliCalc',
  description: 'Calcula el volumen de líquido en un tubo horizontal parcialmente lleno.',
};

export default function PartialPipePage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <PartialPipeCalculator />
      </div>
    </main>
  );
}
