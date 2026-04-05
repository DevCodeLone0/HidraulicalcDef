import { Metadata } from 'next';
import { InspectionWellCalculator } from '@/components/calculators/InspectionWellCalculator';

export const metadata: Metadata = {
  title: 'Pozo de Inspección | HidrauliCalc',
  description: 'Calcula el volumen de agua en un pozo de inspección cilíndrico.',
};

export default function InspectionWellPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <InspectionWellCalculator />
      </div>
    </main>
  );
}
