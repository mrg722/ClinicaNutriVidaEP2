# Guía 14 · Adaptación punto por punto a Clínica NutriVida

**Fuente:** Guía Práctica 14, *Cobertura, mocks y preparación evaluativa: diez pruebas y defensa individual*. La meta es trazar cada comportamiento a una prueba y cada resultado a una evidencia.

## Matriz de los 13 puntos fuente

| Punto original | Adaptación a NutriVida | Evidencia |
|---|---|---|
| 1. Propósito | Completar tests, analizar cobertura, actualizar ERS/cobertura y preparar defensa | Guía, ERS e informe |
| 2. Resultados | Diez pruebas por estudiante, spy/mock, cuatro métricas, hallazgos y ensayo individual | Tres suites de diez y reporte |
| 3. Ruta de la sesión | Ejecutar, ampliar tests, generar cobertura, actualizar docs y ensayar | CI y checklist |
| 4. Preparar repo | Usar esta rama/repo, npm ci, estado de Git y servidor de desarrollo | README/workflow |
| 5. Plan de 10 tests | Diez casos distintos por persona, aplicados a catálogo, carrito y formularios | Tres suites individuales |
| 6. Spy de persistencia | Observar Storage.prototype.setItem y comprobar clave/JSON exactos | persistencia.spec.js |
| 7. Mock asíncrono | La fuente propone mockResolvedValue a un servicio async. NutriVida no tiene servicio remoto declarado; se adaptan mocks de callbacks y spy de almacenamiento sin inventar backend | vi.fn en tests y esta nota |
| 8. Generar cobertura | Ejecutar npm run coverage y abrir coverage/index.html | Artefacto V8 de Actions |
| 9. Interpretar informe | Distinguir Statements/Branches/Functions/Lines y revisar rutas no recorridas | CI actual marca las cuatro métricas al 100 % en su alcance |
| 10. Documento de cobertura | Entorno, alcance, tests↔requisitos, resumen, hallazgos y mejoras | Informe_Cobertura_Testing_EP2.md |
| 11. Actualizar ERS | Arquitectura/rutas, persistencia y límites, requisitos y tests | ERS_EP2_NutriVida.md; DOCX de entrega pendiente de revisión |
| 12. Ensayo | Arquitectura/nav; componente/props/state; responsive; tests/mock; cobertura/hallazgo | Ensayo separado por persona |
| 13. Auditoría final | React, Bootstrap, diez pruebas, spy/mock, cobertura, ERS, ZIP, repo y aportes individuales | Matriz de rúbrica |

## Transferencia de la lista de diez pruebas fuente

La fuente enumera precio cero/positivo, render de tarjeta, cupos, props, click, filtro, persistencia y elemento inexistente para Conecta Cultura. En NutriVida se mantienen los tipos de pruebas y se sustituye el dominio:

| Tipo fuente | Prueba adaptada |
|---|---|
| Precio cero | 0 CLP se muestra como Gratis |
| Precio positivo | El precio CLP se formatea |
| Render de tarjeta | La tarjeta muestra el nombre |
| Cupos críticos | No aplica al catálogo actual de servicios; no se inventa inventario. Se prueban búsqueda/filtro sin resultados y validación del carrito |
| Cero cupos deshabilita inscripción | No existe inscripción/cupos en la app React. Se prueban cambio de cantidad, reducción y eliminación de línea |
| Prop categoría | La tarjeta muestra categoría recibida |
| Evento | onAgregar recibe el producto correcto |
| Estado/filtro | Búsqueda/categoría modifican listado |
| Persistencia | vi.spyOn verifica localStorage; se prueban JSON inválido/fallo de almacenamiento |
| Elemento inexistente | ID no válido muestra detalle no encontrado y opción de volver |

Las pruebas del ejemplo cultural que no corresponden al producto NutriVida se marcan explícitamente como sustituidas; no se inventa inventario, API ni una operación de negocio.

## Mocks, cobertura y resultados observados

- Spy: vi.spyOn(Storage.prototype, "setItem") registra una escritura real y se restaura.
- Mock: vi.fn() reemplaza callbacks de componentes y verifica llamada/argumentos, sin ejecutar pagos, API ni email.
- No se añade un servicio async simulado: el producto no tiene API asíncrona; introducirla sin necesidad de dominio cambiaría el caso sin fundamento.
- Statements mide sentencias; Branches, caminos condicionales; Functions, funciones invocadas; Lines, líneas recorridas. Cobertura alta no garantiza calidad, pero ayuda a descubrir código no ejecutado.

En [CI run 38802384128](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128), commit 5d9ce30e4ed3b14b2b3688d13d5f76fffbd8af62: 7/7 archivos y 64/64 casos aprobados; 100 % en las cuatro métricas V8 configuradas; build de producción exitoso. El alcance excluye tests/setup y src/main.jsx, y no mide el frontend HTML/JS antiguo de EP1.

## Ensayo sugerido (12 minutos por estudiante)

1. 2 min: problema, arquitectura React/Vite y rutas.
2. 3 min: componente propio, props, estado y Bootstrap.
3. 2 min: responsividad en varios anchos.
4. 3 min: los diez tests de su suite y un mock/spy.
5. 2 min: métricas reales, una decisión de cobertura y limitaciones.

Cada estudiante debe abrir sus commits y justificar decisiones; memorizar un guion grupal no demuestra participación individual.

## Auditoría final

- [x] React/Vite estructurado y build aprobado.
- [x] Componentes, props y estado para la app React.
- [x] Diez pruebas separadas por integrante; 64/64 aprobadas en total.
- [x] Mock de callbacks y spy de persistencia útiles.
- [x] Informe con cuatro métricas al 100 % dentro del alcance configurado.
- [ ] Capturas reales de pruebas, interacción, mock/spy, coverage y navegador.
- [ ] Revisar/regenerar DOCX exigidos con resultados de esta versión.
- [ ] Confirmar Vitest frente a Jasmine/Karma con el docente.
- [ ] Generar y abrir ZIP final.
- [ ] Defensa oral individual de los tres integrantes.
- [ ] Despliegue EC2/Nginx si lo exige el curso.

La rúbrica global no se declara 100 % completa mientras queden evidencias/manuales/documentales pendientes.