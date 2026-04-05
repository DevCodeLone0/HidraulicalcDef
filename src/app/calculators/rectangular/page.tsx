import { Metadata } from 'next';
import { RectangularChannelCalculator } from '@/components/calculators/RectangularChannelCalculator';

export const metadata: Metadata = {
  title: 'Canal Rectangular | HidrauliCalc',
  description:
    'Calcula el volumen de un canal de sección rectangular ingresando longitud, ancho y altura.',
};

export default function RectangularChannelPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RectangularChannelCalculator />
      </div>
    </main>
  );
}
