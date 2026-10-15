# Rúbrica oficial y matriz de trazabilidad · EP2 DSY1104

**Fuente:** *DSY1104 Evaluación Parcial 2_EE_EP_Estudiante.pdf*, instrucciones y pauta de evaluación, páginas 2–9. Este documento relaciona los indicadores oficiales con el código y distingue resultados automatizados de las evidencias manuales. La evaluación parcial pondera 30 % de la asignatura; la entrega grupal equivale al 40 % de esta evaluación y la presentación individual al 60 %.

## Niveles oficiales de logro

| Categoría | % de logro | Descripción |
|---|---:|---|
| Muy buen desempeño | 100 % | Demuestra un desempeño destacado y todos los aspectos evaluados del indicador. |
| Buen desempeño | 80 % | Alto desempeño, con pequeñas omisiones, dificultades o errores. |
| Desempeño aceptable | 60 % | Cumple los elementos básicos, pero presenta omisiones, dificultades o errores. |
| Desempeño incipiente | 30 % | Tiene omisiones o errores importantes que impiden evidenciar los elementos básicos. |
| Desempeño no logrado | 0 % | Hay ausencia del desempeño o es incorrecto. |

## Situación evaluativa 1 · Entrega de encargo (40 %)

| Indicador oficial | Peso | Evidencia exigida para aspirar al 100 % | Implementación en NutriVida | Estado |
|---|---:|---|---|---|
| **IE2.1.1** Diseña un proyecto frontend utilizando un framework de JavaScript. | 10 % | Proyecto estructurado, funcional y construido con framework frontend. | Entrada React/Vite, rutas, catálogo, detalle, carrito, formularios y vistas de NutriVida. | La ejecución de CI confirmó pruebas y compilación de producción. La revisión funcional/visual manual continúa pendiente. |
| **IE2.1.2** Desarrolla componentes React, gestionando propiedades y estados e implementando diseño responsivo mediante Bootstrap. | 10 % | Props/estado correctamente gestionados y responsividad integrada. | Componentes reutilizables, estado de carrito/catálogo, filtros, React Bootstrap, breakpoints y foco visible. | Componentes y estilos están implementados; falta inspección/captura manual del navegador en los tamaños de la guía. |
| **IE2.2.1** Crea pruebas unitarias para componentes frontend y verifica sus comportamientos. | 12 % | Todas las pruebas están bien estructuradas, verifican lógica y comportamientos y no fallan. El PDF nombra Jasmine/Karma. | Diez pruebas para cada uno de los tres integrantes, más pruebas comunes/utilidades; Vitest/jsdom/RTL según la Guía 13 proporcionada. | 81/81 pruebas aprobadas en 7 archivos, incluidas diez por integrante. La pauta impresa nombra Jasmine/Karma; falta confirmar con el docente la sustitución autorizada por la Guía 13. |
| **IE2.3.1** Implementa un proceso de testing con entorno, mocks, resultados y cobertura. | 8 % | Entorno bien configurado, mocks efectivos, análisis detallado y cobertura exhaustiva. | Configuración de Vitest, spy de localStorage, callbacks con `vi.fn`, cobertura V8, HTML/lcov y workflow. | 100 % Statements, Branches, Functions y Lines medido por V8; informe Markdown actualizado con la ejecución y el SHA. |

**Total situación evaluativa 1: 40 %.**

## Situación evaluativa 2 · Presentación individual (60 %)

Los tres integrantes registrados en la versión de EP1 son Martin Reyes, Martin Lara y Diego Adan. Todos deben poder defender el proyecto, aunque se organicen áreas de trabajo distintas.

| Indicador oficial | Peso | Evidencia exigida para aspirar al 100 % | Preparación en NutriVida | Estado |
|---|---:|---|---|---|
| **IE2.1.3** Expone cómo se diseñó el proyecto mediante un framework JavaScript frontend. | 15 % | Exposición detallada, correcta y estructurada sobre el diseño y una aplicación frontend moderna. | README, ERS, rutas y componentes documentados. | La exposición y respuestas de cada estudiante solo se comprueban durante la presentación. |
| **IE2.1.4** Muestra desarrollo de componentes React, props, estado y diseño responsivo con Bootstrap. | 20 % | Demostración ejemplar de componentes/props/estado y responsividad integrada. | `TarjetaProducto`, `Productos`, `App.jsx`, Bootstrap y la grilla responsive. | Requiere navegador, capturas y demostración individual. |
| **IE2.2.2** Demuestra 10 pruebas unitarias para componentes frontend, explicando su lógica y comportamiento. | 15 % | El estudiante muestra diez pruebas efectivas, claras y aprobadas. La pauta menciona Jasmine/Karma. | Suites de diez casos en `src/tests/integrante-1.catalogo.spec.jsx`, `integrante-2.carrito.spec.jsx` y `integrante-3.formularios.spec.jsx`. | Requiere ejecutar/explicar la suite individual y confirmar la herramienta aceptada por el docente. |
| **IE2.3.2** Explica el proceso de testing: entorno, pruebas, mocks y análisis de resultados. | 10 % | Explicación exhaustiva, clara y estructurada de configuración, mocks y métricas. | Guías 13–14 adaptadas, spy/mock y reporte de cobertura en el repositorio. | Requiere interpretación de métricas reales y defensa individual. |

**Total situación evaluativa 2: 60 %. Total de la pauta: 100 %.**

## Comprobaciones obligatorias antes de marcar la entrega como final

- [x] GitHub Actions terminó correctamente para el commit de código `7e94488fc84861e83d7f84f3573a6d3a572a75f9`: pruebas, cobertura y compilación.
- [x] La ejecución completa aprobó los tres archivos de prueba individuales (diez casos por integrante) y casos adicionales de integración/utilidades.
- [x] El resumen real de Statements, Branches, Functions y Lines quedó registrado en el informe Markdown.
- [x] El informe documenta alcance, métricas, suites y relación con requisitos; queda pendiente la revisión manual del navegador.
- [ ] El docente confirma que se acepta Vitest en reemplazo de Jasmine/Karma, de acuerdo con la Guía 13 suministrada.
- [ ] Se prueban manualmente rutas directas/recarga, carrito persistente, formularios y 404.
- [ ] Se guardan capturas responsive a 375, 768 y 1200 px (las referencias de la Guía 12).
- [ ] Se revisan los DOCX existentes de ERS y cobertura para que reflejen la versión final.
- [ ] Se genera y abre el ZIP final; se confirma su contenido y no incluye dependencias generadas.
- [ ] Cada integrante practica su propia presentación y puede explicar código, pruebas, mocks y cobertura.
- [ ] Si la actividad exige EC2/Nginx: despliegue real, URL pública y ruta interna tras recarga comprobadas.

**Conclusión honesta:** la verificación automática de código, pruebas, cobertura y build está completa en el alcance medido. No se puede declarar cumplido el 100 % de toda la rúbrica mientras falten la revisión visual/capturas, la confirmación docente sobre Vitest frente a la pauta impresa, la preparación de los DOCX/ZIP requeridos y la defensa individual. El despliegue EC2 solo queda pendiente si el docente lo exige; no se inventan evidencias externas.
