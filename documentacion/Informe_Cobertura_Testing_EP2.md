# Informe de cobertura y testing · NutriVida EP2

## 1. Ejecución verificada

La última ejecución de CI consultada terminó correctamente para el commit `5d9ce30e4ed3b14b2b3688d13d5f76fffbd8af62`.

- **Workflow:** [Validar frontend NutriVida — run 38802384128](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128)
- **Conclusión del job:** éxito.
- **Entorno configurado:** GitHub Actions, Ubuntu, Node.js 22.
- **Ejecutor:** Vitest; **DOM:** jsdom; **renderizado/interacción:** React Testing Library y user-event; **matchers:** jest-dom; **cobertura:** proveedor V8.
- **Comandos ejecutados por CI:** `npm ci`, `npm run test:run`, `npm run coverage`, `npm run build`.
- El workflow publica el directorio `coverage/` como artefacto `cobertura-nutrivida` durante 14 días.

### Resultados observados

| Medida | Resultado observado | Evidencia |
|---|---:|---|
| Archivos de test | 7/7 aprobados | [Log de CI](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128) |
| Casos de test | 64/64 aprobados | [Log de CI](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128) |
| Statements | 100 % | Resumen V8 en el log de cobertura |
| Branches | 100 % | Resumen V8 en el log de cobertura |
| Functions | 100 % | Resumen V8 en el log de cobertura |
| Lines | 100 % | Resumen V8 en el log de cobertura |
| Build de producción | Éxito | Mismo workflow |
| Análisis manual de interfaz en navegador | Pendiente | Requiere capturas reales del equipo |

Los porcentajes corresponden al alcance configurado en `vite.config.js`: `src/**/*.{js,jsx}`, excluyendo los archivos de test/setup y la entrada `src/main.jsx`. No representan una medición de todos los archivos HTML/JS originales de EP1, ni son garantía automática de calidad funcional.

## 2. Suites y distribución del testing

| Suite | Casos | Área |
|---|---:|---|
| `src/App.test.jsx` | 10 | Portada, guardados, almacenamiento, navegación, 404 y pie de página |
| `src/tests/integrante-1.catalogo.spec.jsx` | 10 | Props, tarjeta, precio, imagen accesible, enlace, búsqueda, filtro y vacío |
| `src/tests/integrante-2.carrito.spec.jsx` | 10 | Carrito vacío, líneas, cantidades, subtotal/total, eliminación y vaciado |
| `src/tests/integrante-3.formularios.spec.jsx` | 10 | Validación de reserva/contacto/registro y callbacks de administración |
| `src/tests/app-integracion.spec.jsx` | 15 | Rutas reales, carrito compartido, persistencia, catálogo, detalle y formularios |
| `src/utils/precio.spec.jsx` | 4 | Precios gratis, positivos, negativos y no numéricos |
| `src/utils/persistencia.spec.js` | 5 | Clave ausente, JSON válido/inválido, escritura y fallo de almacenamiento |
| **Total** | **64** | Todas aprobadas en el CI citado |

Los tres integrantes tienen una suite separada de diez casos. Las suites adicionales cubren regresión del núcleo React y utilidades. Esto no sustituye la demostración oral que debe realizar cada estudiante.

## 3. Relación de las pruebas con comportamientos

- **Componentes/props:** una tarjeta recibe un objeto de producto y callback; se comprueban el nombre, categoría, precio, texto alternativo, enlace y llamada al callback.
- **Estado:** filtros de catálogo; agregar un producto nuevo y aumentar un producto existente; cantidades y total; eliminación/vaciado del carrito.
- **Persistencia:** prueba con espía `vi.spyOn(Storage.prototype, "setItem")` para validar clave y contenido serializado; se prueba el fallback con texto JSON inválido, JSON válido de tipo incorrecto y excepción al escribir.
- **Formularios:** errores de campos obligatorios, correo incorrecto y mensaje corto; formularios válidos muestran confirmación de validación, no una afirmación de que el servidor realizó la operación.
- **Rutas:** detalle con ID real `EV002`, detalle inexistente, rutas públicas y página 404.
- **Mocks:** `vi.fn()` sustituye callbacks en el límite del componente y permite verificar que se invocan con argumentos precisos.

### Adaptación de los mocks asíncronos de la Guía 14

La guía de referencia propone `vi.fn().mockResolvedValue()` sobre un servicio asíncrono de actividades de Conecta Cultura. NutriVida, en el estado actual, no tiene una API o servicio asíncrono real para cargar el catálogo; introducir un servidor ficticio solo para imitar ese ejercicio alteraría el caso y crearía una capacidad que el producto no posee. Se adaptó el propósito de aislamiento mediante mocks de callbacks y espías reales de persistencia. La limitación queda registrada en la Guía 14; si el docente exige literalmente un mock de promesa, debe acordarse un servicio de dominio justificado antes de añadirlo.

## 4. Interpretación de métricas

- **Statements:** sentencias ejecutables que se recorrieron.
- **Branches:** rutas alternativas de condiciones; una prueba debe llegar a resultados verdaderos y falsos de cada condición de interés.
- **Functions:** funciones que se invocaron.
- **Lines:** líneas ejecutables que se recorrieron.

En el commit de CI citado, el reporte marca 100 % para las cuatro métricas dentro del alcance configurado. Esto indica ejecución de todo el código incluido por ese reporte; no certifica accesibilidad, diseño en dispositivos reales, todos los requisitos posibles, seguridad de producción, ni el comportamiento de archivos excluidos. El equipo debe mantener la revisión manual y las pruebas basadas en requisitos.

## 5. Límites explícitos de la demostración

- Catálogo, carrito y administración son locales a `localStorage`; no existe base de datos o sincronización entre usuarios/dispositivos.
- Reserva y contacto validan el frontend, pero no envían datos.
- Login/registro no autentican y no persisten contraseñas.
- No se procesa pago.
- La configuración de Nginx se preparó, pero el despliegue real de EC2, su URL pública, la verificación de rutas tras recarga y sus capturas dependen de infraestructura y credenciales que no están disponibles en la ejecución de CI.

## 6. Evidencias de entrega todavía requeridas

- [ ] Abrir y guardar las capturas reales de los tests, spy/mock, resumen HTML y archivos cubiertos.
- [ ] Revisar rutas, recarga directa, formularios y consola en navegador.
- [ ] Capturas responsive de 375, 768, 1024 y 1440 px.
- [ ] Regenerar o revisar los DOCX de ERS y cobertura existentes para que incluyan esta versión y estos resultados medidos.
- [ ] Confirmar con el docente la herramienta de test requerida: el PDF oficial menciona Jasmine/Karma, mientras que la Guía 13 entregada indica que la institución autorizó Vitest.
- [ ] Cada integrante debe ejecutar su comando de suite y ensayar la explicación de diez tests y mocks.
- [ ] Si se exige EC2: desplegar con Nginx, probar URL/rutas y registrar evidencias reales.
- [ ] Generar `deliverables/NutriVida-EP2.zip` después de confirmar el commit final y abrirlo para revisar su contenido.

**Conclusión del informe:** la automatización de pruebas/cobertura/build está aprobada en el workflow citado. Los puntos manuales/documentales e individuales siguen pendientes hasta que exista la evidencia correspondiente.
