# 📘 HIDRAULICALC 3.0 - DOCUMENTO DE REQUERIMIENTOS Y SPRINTS

## 📋 INFORMACIÓN GENERAL

| Campo | Valor |
|-------|-------|
| **Versión del Documento** | 1.0 |
| **Fecha de Creación** | 2026-04-03 |
| **Estado** | En revisión |
| **Plazo Estimado** | 2-3 semanas (Rápido) |
| **Stack Tecnológico** | Next.js 15 + React 19 + TypeScript |
| **Estilo** | Kudanil (Dark, Cyan, Glassmorphism) |

---

## 🎯 OBJETIVO DEL PROYECTO

Desarrollar una aplicación web **profesional, robusta y visualmente impresionante** para cálculo hidráulico que:

1. ✅ **Calcule volúmenes** de estructuras hidráulicas (embalses, canales, tanques)
2. ✅ **Grafique funciones** matemáticas e integrales con precisión
3. ✅ **Expanda funcionalidad** con más tipos de cálculos hidráulicos
4. ✅ **Permita fórmulas personalizadas** del usuario
5. ✅ **Mantenga estética Kudanil** (dark theme, cyan técnico, glassmorphism)
6. ✅ **Sea performante** (carga rápida, bundle optimizado)
7. ✅ **Tenga código robusto** (TypeScript estricto, tests, validación)

---

## 📊 ALCANCE DEL PROYECTO

### ✅ Funcionalidades Principales

#### 1. Calculadoras Hidráulicas
- [x] Embalse Cilíndrico (πr²h)
- [x] Canal Rectangular (l × w × h)
- [x] Tanque Vertical (πr²h)
- [ ] **NUEVO:** Canal Trapecial
- [ ] **NUEVO:** Tubo Lleno Parcial
- [ ] **NUEVO:** Vertedero Triangular
- [ ] **NUEVO:** Pozo de Inspección

#### 2. Graficador de Integrales
- [x] Interfaz de entrada de funciones
- [ ] **MEJORAR:** Cálculo real con mathjs
- [ ] **MEJORAR:** Renderizado con function-plot
- [ ] Zoom y paneo
- [ ] Múltiples funciones simultáneas
- [ ] Exportar como PNG/SVG

#### 3. Fórmulas Personalizadas
- [ ] **NUEVO:** Editor de fórmulas
- [ ] **NUEVO:** Validador de sintaxis
- [ ] **NUEVO:** Guardar fórmulas en localStorage
- [ ] **NUEVO:** Compartir fórmulas (URL exportable)

#### 4. Características Generales
- [ ] Historial de cálculos (localStorage)
- [ ] Exportar resultados a PDF
- [ ] Conversión de unidades (m³ ↔ ft³ ↔ L)
- [ ] Modo oscuro/claro (toggle)
- [ ] Responsive design (móvil primero)
- [ ] PWA (instalable)

---

## 🏗️ ARQUITECTURA TÉCNICA

### Stack Tecnológico

```json
{
  "framework": "Next.js 15 (App Router)",
  "react": "React 19",
  "lenguaje": "TypeScript 5 (estricto)",
  "estilos": "Tailwind CSS 4",
  "animaciones": "Framer Motion",
  "iconos": "Lucide React",
  "matemáticas": "mathjs",
  "gráficas": "function-plot + D3.js",
  "tests": "Vitest + React Testing Library",
  "linting": "ESLint + Prettier",
  "utils": "clsx, tailwind-merge"
}
```

### Estructura del Proyecto

```
hidraulicalc-3.0/
├── src/
│ ├── app/                      # Next.js App Router
│ │ ├── layout.tsx              # Root layout
│ │ ├── page.tsx                # Home page
│ │ ├── calculators/            # Páginas de calculadoras
│ │ │ ├── cylindrical/
│ │ │ ├── rectangular/
│ │ │ └── ...
│ │ └── globals.css             # Estilos globales
│ │
│ ├── components/
│ │ ├── calculators/            # Componentes de calculadoras
│ │ │ ├── CalculatorCard.tsx
│ │ │ ├── CylindricalReservoirCalculator.tsx
│ │ │ ├── RectangularChannelCalculator.tsx
│ │ │ ├── VerticalTankCalculator.tsx
│ │ │ ├── TrapezoidalChannelCalculator.tsx (NUEVO)
│ │ │ ├── PartialPipeCalculator.tsx (NUEVO)
│ │ │ ├── TriangularWeirCalculator.tsx (NUEVO)
│ │ │ └── IntegralCalculator.tsx (REHECHO)
│ │ │
│ │ ├── graphing/               # Componentes de gráficas (NUEVO)
│ │ │ ├── FunctionPlot.tsx
│ │ │ ├── GraphControls.tsx
│ │ │ ├── GraphTooltip.tsx
│ │ │ └── types.ts
│ │ │
│ │ ├── formulas/               # Editor de fórmulas (NUEVO)
│ │ │ ├── FormulaEditor.tsx
│ │ │ ├── FormulaList.tsx
│ │ │ └── FormulaValidator.ts
│ │ │
│ │ ├── layout/
│ │ │ ├── Header.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── HeroSection.tsx
│ │ │ └── Navigation.tsx
│ │ │
│ │ ├── ui/                     # Componentes UI reutilizables
│ │ │ ├── Button.tsx
│ │ │ ├── Input.tsx
│ │ │ ├── Card.tsx
│ │ │ ├── Dialog.tsx
│ │ │ └── index.ts
│ │ │
│ │ └── effects/
│ │     ├── ParticleBackground.tsx
│ │     └── DynamicGradient.tsx
│ │
│ ├── hooks/
│ │ ├── useCounter.ts
│ │ ├── useLocalStorage.ts
│ │ ├── useDebounce.ts
│ │ └── useGraphInteraction.ts
│ │
│ ├── lib/
│ │ ├── utils.ts                # Utilidades (cn, formatNumber)
│ │ ├── calculations/           # Funciones de cálculo
│ │ │ ├── hydraulic.ts          # Cálculos hidráulicos
│ │ │ ├── integral.ts           # Cálculo de integrales
│ │ │ └── index.ts
│ │ ├── validators/             # Validadores
│ │ │ ├── formulaValidator.ts
│ │ │ └── inputValidator.ts
│ │ └── exporters/              # Exportación
│ │     ├── exportPDF.ts
│ │     └── exportImage.ts
│ │
│ └── types/
│     ├── calculations.ts
│     ├── graphs.ts
│     └── formulas.ts
│
├── public/
│ ├── assets/
│ └── fonts/
│
├── tests/
│ ├── unit/
│ ├── integration/
│ └── e2e/
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── vitest.config.ts
└── README.md
```

---

## 🎨 DISEÑO Y ESTÉTICA

### Paleta de Colores (Kudanil)

| Nombre | Hex | Uso |
|--------|-----|-----|
| Deep Black | `#0a0a0a` | Fondo principal |
| Charcoal | `#0f0f0f` | Superficies secundarias |
| Dark Surface | `#121212` | Cards, inputs |
| Technical Cyan | `#00d4ff` | Acento primario |
| Cyan Glow | `#00f0ff` | Hover states |
| Cyan Dim | `#00a8cc` | Acento secundario |
| Broken White | `#f5f5f5` | Texto principal |
| Technical Orange | `#ff6b35` | Alertas, warnings |

### Tipografía

```css
/* Fuentes */
--font-display: 'Inter', system-ui, sans-serif;
--font-accent: 'Montserrat', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Tamaños Hero */
--text-hero: clamp(3rem, 8vw, 8rem);
--text-display: clamp(2rem, 5vw, 4rem);
--text-base: 14px;
```

### Efectos Visuales

```css
/* Glassmorphism */
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

/* Gradient Text */
background: linear-gradient(135deg, #f5f5f5 0%, #00d4ff 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Glow Effect */
box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
```

---

## 📅 SPRINTS

### SPRINT 0 - PREPARACIÓN (Día 0)

**Duración:** 1 día  
**Objetivo:** Setup del proyecto y configuración inicial

#### Tareas:
- [ ] Crear repositorio Git
- [ ] Inicializar Next.js 15 con TypeScript
- [ ] Configurar Tailwind CSS 4
- [ ] Configurar ESLint + Prettier
- [ ] Configurar Vitest + React Testing Library
- [ ] Setup de Husky (pre-commit hooks)
- [ ] Crear estructura de carpetas
- [ ] Configurar path aliases (@/components, etc.)
- [ ] Crear README inicial

#### Entregables:
- ✅ Proyecto base funcional
- ✅ Scripts de dev/build/test
- ✅ Estructura de carpetas definida
- ✅ Git inicializado

---

### SPRINT 1 - CORE VISUAL (Días 1-3)

**Duración:** 3 días  
**Objetivo:** Implementar toda la estética Kudanil y componentes base

#### Día 1: Layout Principal
- [ ] Root layout con fuentes (Inter, Montserrat)
- [ ] globals.css con variables CSS
- [ ] HeroSection con tipografía hero
- [ ] ParticleBackground optimizado
- [ ] DynamicGradient (fix TypeScript errors)
- [ ] Header/Navigation
- [ ] Footer

#### Día 2: Componentes UI
- [ ] Button (con variantes)
- [ ] Input (con validación visual)
- [ ] Card (glassmorphism)
- [ ] Dialog/Modal
- [ ] Tooltip
- [ ] ResultRow (reutilizable)
- [ ] Loading spinner

#### Día 3: Efectos y Animaciones
- [ ] useCounter hook
- [ ] Stagger animations para grids
- [ ] Scroll-based animations
- [ ] Hover effects
- [ ] Transition components

#### Entregables:
- ✅ Layout principal funcional
- ✅ Sistema de diseño completo
- ✅ Animaciones fluidas
- ✅ Estética Kudanil implementada

---

### SPRINT 2 - CALCULADORAS HIDRÁULICAS (Días 4-7)

**Duración:** 4 días  
**Objetivo:** Implementar calculadoras existentes + nuevas

#### Día 4-5: Calculadoras Existentes (Refactor)
- [ ] CylindricalReservoirCalculator (refactor)
- [ ] RectangularChannelCalculator (refactor)
- [ ] VerticalTankCalculator (refactor)
- [ ] Validación de inputs en todas
- [ ] Manejo de errores (NaN, negativos)
- [ ] Tests unitarios de cálculos

#### Día 6: Nuevas Calculadoras I
- [ ] TrapezoidalChannelCalculator
- [ ] PartialPipeCalculator
- [ ] Fórmulas específicas
- [ ] Tests unitarios

#### Día 7: Nuevas Calculadoras II
- [ ] TriangularWeirCalculator
- [ ] InspectionWellCalculator (opcional)
- [ ] Tests unitarios
- [ ] Documentación de fórmulas

#### Entregables:
- ✅ 7 calculadoras funcionales
- ✅ Validación de errores
- ✅ Tests unitarios
- ✅ Precisión de 2 decimales

---

### SPRINT 3 - GRAFICADOR DE INTEGRALES (Días 8-12)

**Duración:** 5 días  
**Objetivo:** Implementar graficador REAL con mathjs y function-plot

#### Día 8: Configuración de Librerías
- [ ] Instalar mathjs
- [ ] Instalar function-plot
- [ ] Instalar D3.js (opcional)
- [ ] Configurar types para las librerías
- [ ] Crear wrappers TypeScript

#### Día 9-10: FunctionPlot Component
- [ ] FunctionPlot.tsx (wrapper de function-plot)
- [ ] Soporte para múltiples funciones
- [ ] Zoom in/out
- [ ] Pan (arrastrar)
- [ ] Reset view
- [ ] Grid toggle

#### Día 11: Cálculo de Integrales
- [ ] integral.ts (cálculo real con mathjs)
- [ ] parseFunction() - validar sintaxis
- [ ] calculateDefiniteIntegral()
- [ ] calculateArea()
- [ ] Manejo de errores (funciones inválidas)

#### Día 12: UI del Graficador
- [ ] Input de función (con ejemplos)
- [ ] Selectores de límites (a, b)
- [ ] Botones de control
- [ ] Tooltip con coordenadas
- [ ] Exportar como PNG/SVG

#### Entregables:
- ✅ Graficador funcional
- ✅ Cálculo real de integrales
- ✅ Interacciones (zoom, pan)
- ✅ Export de imágenes

---

### SPRINT 4 - FÓRMULAS PERSONALIZADAS (Días 13-15)

**Duración:** 3 días  
**Objetivo:** Permitir a usuarios crear y guardar fórmulas

#### Día 13: Editor de Fórmulas
- [ ] FormulaEditor.tsx (textarea con syntax highlighting)
- [ ] Validador de sintaxis en tiempo real
- [ ] Soporte para variables (r, h, w, etc.)
- [ ] Soporte para funciones mathjs

#### Día 14: Gestión de Fórmulas
- [ ] FormulaList.tsx (lista de fórmulas guardadas)
- [ ] Guardar en localStorage
- [ ] Editar/Eliminar fórmulas
- [ ] Importar/Exportar (JSON)
- [ ] Compartir vía URL

#### Día 15: Integración
- [ ] Integrar con calculadoras
- [ ] Crear calculadora desde fórmula
- [ ] Templates de fórmulas predefinidas
- [ ] Documentación de sintaxis

#### Entregables:
- ✅ Editor de fórmulas
- ✅ CRUD de fórmulas
- ✅ Persistencia localStorage
- ✅ Export/Import

---

### SPRINT 5 - CARACTERÍSTICAS ADICIONALES (Días 16-18)

**Duración:** 3 días  
**Objetivo:** Historial, exportación, conversión de unidades

#### Día 16: Historial de Cálculos
- [ ] useLocalStorage hook
- [ ] Historial por calculadora
- [ ] Vista de historial
- [ ] Borrar historial
- [ ] Exportar historial (JSON)

#### Día 17: Exportación
- [ ] exportPDF.ts (resultados a PDF)
- [ ] exportImage.ts (gráfica a PNG)
- [ ] Botones de export
- [ ] Configurar formato

#### Día 18: Conversión y Utilidades
- [ ] Conversor de unidades (m³ ↔ ft³ ↔ L)
- [ ] Toggle modo oscuro/claro
- [ ] Responsive mobile
- [ ] PWA manifest

#### Entregables:
- ✅ Historial funcional
- ✅ Export a PDF/PNG
- ✅ Conversión de unidades
- ✅ PWA instalable

---

### SPRINT 6 - PULIDO Y TESTS (Días 19-21)

**Duración:** 3 días  
**Objetivo:** Tests, performance, bugs finales

#### Día 19: Tests Unitarios
- [ ] Tests de calculadoras
- [ ] Tests de cálculos (integral.ts, hydraulic.ts)
- [ ] Tests de validadores
- [ ] Tests de hooks
- [ ] Cobertura > 80%

#### Día 20: Performance
- [ ] Code splitting
- [ ] Lazy loading de componentes pesados
- [ ] Optimizar bundle size
- [ ] Lighthouse score > 90
- [ ] Optimizar imágenes

#### Día 21: Bug Fixes y QA
- [ ] Testing en navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Testing responsive
- [ ] Fix de bugs
- [ ] Documentación final
- [ ] README completo

#### Entregables:
- ✅ Tests con >80% cobertura
- ✅ Performance optimizado
- ✅ Cross-browser compatible
- ✅ Documentación completa

---

## 📋 REQUERIMIENTOS DETALLADOS

### RF-001: Cálculo de Embalse Cilíndrico
**Descripción:** El usuario debe poder calcular el volumen de un embalse cilíndrico ingresando radio y altura.

**Entradas:**
- Radio (m) - número positivo
- Altura (m) - número positivo

**Salidas:**
- Volumen en m³ (2 decimales)
- Volumen en ft³ (2 decimales)

**Fórmula:** V = π × r² × h

**Validaciones:**
- Radio > 0
- Altura > 0
- Manejo de NaN

---

### RF-002: Cálculo de Canal Rectangular
**Descripción:** El usuario debe poder calcular el volumen de un canal rectangular.

**Entradas:**
- Longitud (m)
- Ancho (m)
- Altura (m)

**Fórmula:** V = l × w × h

---

### RF-003: Cálculo de Tanque Vertical
**Descripción:** El usuario debe poder calcular el volumen de un tanque cilíndrico vertical.

**Fórmula:** V = π × r² × h

---

### RF-004: Canal Trapecial (NUEVO)
**Descripción:** Cálculo de volumen para canal con base ancha y lados inclinados.

**Entradas:**
- Base menor (b)
- Base mayor (B)
- Altura (h)
- Longitud (L)

**Fórmula:** V = ((b + B) / 2) × h × L

---

### RF-005: Tubo Lleno Parcial (NUEVO)
**Descripción:** Cálculo de volumen de líquido en tubo horizontal lleno parcialmente.

**Entradas:**
- Diámetro (D)
- Longitud (L)
- Altura del líquido (h)

**Fórmula:** V = L × (r² × acos((r-h)/r) - (r-h) × √(2rh - h²))

---

### RF-006: Vertedero Triangular (NUEVO)
**Descripción:** Cálculo de caudal en vertedero triangular.

**Entradas:**
- Ángulo (θ)
- Altura (h)
- Coeficiente (C)

**Fórmula:** Q = (8/15) × C × √(2g) × tan(θ/2) × h^(5/2)

---

### RF-007: Graficador de Funciones
**Descripción:** El usuario debe poder graficar funciones matemáticas.

**Requerimientos:**
- Soporte para funciones: x, x², x³, √x, sin, cos, tan, eˣ, ln, log
- Zoom in/out
- Pan (arrastrar)
- Múltiples funciones simultáneas
- Grid opcional
- Ejes interactivos

---

### RF-008: Cálculo de Integrales
**Descripción:** Cálculo de área bajo la curva entre dos límites.

**Entradas:**
- Función f(x)
- Límite inferior (a)
- Límite superior (b)

**Salidas:**
- Valor de la integral definida
- Representación gráfica del área

---

### RF-009: Fórmulas Personalizadas
**Descripción:** El usuario puede crear y guardar sus propias fórmulas.

**Características:**
- Editor con validación de sintaxis
- Variables predefinidas (r, h, w, l, etc.)
- Funciones mathjs soportadas
- Guardar en localStorage
- Exportar/Importar JSON
- Compartir vía URL

---

### RF-010: Historial de Cálculos
**Descripción:** La aplicación debe guardar el historial de cálculos realizados.

**Características:**
- Guardado automático en localStorage
- Filtrado por tipo de calculadora
- Borrar individual o todo
- Exportar a JSON
- Límite de 100 entradas

---

### RF-011: Exportación a PDF
**Descripción:** El usuario debe poder exportar resultados a PDF.

**Contenido del PDF:**
- Fecha y hora
- Tipo de cálculo
- Inputs utilizados
- Resultados
- Gráfica (si aplica)

---

### RF-012: Conversión de Unidades
**Descripción:** Conversión entre unidades métricas e imperiales.

**Unidades:**
- m³ ↔ ft³
- m ↔ ft
- L (litros) ↔ galones

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Generales
- [ ] La aplicación carga en < 3 segundos
- [ ] Lighthouse score > 90 en performance
- [ ] Totalmente responsive (móvil, tablet, desktop)
- [ ] Compatible con Chrome, Firefox, Safari, Edge
- [ ] PWA instalable
- [ ] Sin errores de TypeScript
- [ ] Tests con > 80% de cobertura

### Estéticos
- [ ] Paleta Kudanil implementada correctamente
- [ ] Glassmorphism en todas las cards
- [ ] Animaciones fluidas (60 FPS)
- [ ] Tipografía hero impactante
- [ ] Partículas y gradientes funcionales

### Funcionales
- [ ] Todas las calculadoras retornan resultados precisos (2 decimales)
- [ ] Validación de inputs en tiempo real
- [ ] Manejo elegante de errores
- [ ] Graficador renderiza funciones correctamente
- [ ] Zoom y pan en gráficas
- [ ] Exportación a PDF/PNG funcional
- [ ] Historial persiste después de cerrar

---

## 📊 MÉTRICAS DE ÉXITO

| Métrica | Objetivo |
|---------|----------|
| **Performance** | Lighthouse > 90 |
| **Bundle Size** | < 500KB (gzipped) |
| **Load Time** | < 3s |
| **Test Coverage** | > 80% |
| **TypeScript Errors** | 0 |
| **Cross-browser** | 100% funcional en 4 navegadores |
| **Responsive** | 100% funcional en móvil/tablet |

---

## 🚀 ENTREGABLES POR SPRINT

| Sprint | Entregable Principal |
|--------|---------------------|
| 0 | Proyecto base configurado |
| 1 | UI/UX completa (Kudanil style) |
| 2 | 7 calculadoras funcionales |
| 3 | Graficador de integrales REAL |
| 4 | Editor de fórmulas personalizadas |
| 5 | Historial + Export + Conversiones |
| 6 | Tests + Performance + QA |

---

## 📝 NOTAS ADICIONALES

### Dependencias Críticas
```json
{
  "next": "15.0.0",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "typescript": "5.0.0",
  "tailwindcss": "4.0.0",
  "framer-motion": "11.0.0",
  "mathjs": "12.4.0",
  "function-plot": "1.23.3",
  "lucide-react": "0.468.0",
  "clsx": "2.1.0",
  "tailwind-merge": "2.2.0"
}
```

### Scripts Disponibles
```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Start producción
npm run test     # Tests
npm run lint     # Linting
```

### Comandos de Git
```bash
git commit -m "feat: descripción"     # Nueva feature
git commit -m "fix: descripción"      # Bug fix
git commit -m "refactor: descripción" # Refactor
git commit -m "test: descripción"     # Tests
git commit -m "docs: descripción"     # Documentación
```

---

## 🔥 PRIORIDADES

### Prioridad 1 - Crítico (Bloqueantes)
1. Fix TypeScript errors
2. Implementar mathjs y function-plot
3. Validación de inputs y errores

### Prioridad 2 - Alto
4. Tests unitarios
5. Performance optimization
6. Export functionality

### Prioridad 3 - Medio
7. Fórmulas personalizadas
8. Historial de cálculos
9. PWA features

---

## 📞 CONTACTO

**Desarrollador:** [Tu nombre]  
**Repositorio:** [URL del repo]  
**Documentación:** `/README.md`

---

**Estado:** ✅ Listo para implementación  
**Última Actualización:** 2026-04-03
