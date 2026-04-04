import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  title: 'HidrauliCalc 3.0 | Cálculos Hidráulicos Profesionales',
  description:
    'Aplicación web profesional para cálculos hidráulicos: volúmenes de embalses, canales, tanques, graficador de integrales y fórmulas personalizadas.',
  keywords: [
    'hidráulica',
    'cálculos',
    'embalse',
    'canal',
    'tanque',
    'integrales',
    'ingeniería',
  ],
  authors: [{ name: 'HidrauliCalc Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='es'
      className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f5]'>
        {children}
      </body>
    </html>
  );
}
