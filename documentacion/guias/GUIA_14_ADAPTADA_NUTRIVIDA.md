# Guía 14 adaptada a Clínica NutriVida

**Fuente de trabajo:** Guía Práctica 14, *Cobertura, mocks y preparación evaluativa*.  
**Objetivo:** pasar de pruebas individuales a un proceso trazable. No se persigue un porcentaje “decorativo”; primero se validan comportamientos reales y luego se usan las ramas no cubiertas como guía de mejora.

## Punto por punto

1. **Clonar y ejecutar.** Usar este repositorio y sus scripts actuales. `npm ci` reproduce dependencias con `package-lock.json`.
2. **Diez pruebas (secciones 4–5).** Cada integrante dispone de diez casos propios:
   - Integrante 1: `src/tests/integrante-1.catalogo.spec.jsx`.
   - Integrante 2: `src/tests/integrante-2.carrito.spec.jsx`.
   - Integrante 3: `src/tests/integrante-3.formularios.spec.jsx`.
   Se suman a `src/App.test.jsx` y las pruebas de utilidades. Los diez de cada suite deben pasar por separado.
3. **Espías.** `src/utils/persistencia.spec.js` usa `vi.spyOn(Storage.prototype, "setItem")` para comprobar la clave y el JSON serializado. La suite base también observa la persistencia de servicios guardados.
4. **Mocks.** Las funciones `vi.fn()` sustituyen callbacks en pruebas de componentes y permiten verificar las llamadas y los argumentos sin ejecutar pagos, reservas o APIs reales. La app no tiene un backend asíncrono declarado; no se inventa uno solo para reproducir el ejemplo `mockResolvedValue` de Conecta Cultura.
5. **Cobertura (secciones 8–9).** Ejecutar `npm run coverage`; abrir `coverage/index.html`; analizar Statements, Branches, Functions y Lines. Registrar los valores que produzca la ejecución real, no valores esperados.
6. **Informe.** Relacionar requisitos, archivo de prueba, expectativa, resultado y evidencia. Explicar al menos una omisión y qué prueba adicional la corrige.
7. **ERS.** Mantener arquitectura, rutas, estado/persistencia local, funcionalidades, límites de la demo y correspondencia con los tests alineados con el código real. Se conserva el DOCX existente como archivo de entrega, pero debe regenerarse o revisarse manualmente con los nuevos contenidos antes de entregarlo.
8. **Defensa.** Cada integrante abre su propio conjunto de diez tests, explica props/estado/Bootstrap, muestra una interacción y justifica el significado de la cobertura. No basta memorizar un guion común.
9. **Auditoría de cierre.** Ejecutar test completo, cobertura, build, comprobar las URLs locales, revisar el ERS y el informe, y crear el ZIP desde un commit limpio mediante `scripts/empaquetar-entrega.ps1`.
10. **Evidencias.** Guardar capturas reales de pruebas aprobadas, espía/mock, resumen HTML de cobertura y resoluciones del navegador. No se marcan como existentes si todavía no se capturaron.

## Comandos de comprobación

```bash
npm ci
npm run test:run
npm run test:integrante-1
npm run test:integrante-2
npm run test:integrante-3
npm run coverage
npm run build
```

Para empaquetar en Windows PowerShell, tras confirmar los cambios en Git:

```powershell
.\scripts\empaquetar-entrega.ps1
```

**Resultado esperado:** una matriz de trazabilidad, diez tests diferenciados por persona, mocks/espías explicados, informe de cobertura generado y build correcto. La presentación oral, capturas reales y despliegue AWS continúan dependiendo de acciones fuera de CI.