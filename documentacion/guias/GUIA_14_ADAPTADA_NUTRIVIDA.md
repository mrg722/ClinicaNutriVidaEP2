# Guía 14 adaptada a Clínica NutriVida

**Guía de origen:** Guía Práctica 14, *Cobertura, mocks y preparación evaluativa*.  
**Regla aplicada:** mantener las pruebas vinculadas a conductas del producto. No se crea un servicio asíncrono artificial, porque el frontend actual no declara una API ni un backend.

## Auditoría y adaptación punto por punto

| Punto de la guía original | Adaptación en NutriVida | Archivo/evidencia |
|---|---|---|
| 1. Preparar y ejecutar | Se usa este repositorio, con `npm ci`, las pruebas y el build. | `README.md`, workflow. |
| 2. Plan de diez pruebas | Hay una batería de diez pruebas por integrante para que cada persona pueda demostrar comportamientos distintos. | `src/tests/integrante-1.catalogo.spec.jsx`, `integrante-2.carrito.spec.jsx`, `integrante-3.formularios.spec.jsx`. |
| 3. Espía de persistencia | `vi.spyOn(Storage.prototype, "setItem")` observa la escritura real y comprueba la clave y el JSON serializado. | `src/utils/persistencia.spec.js`. |
| 4. Mock de callback | `vi.fn()` simula callbacks de añadir/eliminar y registrar el producto, permitiendo comprobar argumentos sin ejecutar un efecto externo. | Suites de integrantes 1–3. |
| 5. Mock asíncrono de servicio | No se añade el ejemplo `mockResolvedValue` a producción: NutriVida no tiene un servicio de red. Para no inventar arquitectura, se prueba la dependencia real existente (callbacks y almacenamiento). | Declaración de alcance en este documento. |
| 6. Generar cobertura | `npm run coverage` ejecuta Vitest y calcula Statements, Branches, Functions y Lines. | `vite.config.js`, artefacto de CI. |
| 7. Interpretar el reporte | Identificar funciones y condiciones no recorridas y decidir si hay un comportamiento real del caso que falte probar. Cobertura no equivale a calidad por sí sola. | Informe de cobertura. |
| 8. Documento de cobertura | Registrar entorno, alcance, suites, métricas reales, hallazgos y evidencia. | `documentacion/Informe_Cobertura_Testing_EP2.md`. |
| 9. Actualizar ERS | Describir arquitectura, rutas, requisitos, persistencia local y límites del frontend actual. | `documentacion/ERS_EP2_NutriVida.md`. |
| 10. Ensayo de presentación | Cada integrante debe abrir sus pruebas, mostrar componente/props/estado/Bootstrap y explicar una métrica y un spy/mock. | Matriz de rúbrica y checklist. |
| 11. Auditoría final | Comprobar ejecución, cobertura, build, documentos y paquete comprimido. | Matriz `documentacion/RUBRICA_EP2_TRAZABILIDAD.md`. |
| 12. Evidencias/lista de cotejo | Capturas de pruebas, mock/spy, cobertura y navegador son pasos manuales; no se fingen ni se marcan sin obtenerlas. | `documentacion/EVIDENCIAS_PENDIENTES_EP2.md`. |
| 13. Cierre con Git | Revisar estado y generar el ZIP de la revisión final desde un commit confirmado. | Instrucciones de entrega en `README.md`. |

## Comandos de cierre

```bash
npm ci
npm run test:run
npm run test:integrante-1
npm run test:integrante-2
npm run test:integrante-3
npm run coverage
npm run build
```

En PowerShell, tras revisar que el commit incluye la documentación definitiva, se puede empaquetar sin incluir `node_modules`:

```powershell
git archive --format=zip --output=NutriVida-EP2.zip HEAD
```

## Criterios de aceptación

- Cada integrante dispone de diez pruebas diferentes y las puede ejecutar por separado.
- Las pruebas verifican comportamiento, no solo que un componente se renderice.
- Existe al menos un spy y mocks de callbacks útiles.
- El informe de cobertura registra métricas producidas por una ejecución identificada.
- ERS, código y matriz de requisitos describen la misma versión.
- Cada integrante practica la defensa de su contribución; una batería compartida no demuestra por sí sola la defensa individual.


## Resultado automatizado medido

La ejecución [GitHub Actions #38815259946](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38815259946), sobre el commit de código `7e94488fc84861e83d7f84f3573a6d3a572a75f9`, terminó con:
- 81/81 pruebas aprobadas.
- 7/7 archivos de pruebas aprobados.
- Statements 100 %, Branches 100 %, Functions 100 % y Lines 100 % según V8, dentro del alcance configurado.
- Build de producción exitoso.

Las capturas del navegador, la inspección del artefacto HTML, la actualización de DOCX/ZIP y la defensa oral permanecen como tareas externas, listadas en `documentacion/EVIDENCIAS_PENDIENTES_EP2.md`.
