# Trazabilidad de la rúbrica oficial · EP2 DSY1104

**Fuente:** `DSY1104 Evaluación Parcial 2_EE_EP_Estudiante.pdf`, sección 4, pauta de evaluación, pp. 6–9. La entrega grupal pondera 40 %, la presentación individual 60 % y la Evaluación Parcial 2 tiene ponderación general de 30 %.

> Esta matriz distingue el cumplimiento técnico que se ha medido en CI del cumplimiento que requiere navegador/dispositivos, documentos DOCX finales, confirmación docente o defensa oral. No es una promesa de nota ni una declaración falsa de cumplimiento global.

## Niveles de la pauta

| Nivel | % de logro | Criterio de la pauta |
|---|---:|---|
| Muy buen desempeño | 100 % | Evidencia el logro de todos los aspectos del indicador. |
| Buen desempeño | 80 % | Alto desempeño con pequeñas omisiones/dificultades/errores. |
| Desempeño aceptable | 60 % | Elementos básicos logrados con omisiones/dificultades/errores. |
| Desempeño incipiente | 30 % | Errores importantes que impiden demostrar elementos básicos. |
| Desempeño no logrado | 0 % | Ausencia o desempeño incorrecto. |

## Evidencia automática reciente

El commit `5d9ce30e4ed3b14b2b3688d13d5f76fffbd8af62` se validó en [GitHub Actions run 38802384128](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128): 7 archivos de prueba aprobados, 64/64 casos, cobertura V8 de 100 % en Statements/Branches/Functions/Lines y build de producción exitoso. El alcance de V8 es `src/**/*.{js,jsx}`, excluyendo tests/setup y `src/main.jsx`; no incluye todos los archivos HTML/JS antiguos de EP1.

## Situación evaluativa 1 · Entrega grupal (40 %)

| Indicador / peso | Requisito de máximo desempeño | Implementación/evidencia | Estado |
|---|---|---|---|
| **IE2.1.1 · 10 %** Diseña un proyecto frontend con framework JS | Proyecto sólido, bien estructurado y con funcionalidades completas usando framework moderno | React/Vite, navegación, catálogo, detalle, carrito, persistencia local, formularios, vista administrativa y 404. ERS adaptado y workflow. | **Implementado en el alcance React EP2; CI pasa.** La web legacy completa no se ha migrado página por página, se conserva como referencia. |
| **IE2.1.2 · 10 %** Componentes React, props, estado y Bootstrap responsive | Props/estado gestionados correctamente y diseño responsive perfectamente integrado | Componentes parametrizados; estado de catálogo/carrito; búsqueda/filtro; Bootstrap/React Bootstrap, grilla y foco visible. | **Código implementado; revisión manual pendiente** a 375/768/1024/1440 px, incluidos formularios, tabla y navegación. |
| **IE2.2.1 · 12 %** Pruebas de lógica/comportamiento (la pauta nombra Jasmine/Karma) | Diez pruebas bien estructuradas y todas pasando | 64 casos aprobados en siete archivos; cada integrante dispone de diez tests propios y distintos, además de integración/utilidades. | **Cumplimiento técnico automatizado verificado con Vitest. Riesgo externo pendiente:** confirmar que el profesor aplica la autorización de la Guía 13 y no exige Jasmine/Karma literalmente. |
| **IE2.3.1 · 8 %** Entorno, pruebas, mocks, resultados y cobertura | Proceso completo, mocks efectivos, análisis y cobertura exhaustiva | Vitest/jsdom/RTL; callbacks mock con `vi.fn`; espía `vi.spyOn` de persistencia; reporte V8 de 100 % en sus cuatro métricas; informe con interpretación y limitaciones. | **Cumplimiento técnico automatizado verificado en CI.** Las capturas HTML y revisión final de informe deben adjuntarse a la entrega. |

## Situación evaluativa 2 · Presentación individual (60 %)

Los tres integrantes registrados en el README —Martin Reyes, Martin Lara y Diego Adan— deben preparar su propia explicación y responder preguntas sin limitarse a leer un guion común.

| Indicador / peso | Requisito de máximo desempeño | Preparación/evidencia | Estado |
|---|---|---|---|
| **IE2.1.3 · 15 %** Expone el diseño con framework JS | Explicación detallada y estructurada del diseño y la aplicación frontend | ERS, README, rutas, composición React y documentación de decisiones. | **Pendiente de defensa real de cada integrante.** |
| **IE2.1.4 · 20 %** Muestra componentes, props/estado y Bootstrap responsive | Demostración ejemplar con estado y responsividad integrados | `TarjetaProducto`, `Productos`, estado en `App.jsx`, grilla Bootstrap. | **Código implementado; capturas de navegador y demostración individual pendientes.** |
| **IE2.2.2 · 15 %** Demuestra 10 pruebas efectivas (la pauta nombra Jasmine/Karma) | Cada estudiante demuestra diez casos, explica expectativas y cómo aseguran calidad | `npm run test:integrante-1`, `test:integrante-2`, `test:integrante-3`; cada suite tiene 10 casos aprobados como parte del run completo. | **Preparación técnica verificada; demostración oral de cada estudiante pendiente.** Confirmar herramienta con docente. |
| **IE2.3.2 · 10 %** Explica test unitario, mocks y análisis de resultados | Explicación exhaustiva de entorno, pruebas, mocks y métricas | Guías 13/14, informe de cobertura medido y ejemplo real de mock/spy. | **Pendiente de defensa individual**, incluyendo explicación de qué mide cada métrica y límites de su alcance. |

## Checklist final de evaluación

### Verificado automáticamente
- [x] CI ejecuta pruebas, cobertura y build.
- [x] 64/64 casos aprobados, 7/7 archivos de test.
- [x] 100 % Statements, Branches, Functions y Lines dentro del alcance V8 configurado.
- [x] Hay una suite separada de diez pruebas por integrante.
- [x] Hay mocks de callbacks y un spy de persistencia; existe un documento de cobertura interpretado.
- [x] La aplicación compila a producción en CI.

### Pendiente de evidencia manual o decisión externa
- [ ] Abrir la app en navegador y revisar rutas directas + recarga.
- [ ] Capturas de 375/768/1024/1440 px; revisar accesibilidad/foco y ausencia de desbordamiento.
- [ ] Regenerar/revisar los DOCX exigidos de ERS y coverage con los resultados finales.
- [ ] Confirmar con el docente el reemplazo Jasmine/Karma por Vitest expresamente autorizado en la Guía 13.
- [ ] Crear y verificar ZIP final desde el commit de entrega.
- [ ] Cada integrante defender el código, sus commits y su suite de diez tests.
- [ ] Si se exige por Guía 12, desplegar de verdad en EC2/Nginx, verificar URL pública y recarga de rutas.

**Conclusión honesta:** los componentes, las pruebas, el informe Markdown y el build están implementados/verificados en CI; la rúbrica global no puede declararse cumplida al 100 % hasta que se cierren las tareas que dependen del equipo/docente/infraestructura y se aporte su evidencia.
