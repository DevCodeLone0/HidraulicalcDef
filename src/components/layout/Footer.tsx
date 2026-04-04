'use client';

import Link from 'next/link';
import { Droplets, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Calculadoras',
    links: [
      { label: 'Embalse Cilíndrico', href: '/calculators/cylindrical' },
      { label: 'Canal Rectangular', href: '/calculators/rectangular' },
      { label: 'Tanque Vertical', href: '/calculators/vertical-tank' },
      { label: 'Canal Trapecial', href: '/calculators/trapezoidal' },
    ],
  },
  {
    title: 'Herramientas',
    links: [
      { label: 'Graficador', href: '/graphing' },
      { label: 'Fórmulas Custom', href: '/formulas' },
      { label: 'Historial', href: '/history' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Documentación', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'GitHub', href: 'https://github.com', external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className='relative mt-auto border-t border-[#f5f5f5]/10 bg-[#0a0a0a]'>
      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-[#00d4ff]/5 to-transparent pointer-events-none' />
      
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='col-span-1'>
            <Link href='/' className='flex items-center gap-2 mb-4'>
              <Droplets className='w-6 h-6 text-[#00d4ff]' />
              <span className='text-lg font-bold gradient-text'>
                HidrauliCalc
              </span>
            </Link>
            <p className='text-sm text-[#f5f5f5]/50 max-w-xs'>
              Calculadora hidráulica profesional con estética moderna.
              Diseñada para ingenieros y profesionales.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className='text-sm font-semibold text-[#00d4ff] mb-3'>
                {section.title}
              </h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-[#f5f5f5]/60 hover:text-[#f5f5f5] transition-colors'
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className='text-sm text-[#f5f5f5]/60 hover:text-[#f5f5f5] transition-colors'
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className='mt-12 pt-8 border-t border-[#f5f5f5]/10 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-[#f5f5f5]/40'>
            © {new Date().getFullYear()} HidrauliCalc. Todos los derechos reservados.
          </p>
          <div className='flex items-center gap-1 text-sm text-[#f5f5f5]/40'>
            Hecho con <Heart className='w-4 h-4 text-[#ff4444] fill-current' /> usando
            <a
              href='https://nextjs.org'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#00d4ff] hover:underline'
            >
              Next.js
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
