# 💧 HidrauliCalc 3.0

Aplicación web profesional para cálculos hidráulicos con estética **Kudanil** (dark theme, cyan técnico, glassmorphism).

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## 🚀 Características

### Calculadoras Hidráulicas
- 🏞️ **Embalse Cilíndrico** - V = π × r² × h
- 📐 **Canal Rectangular** - V = l × w × h
- 🛢️ **Tanque Vertical** - V = π × r² × h
- 📊 **Canal Trapecial** - V = ((b + B) / 2) × h × L
- 🔧 **Tubo Lleno Parcial** - Cálculo de volumen en tubos horizontales
- 💧 **Vertedero Triangular** - Cálculo de caudal
- 🕳️ **Pozo de Inspección** - Cálculos especializados

### Graficador de Integrales
- Visualización de funciones matemáticas
- Zoom y paneo interactivo
- Múltiples funciones simultáneas
- Exportación a PNG/SVG

### Fórmulas Personalizadas
- Editor con validación de sintaxis
- Guardado en localStorage
- Compartir vía URL

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 15.x | Framework React |
| React | 19.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 11.x | Animations |
| mathjs | 12.x | Cálculos matemáticos |
| function-plot | 1.x | Gráficas |
| Vitest | 2.x | Testing |

## 📦 Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd Hidracalc

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Ejecutar tests
npm run test
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── calculators/       # Páginas de calculadoras
│   └── globals.css        # Estilos globales (Kudanil theme)
│
├── components/
│   ├── calculators/       # Componentes de calculadoras
│   ├── graphing/          # Graficador de funciones
│   ├── formulas/          # Editor de fórmulas
│   ├── layout/            # Header, Footer, Navigation
│   ├── ui/                # Componentes UI reutilizables
│   └── effects/           # Efectos visuales (partículas, gradientes)
│
├── hooks/                 # Custom hooks
├── lib/
│   ├── utils.ts          # Utilidades (cn, formatNumber, etc.)
│   ├── calculations/     # Funciones de cálculo hidráulico
│   ├── validators/       # Validadores
│   └── exporters/        # Exportación PDF/Imagen
│
└── types/                 # TypeScript types

tests/
├── unit/                  # Tests unitarios
├── integration/           # Tests de integración
└── e2e/                   # Tests end-to-end
```

## 🎨 Estética Kudanil

### Paleta de Colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| Deep Black | `#0a0a0a` | Fondo principal |
| Charcoal | `#0f0f0f` | Superficies secundarias |
| Dark Surface | `#121212` | Cards, inputs |
| Technical Cyan | `#00d4ff` | Acento primario |
| Cyan Glow | `#00f0ff` | Hover states |
| Broken White | `#f5f5f5` | Texto principal |
| Technical Orange | `#ff6b35` | Alertas |

### Efectos Visuales

- **Glassmorphism** - Cards con blur y transparencia
- **Gradient Text** - Títulos con degradado cyan-blanco
- **Glow Effects** - Sombras luminosas cyan

## 🧪 Scripts Disponibles

```bash
npm run dev          # Servidor desarrollo (localhost:3000)
npm run build        # Build producción
npm run start        # Servidor producción
npm run lint         # Linting
npm run lint:fix     # Linting con auto-fix
npm run test         # Ejecutar tests
npm run test:ui      # Tests con UI
npm run test:coverage # Tests con cobertura
```

## 📋 Roadmap

- [x] Sprint 0: Setup inicial
- [ ] Sprint 1: Core Visual (UI/UX)
- [ ] Sprint 2: Calculadoras Hidráulicas
- [ ] Sprint 3: Graficador de Integrales
- [ ] Sprint 4: Fórmulas Personalizadas
- [ ] Sprint 5: Features Extra (historial, PDF, PWA)
- [ ] Sprint 6: Tests y Performance

## 📄 Licencia

MIT © HidrauliCalc Team
