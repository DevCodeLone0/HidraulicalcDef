'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  FileCode, 
  Menu, 
  X,
  Droplets
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const navItems = [
  { href: '/calculators', label: 'Calculadoras', icon: Calculator },
  { href: '/graphing', label: 'Graficador', icon: TrendingUp },
  { href: '/formulas', label: 'Fórmulas', icon: FileCode },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='fixed top-0 left-0 right-0 z-50 glass-strong'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2 group'>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Droplets className='w-8 h-8 text-[#00d4ff]' />
            </motion.div>
            <span className='text-xl font-bold gradient-text'>
              HidrauliCalc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-1'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg',
                    'text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-[#00d4ff] bg-[#00d4ff]/10'
                      : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:bg-white/5'
                  )}
                >
                  <Icon className='w-4 h-4' />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='sm'
            className='md:hidden'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? (
              <X className='w-5 h-5' />
            ) : (
              <Menu className='w-5 h-5' />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className='md:hidden overflow-hidden'
            >
              <div className='py-4 space-y-1'>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg',
                        'text-base font-medium transition-all duration-200',
                        isActive
                          ? 'text-[#00d4ff] bg-[#00d4ff]/10'
                          : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:bg-white/5'
                      )}
                    >
                      <Icon className='w-5 h-5' />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
