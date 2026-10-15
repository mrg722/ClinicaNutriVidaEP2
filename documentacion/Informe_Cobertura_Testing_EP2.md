# Informe de cobertura y testing · NutriVida EP2

## Estado del informe

Este documento se debe completar con los resultados de la ejecución de CI asociada al commit final. **No se asigna un porcentaje por adelantado.** El reporte HTML en `coverage/index.html` se genera con `npm run coverage`; el workflow sube el directorio como artefacto `cobertura-nutrivida`.

## Entorno y comandos

- Node.js: obtener versión desde el log de GitHub Actions.
- npm: obtener versión desde el log de GitHub Actions.
- Ejecutor: Vitest.
- Entorno DOM: jsdom.
- Interfaz: React Testing Library + user-event + jest-dom.
- Cobertura: V8.
- Comandos: `npm ci`, `npm run test:run`, `npm run coverage`, `npm run build`.

## Suites y alcance planificado

| Suite | Casos implementados | Alcance |
|---|---:|---|
| `src/App.test.jsx` | 10 | Portada, servicios guardados, localStorage, enlaces, footer, rutas |
| `src/tests/integrante-1.catalogo.spec.jsx` | 10 | Props de tarjeta, precio, imagen alternativa, enlace detalle, filtro y búsqueda |
| `src/tests/integrante-2.carrito.spec.jsx` | 10 | Carrito vacío, filas, subtotal/total, cantidades, eliminar y vaciar |
| `src/tests/integrante-3.formularios.spec.jsx` | 10 | Validación de reserva/contacto/cuenta y callbacks administrativos |
| `src/utils/precio.spec.jsx` | 4 | Precio gratis, positivo, negativo y no numérico |
| `src/utils/persistencia.spec.js` | 5 | Clave ausente, JSON válido/inválido, escritura y excepción de almacenamiento |
| **Total escrito** | **49** | El total aprobado debe confirmarse en CI; el número de casos en código no demuestra que pasen. |

## Resultados reales de ejecución

Completar desde la última ejecución exitosa sobre el commit que será entregado.

| Métrica | Resultado | Evidencia |
|---|---|---|
| Tests aprobados / fallidos | Pendiente de CI | Log de job de testing |
| Statements | Pendiente de CI | Resumen V8 |
| Branches | Pendiente de CI | Resumen V8 |
| Functions | Pendiente de CI | Resumen V8 |
| Lines | Pendiente de CI | Resumen V8 |
| Build | Pendiente de CI | Log de build |
| Captura de resolución a 375/768/1024/1440 px | Pendiente manual | Capturas del navegador |

## Interpretación requerida

- **Statements:** sentencias ejecutadas; identificar instrucciones no recorridas.
- **Branches:** caminos alternativos de condiciones; revisar ambos resultados de cada condición.
- **Functions:** funciones llamadas en al menos una prueba.
- **Lines:** líneas ejecutadas.
- La cobertura es una herramienta de detección de omisiones, no una garantía de calidad; validar que las expectativas verifican el comportamiento correcto.

## Mocks y espías

- `vi.fn()` sustituye callbacks y permite comprobar argumento/llamada en componentes.
- `vi.spyOn(Storage.prototype, "setItem")` observa escritura real de almacenamiento.
- `vi.restoreAllMocks()`/restauración evita contaminar otras pruebas.
- No hay llamadas de red ni API de reserva reales en el frontend, por lo que el plan no añade un mock de una API que el producto no tiene.

## Hallazgos y acciones

Completar tras leer el reporte HTML:
1. Archivo/función/ramas pendientes.
2. Riesgo o comportamiento no comprobado.
3. Prueba añadida o justificación explícita de la exclusión.
4. Reejecución posterior y enlace del commit que contiene la corrección.

## Evidencias para entregar

Capturas reales del comando de tests, un callback mock/spy, resumen y detalle HTML de cobertura, build exitoso, rutas y formularios en el navegador. Añadir al ERS las limitaciones demostrativas y actualizar este informe con resultados del commit final.
