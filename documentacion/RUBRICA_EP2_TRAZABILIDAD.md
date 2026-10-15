# Trazabilidad de la rúbrica oficial · EP2 DSY1104

**Fuente:** *DSY1104 Evaluación Parcial 2_EE_EP_Estudiante.pdf*, sección 4, pauta de evaluación, pp. 6–9. La entrega grupal pondera 40 % y la presentación individual 60 %; la evaluación parcial tiene una ponderación general del 30 %.

> Estado en esta revisión: las implementaciones de código están en una rama, pero los resultados definitivos de CI, pruebas visuales manuales y defensa oral se deben comprobar. Una lista de verificación no equivale a una nota garantizada.

## Niveles de la pauta

| Nivel | Porcentaje de logro | Interpretación publicada |
|---|---:|---|
| Muy buen desempeño | 100 % | Desempeño destacado; evidencia el logro de todos los aspectos del indicador. |
| Buen desempeño | 80 % | Alto desempeño con pequeñas omisiones, dificultades o errores. |
| Desempeño aceptable | 60 % | Elementos básicos logrados, con omisiones, dificultades o errores. |
| Desempeño incipiente | 30 % | Omisiones o errores importantes que impiden evidenciar los elementos básicos. |
| Desempeño no logrado | 0 % | Ausencia o desempeño incorrecto. |

## Situación evaluativa 1 · Encargo grupal (40 %)

| Indicador / ponderación | Qué exige el nivel 100 % según la pauta | Implementación NutriVida / evidencia | Estado verificable |
|---|---|---|---|
| **IE2.1.1 · 10 %** Diseña un proyecto frontend con framework JS | Proyecto sólido y con funcionalidades completas utilizando un framework JavaScript | App React con Vite, rutas, catálogo, detalle, carrito, persistencia local, formularios y administración local. Archivos: `src/App.jsx`, `src/pages/`, `src/data/productos.js`. | **Parcial hasta CI y revisión manual** de las funciones y rutas; no implica que todo el HTML legado se haya migrado. |
| **IE2.1.2 · 10 %** Componentes React, props, estado y diseño responsivo con Bootstrap | Props/estado gestionados correctamente y diseño responsivo perfectamente integrado | Componentes parametrizados, estado de carrito/catálogo y filtros; React Bootstrap y grilla `xs=12/md=6/lg=4`; estilos y foco visible en `src/styles.css`. | **Parcial hasta inspección visual** a 375/768/1024/1440 px y prueba manual de formularios/tablas. |
| **IE2.2.1 · 12 %** Pruebas unitarias frontend, lógica y comportamiento (la pauta nombra Jasmine/Karma) | 10/10 pruebas bien estructuradas y sin errores | `src/App.test.jsx`, tres suites diferenciadas de 10 pruebas y pruebas de utilidades. Vitest es el ejecutor configurado porque la Guía 13 proporcionada declara autorización para reemplazar Jasmine/Karma. | **Pendiente de confirmar resultado CI** y confirmar con el docente que la sustitución de herramientas se acepta para esta evaluación. |
| **IE2.3.1 · 8 %** Proceso unitario: entorno, mocks, resultados y cobertura | Proceso completo, entorno bien configurado, mocks efectivos, análisis detallado y cobertura exhaustiva | Configuración Vitest/jsdom/RTL, `vi.fn`, `vi.spyOn`, reporte V8 texto/HTML/lcov y workflow `.github/workflows/validar-frontend.yml`. | **Pendiente de resultado CI y análisis numérico** del informe generado; la cobertura no se declara antes de medirla. |

## Situación evaluativa 2 · Presentación individual (60 %)

Cada integrante —Martin Reyes, Martin Lara y Diego Adan según el README existente— tiene que realizar las cuatro demostraciones; las suites diferenciadas crean puntos de partida para practicar, no prueba por sí solas de autoría ni de defensa individual.

| Indicador / ponderación | Qué exige la pauta en nivel 100 % | Preparación/evidencia técnica | Estado |
|---|---|---|---|
| **IE2.1.3 · 15 %** Expone el diseño usando framework JavaScript | Explicación detallada y bien estructurada del diseño y de la aplicación frontend moderna | ERS adaptado, mapa de rutas y README con arquitectura. Ensayo individual y respuestas del docente. | **No cerrable solo con código**; cada integrante debe ensayar y explicar con sus palabras. |
| **IE2.1.4 · 20 %** Muestra componentes, props, estado y Bootstrap responsivo | Demostración ejemplar, props/estado correctos y responsividad integrada | `TarjetaProducto`, `Productos`, estado compartido en `App.jsx`, Bootstrap y grilla responsive. Capturas en cuatro tamaños y navegación real. | **Parcial** hasta prueba de navegador/capturas y demostración individual. |
| **IE2.2.2 · 15 %** Demuestra 10 pruebas unitarias con la lógica indicada en la pauta | Cada estudiante demuestra 10 pruebas efectivas, explica expectativas y cómo aseguran calidad (la pauta menciona Jasmine/Karma) | Diez pruebas por suite: `integrante-1.catalogo.spec.jsx`, `integrante-2.carrito.spec.jsx`, `integrante-3.formularios.spec.jsx`. | **Pendiente de CI y demostración oral**, además de confirmar Vitest versus la mención literal Jasmine/Karma. |
| **IE2.3.2 · 10 %** Explica el proceso unitario, entorno, mocks y resultados | Explicación exhaustiva, clara y estructurada de configuración, tests, mocks y análisis | Guía 13/14 adaptadas, comando `npm run coverage`, archivo de informe y guía de defensa. | **No cerrable solo con código**; cada integrante debe mostrar un mock/spy y explicar las métricas reales. |

## Matriz final de comprobación (no marcar antes de tener la evidencia)

- [ ] CI de la rama termina con éxito: pruebas + cobertura + build.
- [ ] Se registran los resultados reales de Statements, Branches, Functions y Lines en el informe.
- [ ] Cada suite individual demuestra 10 casos distintos que pasan, no solo 10 nombres en código.
- [ ] El docente confirma por escrito el reemplazo de Jasmine/Karma por Vitest señalado en la Guía 13.
- [ ] Revisión manual de rutas directas/reload, errores de formulario, foco, tablas e imágenes.
- [ ] Capturas de navegador a 375, 768, 1024 y 1440 px.
- [ ] ERS y documento de cobertura final revisados y consistentes con el código.
- [ ] ZIP final creado desde el commit correcto y abierto para comprobar sus contenidos.
- [ ] Cada integrante demuestra sus diez pruebas y explica su código/commits.
- [ ] Si el docente exige EC2/Nginx: despliegue real, URL pública funcional y evidencia de rutas tras reload.

**Criterio de honestidad:** mientras queden casillas sin evidencia, no se debe registrar la rúbrica como “100 % cumplida”. La matriz separa la implementación de software, la verificación automática, los requisitos que dependen de AWS y la presentación individual.
