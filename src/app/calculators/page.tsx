import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import {
  Cylinder,
  RectangleHorizontal,
  ArrowUpFromLine,
  FlaskConical,
  CircleDashed,
  Triangle,
  Archive,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculadoras Hidráulicas | HidrauliCalc',
  description: 'Selecciona una calculadora hidráulica para realizar cálculos de volumen y flujo.',
};

const calculators = [
  {
    id: 'cylindrical',
    name: 'Embalse Cilíndrico',
    description: 'Calcula el volumen de un embalse o tanque cilíndrico',
    icon: Cylinder,
    formula: 'V = π × r² × h',
    status: 'available' as const,
  },
  {
    id: 'rectangular',
    name: 'Canal Rectangular',
    description: 'Calcula el volumen de un canal de sección rectangular',
    icon: RectangleHorizontal,
    formula: 'V = l × w × h',
    status: 'available' as const,
  },
  {
    id: 'vertical-tank',
    name: 'Tanque Vertical',
    description: 'Calcula el volumen de un tanque cilíndrico vertical',
    icon: ArrowUpFromLine,
    formula: 'V = π × r² × h',
    status: 'available' as const,
  },
  {
    id: 'trapezoidal',
    name: 'Canal Trapecial',
    description: 'Calcula el volumen de un canal con sección trapezoidal',
    icon: FlaskConical,
    formula: 'V = ((b + B) / 2) × h × L',
    status: 'available' as const,
  },
  {
    id: 'partial-pipe',
    name: 'Tubo Parcial',
    description: 'Calcula el volumen de líquido en un tubo parcialmente lleno',
    icon: CircleDashed,
    formula: 'V = L × (r² × acos((r-h)/r) - (r-h) × √(2rh - h²))',
    status: 'available' as const,
  },
  {
    id: 'triangular-weir',
    name: 'Vertedero Triangular',
    description: 'Calcula el caudal a través de un vertedero triangular',
    icon: Triangle,
    formula: 'Q = (8/15) × C × √(2g) × tan(θ/2) × h^(5/2)',
    status: 'available' as const,
  },
  {
    id: 'inspection-well',
    name: 'Pozo de Inspección',
    description: 'Calcula el volumen de un pozo de inspección cilíndrico',
    icon: Archive,
    formula: 'V = π × r² × h',
    status: 'available' as const,
  },
];

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#00d4ff] mb-4">Calculadoras Hidráulicas</h1>
          <p className="text-[#f5f5f5]/70 text-lg">Selecciona una calculadora para comenzar</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link key={calc.id} href={`/calculators/${calc.id}`} className="block">
                <Card variant="glass" hover glow className="h-full cursor-pointer">
                  <CardContent className="flex flex-col items-center text-center p-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#f5f5f5] mb-2">{calc.name}</h3>
                    <p className="text-sm text-[#f5f5f5]/60 mb-4">{calc.description}</p>
                    <p className="text-xs font-mono text-[#00d4ff]/70 bg-[#0a0a0a] px-3 py-1 rounded-lg">
                      {calc.formula}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
