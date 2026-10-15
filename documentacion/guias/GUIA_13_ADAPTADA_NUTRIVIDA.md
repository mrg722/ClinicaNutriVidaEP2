# Guía 13 · Adaptación punto por punto a Clínica NutriVida

**Fuente:** Guía Práctica 13, *Pruebas unitarias con Vitest, React Testing Library y primeras cinco pruebas*.

**Herramientas:** la guía dice expresamente que la institución autorizó reemplazar Jasmine/Karma por Vitest integrado con Vite. El PDF de la rúbrica aún nombra Jasmine/Karma; la diferencia está registrada en la matriz y debe confirmarse con el docente antes de exponer.

## Matriz por sección

| Sección fuente | Adaptación a NutriVida | Archivo/acción | Verificación |
|---|---|---|---|
| 1–3. Propósito/resultados/ruta/vocabulario | Explicar ejecutor, entorno DOM, prueba y aserción con código de la tienda | Este documento e informe | Cada integrante explica conceptos |
| 4. Preparar y comprobar repo | Reutilizar repo/lockfile y ejecutar npm ci/npm run dev | README | CI instala y prueba |
| 5. Mapa de herramientas | Vitest ejecuta; jsdom simula DOM; RTL consulta interfaz; user-event genera acciones; jest-dom aporta matchers | package.json, setup.js | Las siete suites corren en CI |
| 6. Instalar dependencias | Paquetes ya incluidos, no duplicar instalación innecesaria | package.json/package-lock | npm ci |
| 7. Configurar Vitest | Vite plugin React se conserva; jsdom, test setup y cobertura configurados | vite.config.js | Tests, coverage y build |
| 8. Setup/scripts | setup.js importa jest-dom/vitest; scripts de pruebas por persona | src/test/setup.js, package.json | Comandos separados |
| 9. Función pura | Formateo de precio CLP adapta el ejemplo del precio de actividad | src/utils/precio.js y precio.spec.jsx | Cuatro casos |
| 10. Consultar UI | Consultar por rol, label y nombre accesible; evitar clases CSS frágiles | Suites RTL | Tests de headings, forms, botones, links y status |
| 11. Componente/evento | Tarjeta recibe props y llama al callback al agregar | TarjetaProducto.jsx y suite integrante 1 | vi.fn verifica argumento |
| 12. Ejecutar/leer/Git | Reejecutar tras correcciones y documentar el commit | Workflow | [CI: 64/64, coverage y build](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128) |

## Pruebas y evidencias

CI verificó 7/7 archivos, 64/64 casos y build de producción correcto. V8 reportó 100 % en Statements, Branches, Functions y Lines dentro del alcance configurado. Los casos por integrante se encuentran en src/tests/integrante-1.catalogo.spec.jsx, src/tests/integrante-2.carrito.spec.jsx y src/tests/integrante-3.formularios.spec.jsx.

## Transferencia del caso fuente

La guía origen prueba actividades culturales, cupos y onInscribir. NutriVida trabaja con servicios/talleres, códigos EV/TG, precios y carrito, por lo que no copiamos variables del otro proyecto como si existieran aquí. Se conservan los conceptos y tipos de test: props, callback, renderizado dinámico, filtro, persistencia y elemento inexistente. No se inventa una API de red.

## Lista de cotejo

- [x] Configuración reproducible y setup de jsdom.
- [x] Pruebas de función pura, componente y callback.
- [x] Tests basados en roles/labels/nombres accesibles.
- [x] Spy/mock restaurado y sin dependencias externas.
- [x] CI pasa con build y reporte de cobertura.
- [ ] Guardar capturas reales del entorno local para la entrega.
- [ ] Confirmar que el docente aplica autorización Vitest frente a Jasmine/Karma en la rúbrica.