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
| `src/App.test.jsx` | 10 | Portada, servicios guardados, rutas, navegación y pie |
| `src/tests/integrante-1.catalogo.spec.jsx` | 10 | Props, imagen, precio, enlace, búsqueda, filtro y estado vacío |
| `src/tests/integrante-2.carrito.spec.jsx` | 10 | Vacío, cantidad, subtotal/total, callbacks, eliminar y vaciar |
| `src/tests/integrante-3.formularios.spec.jsx` | 10 | Reserva, contacto, registro y administración |
| `src/utils/precio.spec.jsx` | 4 | Precio cero, positivo, negativo y valor inválido |
| `src/utils/persistencia.spec.js` | 5 | Clave ausente, JSON correcto/malformado, spy y fallo de almacenamiento |
| `src/utils/validaciones.spec.js` | 8 | Correo, nombre, teléfono, fecha, horario y motivo |

**Total de casos definidos: 57.** El resultado aprobado se confirma en el log de CI; el número de pruebas en los archivos no es por sí solo evidencia de que pasan.

## 4. Resultados de la ejecución que se entregará

| Métrica | Resultado final | Evidencia |
|---|---|---|
| Tests aprobados/fallidos | Pendiente de la ejecución de este commit | Log GitHub Actions |
| Archivos de prueba aprobados | Pendiente de la ejecución de este commit | Log GitHub Actions |
| Statements | Pendiente de medir | Resumen V8 |
| Branches | Pendiente de medir | Resumen V8 |
| Functions | Pendiente de medir | Resumen V8 |
| Lines | Pendiente de medir | Resumen V8 |
| Build | Pendiente de la ejecución de este commit | Log GitHub Actions |
| Revisión visual responsive | Pendiente manual | Capturas 375, 768 y 1200 px |

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

Un porcentaje alto no demuestra por sí solo calidad. Se deben mirar las ramas no recorridas, confirmar que cada aserción detectaría una regresión y documentar la mejora o razón de exclusión.

## 7. Trazabilidad de requisitos

Las pruebas del catálogo se vinculan con RF-02/RF-03; las del carrito con RF-05/RF-06; las de utilidades con precios/persistencia/validaciones; y las de formularios con RF-08/RF-09/RF-10. La navegación y la inspección de rutas se complementan con pruebas del App y revisión manual.

## 8. Evidencias para la entrega

- Captura real de la ejecución completa.
- Captura de una interacción/callback y del spy de persistencia.
- Resumen y detalle HTML de cobertura.
- Capturas responsive y de una ruta interna tras recarga.
- ERS actualizado y consistente con el código.
- Identificador/link de la ejecución CI que corresponde al commit final.

Completar los resultados después de CI; no copiar porcentajes de un commit distinto sin indicar esa diferencia.
