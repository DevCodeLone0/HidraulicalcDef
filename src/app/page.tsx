import { Header, Footer, HeroSection } from '@/components/layout';
import { ParticleBackground, DynamicGradient } from '@/components/effects';

export default function HomePage() {
  return (
    <>
      {/* Background Effects */}
      <ParticleBackground particleCount={60} />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <DynamicGradient className='min-h-screen'>
        <main className='relative z-10'>
          <HeroSection />
        </main>
      </DynamicGradient>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
