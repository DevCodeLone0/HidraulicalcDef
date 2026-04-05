import { Metadata } from 'next';
import { TrapezoidalChannelCalculator } from '@/components/calculators/TrapezoidalChannelCalculator';

export const metadata: Metadata = {
  title: 'Canal Trapecial | HidrauliCalc',
  description: 'Calcula el volumen de un canal con sección trapezoidal.',
};

export default function TrapezoidalChannelPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <TrapezoidalChannelCalculator />
      </div>
    </main>
  );
}
