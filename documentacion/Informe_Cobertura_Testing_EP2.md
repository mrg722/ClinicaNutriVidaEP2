# Informe de cobertura y pruebas · NutriVida EP2

## 1. Propósito

Documentar el alcance real del testing frontend, la relación entre requisitos y casos de prueba, los resultados de Vitest y las mejoras derivadas del reporte de cobertura. No se fijan porcentajes anticipados: se registran a partir de la última ejecución que corresponda al commit final.

## 2. Entorno

- Ejecutor: Vitest.
- DOM: jsdom.
- Interfaz: React Testing Library + user-event + jest-dom.
- Mocks y espías: `vi.fn()`, `vi.spyOn(Storage.prototype, "setItem")`.
- Cobertura: proveedor V8, reportes de terminal, HTML y lcov.
- Ejecución: `npm run test:run`, `npm run coverage`, `npm run build`.
- CI: workflow `.github/workflows/validar-frontend.yml`; almacena el reporte como artefacto de GitHub Actions.

## 3. Suites y requisitos verificados

| Archivo | Casos diseñados | Alcance |
|---|---:|---|
| `src/App.test.jsx` | 34 | Portada, servicios guardados, rutas, navegación y pie |
| `src/tests/integrante-1.catalogo.spec.jsx` | 10 | Props, imagen, precio, enlace, búsqueda, filtro y estado vacío |
| `src/tests/integrante-2.carrito.spec.jsx` | 10 | Vacío, cantidad, subtotal/total, callbacks, eliminar y vaciar |
| `src/tests/integrante-3.formularios.spec.jsx` | 10 | Reserva, contacto, registro y administración |
| `src/utils/precio.spec.jsx` | 4 | Precio cero, positivo, negativo y valor inválido |
| `src/utils/persistencia.spec.js` | 5 | Clave ausente, JSON correcto/malformado, spy y fallo de almacenamiento |
| `src/utils/validaciones.spec.js` | 8 | Correo, nombre, teléfono, fecha, horario y motivo |

**Total de casos ejecutados: 81.** El recuento y la aprobación se verificaron en la ejecución de CI citada abajo; el número de pruebas en los archivos, por sí solo, no demostraría que pasan.

## 4. Resultados de la ejecución verificada

**Commit de código comprobado:** `7e94488fc84861e83d7f84f3573a6d3a572a75f9`.  
**Ejecución:** [GitHub Actions #38815259946](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38815259946), terminada correctamente el 15 de octubre de 2026.

| Métrica | Resultado medido | Evidencia |
|---|---:|---|
| Archivos de prueba aprobados | 7/7 | Log de CI |
| Tests aprobados/fallidos | 81/81 · 0 fallidos | Log de CI |
| Statements | 100 % | Resumen V8 |
| Branches | 100 % | Resumen V8 |
| Functions | 100 % | Resumen V8 |
| Lines | 100 % | Resumen V8 |
| Build de producción | Exitoso | Log de CI |
| Revisión visual responsive | Pendiente manual | Capturas 375, 768 y 1200 px |

Los porcentajes cubren los archivos incluidos por la configuración V8: `src/**/*.{js,jsx}`, excluyendo las pruebas, el archivo de configuración de pruebas, `src/main.jsx` y el código de preparación. El 100 % medido no equivale a haber hecho una revisión visual del navegador ni a haber realizado la presentación individual.

## 5. Mocks y espías

- `vi.fn()` simula el callback de un componente y permite comprobar sus argumentos, sin ejecutar una operación externa.
- `vi.spyOn(Storage.prototype, "setItem")` observa la llamada a la persistencia y comprueba clave/JSON.
- El storage de prueba se limpia y los espías se restauran para no afectar otros casos.
- No se inventa un servicio asíncrono de red para usar `mockResolvedValue`: el frontend actual no tiene una API/backend. Se simulan las dependencias reales del alcance.

## 6. Cómo interpretar el reporte

- **Statements:** sentencias ejecutadas.
- **Branches:** caminos alternativos de condiciones.
- **Functions:** funciones invocadas.
- **Lines:** líneas ejecutadas.

En la ejecución citada, los cuatro indicadores V8 llegaron a 100 % dentro del alcance definido y el resumen no informa líneas ni ramas sin recorrer. Esto no demuestra por sí solo calidad: cada aserción debe ser útil para detectar regresiones y el resultado automático no sustituye las pruebas visuales/manuales.

## 7. Trazabilidad de requisitos

Las pruebas del catálogo se vinculan con RF-02/RF-03; las del carrito con RF-05/RF-06; las de utilidades con precios/persistencia/validaciones; y las de formularios con RF-08/RF-09/RF-10. La navegación y la inspección de rutas se complementan con pruebas del App y revisión manual.

## 8. Evidencias para la entrega

- Captura real de la ejecución completa.
- Captura de una interacción/callback y del spy de persistencia.
- Resumen y detalle HTML de cobertura.
- Capturas responsive y de una ruta interna tras recarga.
- ERS actualizado y consistente con el código.
- [Ejecución CI verificada #38815259946](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38815259946), correspondiente al commit de código indicado arriba.

Completar los resultados después de CI; no copiar porcentajes de un commit distinto sin indicar esa diferencia.
