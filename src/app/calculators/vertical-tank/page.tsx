import { Metadata } from 'next';
import { VerticalTankCalculator } from '@/components/calculators/VerticalTankCalculator';

export const metadata: Metadata = {
  title: 'Tanque Vertical | HidrauliCalc',
  description: 'Calcula el volumen de un tanque cilíndrico vertical ingresando radio y altura.',
};

export default function VerticalTankPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <VerticalTankCalculator />
      </div>
    </main>
  );
}
