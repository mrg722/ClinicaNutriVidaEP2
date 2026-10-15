# Guías 9–14 adaptadas y rúbrica EP2

Este índice corresponde al proyecto **Clínica NutriVida**. El repo actual es la base; no se reemplaza por Conecta Cultura ni se altera el propósito original de la clínica. Cada documento de guía incluye una matriz con el punto fuente, la adaptación en NutriVida, archivos implicados, evidencia y límites.

## Guías adaptadas y su implementación

| Guía | Ámbito original y adaptación | Implementación principal | Verificación |
|---|---|---|---|
| 9 | React, Vite, JSX, componentes Bootstrap y Git; se reutiliza el proyecto existente | src/App.jsx, src/components, src/pages, src/main.jsx | [CI build](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128), capturas responsive pendientes |
| 10 | Datos, props, listas, estado, carrito y persistencia local con los servicios originales | src/data/productos.js, src/utils/persistencia.js, Productos.jsx, Carrito.jsx | Pruebas del catálogo/carrito y suite integrada |
| 11 | React Router, parámetros, formularios controlados, vistas administrativas y 404 | src/App.jsx, src/pages | Tests y pruebas manuales de rutas directas/reload pendientes |
| 12 | Grilla responsiva, build/preview, Nginx fallback; EC2 requiere acceso real | src/styles.css, deploy/nginx-nutrivida.conf | Build CI aprobado; pruebas visuales y AWS real pendientes |
| 13 | Vitest, jsdom, RTL, primeras pruebas y mock de callback | vite.config.js, src/test/setup.js, src/utils/*.spec.jsx | [64/64 pruebas aprobadas](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128) |
| 14 | Diez pruebas por persona, spy/mock, análisis cobertura, ERS y defensa | src/tests/integrante-*.spec.jsx y documentación | 100 % V8 en Statements/Branches/Functions/Lines para el alcance configurado; capturas/manual/defensa pendientes |

## Decisiones de adaptación verificables

- Los códigos EV002–EV004 y TG001–TG003 y los precios del catálogo vienen del JS original de NutriVida, no de Conecta Cultura.
- Los identificadores de detalle son strings con prefijo; no se convierten en números.
- Carrito y altas/bajas de administración se guardan localmente; no se declara backend, usuarios reales, agenda real, correo ni pago.
- La fuente de Guía 14 pide mock asíncrono de un servicio de actividades. NutriVida no dispone de un servicio remoto y no se fabricó uno solo para copiar el ejemplo; se probaron callbacks con vi.fn y persistencia con vi.spyOn.
- Las condiciones de cupos/inscripción del ejemplo cultural no se declaran como función NutriVida; se sustituyen por pruebas relevantes de catálogo, carrito, forms, persistencia e IDs inexistentes.
- La Guía 13 indica que el reemplazo Jasmine/Karma por Vitest fue autorizado, mientras el PDF de la rúbrica sigue nombrando Jasmine/Karma. Se requiere confirmación docente para el criterio de herramientas.
- La Guía 12 exige pasos reales de EC2/Nginx. El archivo Nginx solo prepara el despliegue y no demuestra una URL pública.

## Documentación vinculada

- [Guía 9](guias/GUIA_09_ADAPTADA_NUTRIVIDA.md)
- [Guía 10](guias/GUIA_10_ADAPTADA_NUTRIVIDA.md)
- [Guía 11](guias/GUIA_11_ADAPTADA_NUTRIVIDA.md)
- [Guía 12](guias/GUIA_12_ADAPTADA_NUTRIVIDA.md)
- [Guía 13](guias/GUIA_13_ADAPTADA_NUTRIVIDA.md)
- [Guía 14](guias/GUIA_14_ADAPTADA_NUTRIVIDA.md)
- [Rúbrica EP2](RUBRICA_EP2_TRAZABILIDAD.md)
- [ERS Markdown adaptado](ERS_EP2_NutriVida.md)
- [Informe de cobertura medido](Informe_Cobertura_Testing_EP2.md)
- [Evidencias manuales pendientes](EVIDENCIAS_PENDIENTES_EP2.md)
