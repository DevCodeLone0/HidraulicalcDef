import { Metadata } from 'next';
import { CylindricalReservoirCalculator } from '@/components/calculators/CylindricalReservoirCalculator';

export const metadata: Metadata = {
  title: 'Embalse Cilíndrico | HidrauliCalc',
  description: 'Calcula el volumen de un embalse o tanque cilíndrico ingresando radio y altura.',
};

export default function CylindricalReservoirPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <CylindricalReservoirCalculator />
      </div>
    </main>
  );
}
