export default function HomePage() {
  return (
    <main className='flex-1 flex flex-col items-center justify-center min-h-screen relative overflow-hidden'>
      {/* Background gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f1a1f] to-[#0a0a0a] opacity-90' />
      
      {/* Content */}
      <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
        {/* Hero Title */}
        <h1 className='hero-title gradient-text mb-4'>
          HIDRAULICALC
        </h1>
        
        <h2 className='display-title text-[#00d4ff] mb-8'>
          3.0
        </h2>
        
        {/* Subtitle */}
        <p className='text-xl md:text-2xl text-[#f5f5f5]/80 mb-12 max-w-2xl mx-auto'>
          Calculadora hidráulica profesional con estética moderna.
          <br />
          <span className='text-[#00d4ff]'>Embalses • Canales • Tanques • Integrales</span>
        </p>
        
        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <a
            href='/calculators'
            className='glass glow-cyan px-8 py-4 rounded-xl text-lg font-semibold text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300 hover:scale-105'
          >
            Comenzar Cálculos
          </a>
          
          <a
            href='#features'
            className='glass px-8 py-4 rounded-xl text-lg font-medium text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-all duration-300'
          >
            Ver Características
          </a>
        </div>
        
        {/* Feature Cards Preview */}
        <div id='features' className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <FeatureCard
            icon='💧'
            title='Calculadoras'
            description='7 tipos de cálculos hidráulicos con validación en tiempo real'
          />
          <FeatureCard
            icon='📈'
            title='Graficador'
            description='Visualiza funciones e integrales con zoom y paneo interactivo'
          />
          <FeatureCard
            icon='✏️'
            title='Fórmulas Custom'
            description='Crea y guarda tus propias fórmulas con sintaxis mathjs'
          />
        </div>
      </div>
      
      {/* Footer */}
      <footer className='absolute bottom-0 w-full py-4 text-center text-[#f5f5f5]/40 text-sm'>
        HidrauliCalc 3.0 • Next.js 15 + React 19 + TypeScript
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className='glass-strong p-6 rounded-2xl text-left hover:scale-105 transition-transform duration-300'>
      <div className='text-4xl mb-4'>{icon}</div>
      <h3 className='text-xl font-semibold text-[#00d4ff] mb-2'>{title}</h3>
      <p className='text-[#f5f5f5]/70 text-sm'>{description}</p>
    </div>
  );
}
