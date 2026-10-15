# Guía 13 adaptada a Clínica NutriVida

**Guía de origen:** Guía Práctica 13, *Pruebas unitarias con Vitest, React Testing Library y primeras cinco pruebas*.  
**Punto documental importante:** esta guía del curso indica expresamente que se autorizó reemplazar Jasmine/Karma por Vitest integrado con Vite. La rúbrica impresa todavía nombra Jasmine/Karma; esa diferencia se documenta y debe confirmarse con el docente.

## Auditoría y adaptación punto por punto

| Punto de la guía original | Adaptación en NutriVida | Archivo/evidencia |
|---|---|---|
| 1. Propósito/resultados | Pruebas reproducibles de funciones, componentes y comportamientos del frontend NutriVida. | Suites bajo `src/`. |
| 2. Herramientas | Vitest ejecuta; jsdom aporta un DOM; React Testing Library consulta la interfaz; user-event simula acciones y jest-dom añade comparadores. | Dependencias de `package.json`, `src/test/setup.js`. |
| 3. Preparar el repo | Instalar con `npm ci` desde la raíz del proyecto existente. | `README.md`. |
| 4. Instalar dependencias | No repetir instalaciones si las dependencias ya están declaradas y el lockfile está sincronizado. | `package.json`, `package-lock.json`. |
| 5. Configuración de Vitest | jsdom, setup, CSS, limpieza de mocks y cobertura V8 se declaran en la configuración actual. | `vite.config.js`. |
| 6. Primera función pura | El formato de precios está separado de la presentación y se prueba por entradas válidas y no válidas. | `src/utils/precio.js`, `precio.spec.jsx`. |
| 7. Consultar la interfaz | Las pruebas consultan por rol y nombre accesible y no dependen de clases CSS internas. | Pruebas de catálogo, carrito y formularios. |
| 8. Componente y evento | Una tarjeta recibe props y se verifica que su callback se ejecute con el producto seleccionado. | `src/tests/integrante-1.catalogo.spec.jsx`. |
| 9. Resultados | `npm run test:run` ejecuta una vez; `npm run coverage` genera resumen de texto y HTML. | Workflow de GitHub Actions. |
| Trabajo autónomo/evidencias | Guardar evidencia del resultado, de una interacción y del callback simulado. | Checklist de cierre. |
| Cierre con Git | Mantener archivos de prueba asociados a comportamientos reales del caso. | Commits del repositorio. |

## Comandos

```bash
npm ci
npm run test:run
npm run coverage
npm run build
```

## Criterios de aceptación

- Vitest descubre y ejecuta las pruebas en modo no interactivo.
- Las pruebas verifican texto, props, estado, interacción y funciones de apoyo.
- `vi.fn` permite comprobar callbacks sin ejecutar efectos externos.
- Los espías se restauran y las pruebas no dependen de internet.
- El informe generado se revisa; no se reemplazan los resultados reales por valores escritos a mano.
