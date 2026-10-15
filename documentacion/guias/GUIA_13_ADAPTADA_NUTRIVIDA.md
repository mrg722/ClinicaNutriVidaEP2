# Guía 13 adaptada a Clínica NutriVida

**Fuente de trabajo:** Guía Práctica 13, *Pruebas unitarias con Vitest, React Testing Library y primeras cinco pruebas*.  
**Herramientas declaradas por el material de clase:** la propia Guía 13 señala que se autorizó reemplazar Jasmine/Karma por Vitest integrado con Vite. La rúbrica impresa todavía nombra Jasmine/Karma; esta diferencia queda registrada para consulta con el docente.

## Punto por punto

1. **Repositorio y entorno.** No clonar el repositorio de Conecta Cultura ni copiar su modelo de datos. Ejecutar desde la raíz de NutriVida: `npm ci`, `npm run dev`, `npm run test:run`.
2. **Herramientas.** `vitest` ejecuta casos; `jsdom` simula objetos del navegador; React Testing Library consulta componentes por roles/nombres; `user-event` imita interacciones; `jest-dom/vitest` añade matchers de DOM.
3. **Dependencias.** Estas librerías ya están declaradas en `package.json`; no repetir `npm install` salvo que el lockfile no corresponda.
4. **Configuración (secciones 7–8).** `vite.config.js` configura jsdom, `src/test/setup.js`, CSS y cobertura V8. Los informes son texto, HTML y lcov.
5. **Función pura (sección 9).** `src/utils/precio.js` separa el formato de precio de los componentes; `precio.spec.jsx` comprueba gratis, precio positivo y valores inválidos.
6. **Componente (secciones 10–11).** `TarjetaProducto` se prueba por texto, imagen accesible, enlace, precio y callback. Las consultas prefieren rol y nombre accesible, no clases CSS.
7. **Convención de archivos.** Los nombres de tests terminan en `.spec.jsx` o `.test.jsx` y Vitest los detecta de forma automática.
8. **Comprobar cinco pruebas base.** NutriVida conserva las pruebas base de `src/App.test.jsx` y añade suites propias del caso; no se exige copiar literalmente las cinco pruebas de Conecta Cultura.
9. **Resultados y Git.** Ejecutar `npm run test:run`, corregir cualquier fallo y registrar qué comportamiento cubre cada caso antes de crear evidencia.

## Criterios de aceptación

- Pruebas reproducibles sin un navegador abierto.
- Aserciones para contenido, props, interacción y datos.
- Mocks/espías restaurados para no contaminar otras pruebas.
- No se escriben contraseñas reales ni se depende de APIs externas.

**Evidencia automática:** el workflow `.github/workflows/validar-frontend.yml` ejecuta las pruebas de forma automática en commits y pull requests; el enlace de Actions se adjunta en la matriz de rúbrica después de finalizar las ejecuciones.