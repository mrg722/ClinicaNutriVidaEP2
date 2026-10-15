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
| **IE2.1.1** Diseña un proyecto frontend utilizando un framework de JavaScript. | 10 % | Proyecto estructurado, funcional y construido con framework frontend. | Entrada React/Vite, rutas, catálogo, detalle, carrito, formularios y vistas de NutriVida. | El código está preparado; verificar CI y navegador tras el commit final. |
| **IE2.1.2** Desarrolla componentes React, gestionando propiedades y estados e implementando diseño responsivo mediante Bootstrap. | 10 % | Props/estado correctamente gestionados y responsividad integrada. | Componentes reutilizables, estado de carrito/catálogo, filtros, React Bootstrap, breakpoints y foco visible. | Falta inspección/captura manual de la interfaz en los tamaños definidos por la guía. |
| **IE2.2.1** Crea pruebas unitarias para componentes frontend y verifica sus comportamientos. | 12 % | Todas las pruebas están bien estructuradas, verifican lógica y comportamientos y no fallan. El PDF nombra Jasmine/Karma. | Diez pruebas para cada uno de los tres integrantes, más pruebas comunes/utilidades; Vitest/jsdom/RTL según la Guía 13 proporcionada. | Verificar resultado del workflow final y consultar la discrepancia Jasmine/Karma vs. Vitest con el docente. |
| **IE2.3.1** Implementa un proceso de testing con entorno, mocks, resultados y cobertura. | 8 % | Entorno bien configurado, mocks efectivos, análisis detallado y cobertura exhaustiva. | Configuración de Vitest, spy de localStorage, callbacks con `vi.fn`, cobertura V8, HTML/lcov y workflow. | Verificar el informe generado y completar la interpretación con métricas de la ejecución final. |

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

- [ ] GitHub Actions finaliza correctamente en el commit que se entregará: pruebas, cobertura y compilación.
- [ ] Cada suite individual pasa y tiene diez casos distintos, no diez repeticiones del mismo comportamiento.
- [ ] Se registra el resumen real de Statements, Branches, Functions y Lines.
- [ ] El informe se interpreta y vincula pruebas con requisitos/hallazgos.
- [ ] El docente confirma que se acepta Vitest en reemplazo de Jasmine/Karma, de acuerdo con la Guía 13 suministrada.
- [ ] Se prueban manualmente rutas directas/recarga, carrito persistente, formularios y 404.
- [ ] Se guardan capturas responsive a 375, 768 y 1200 px (las referencias de la Guía 12).
- [ ] Se revisan los DOCX existentes de ERS y cobertura para que reflejen la versión final.
- [ ] Se genera y abre el ZIP final; se confirma su contenido y no incluye dependencias generadas.
- [ ] Cada integrante practica su propia presentación y puede explicar código, pruebas, mocks y cobertura.
- [ ] Si la actividad exige EC2/Nginx: despliegue real, URL pública y ruta interna tras recarga comprobadas.

**Conclusión honesta:** tener código y pruebas es necesario, pero no acredita por sí solo el 100 % de toda la rúbrica. Los indicadores de presentación, la inspección visual, la confirmación de herramienta y el despliegue exigido (si corresponde) dependen de evidencias reales que no deben inventarse.
