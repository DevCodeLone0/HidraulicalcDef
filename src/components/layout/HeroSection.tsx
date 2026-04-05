'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calculator, TrendingUp, FileCode, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCounter } from '@/hooks';

const features = [
  {
    icon: Calculator,
    title: 'Calculadoras',
    description: '7 tipos de cálculos hidráulicos con validación en tiempo real',
    href: '/calculators',
    color: '#00d4ff',
  },
  {
    icon: TrendingUp,
    title: 'Graficador',
    description: 'Visualiza funciones e integrales con zoom y paneo interactivo',
    href: '/graphing',
    color: '#00f0ff',
  },
  {
    icon: FileCode,
    title: 'Fórmulas Custom',
    description: 'Crea y guarda tus propias fórmulas con sintaxis mathjs',
    href: '/formulas',
    color: '#00a8cc',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function HeroSection() {
  // Animated counter for hero number
  const { count: versionNumber } = useCounter({
    start: 0,
    end: 3,
    duration: 1500,
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-5xl mx-auto"
      >
        {/* Hero Title */}
        <motion.div variants={itemVariants} className="mb-2">
          <h1 className="hero-title gradient-text">HIDRAULICALC</h1>
        </motion.div>

        {/* Version Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8">
          <motion.span
            className="text-6xl md:text-8xl font-bold text-[#00d4ff]"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {versionNumber.toFixed(0)}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="text-2xl text-[#f5f5f5]/60"
          >
            .0
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-[#f5f5f5]/80 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Calculadora hidráulica profesional con estética moderna.
          <br />
          <span className="text-[#00d4ff]">Embalses • Canales • Tanques • Integrales</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link href="/calculators">
            <Button size="lg" glow>
              Comenzar Cálculos
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="secondary" size="lg">
              Ver Características
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-16"
        >
          {[
            { value: '7+', label: 'Calculadoras' },
            { value: '∞', label: 'Fórmulas' },
            { value: '100%', label: 'Precisión' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-[#00d4ff] mb-1">{stat.value}</div>
              <div className="text-sm text-[#f5f5f5]/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="w-full max-w-5xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold text-center mb-8 text-[#f5f5f5]"
        >
          Características Principales
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={feature.href}>
                  <div className="glass-strong p-6 rounded-2xl h-full cursor-pointer group">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${feature.color}20`,
                        boxShadow: `0 0 20px ${feature.color}30`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h3
                      className="text-xl font-semibold mb-2 transition-colors"
                      style={{ color: feature.color }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#f5f5f5]/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity">
                      Explorar
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
