# Guías 9–14 adaptadas y rúbrica EP2

Este índice adapta las seis guías al proyecto **Clínica NutriVida**. El repositorio existente es la base de la entrega; no se reemplaza por Conecta Cultura ni se cambia el nombre/propósito del caso.

## Guías adaptadas (secuencia de implementación)

| Guía | Adaptación al caso | Implementación principal | Evidencia que debe revisarse |
|---|---|---|---|
| 9 · React, Vite, JSX y React Bootstrap | Reutilizar la instalación React que ya tenía el repositorio y descomponer la interfaz NutriVida en componentes | `src/App.jsx`, `src/components/Navegacion.jsx`, `TarjetaProducto.jsx`, `PiePagina.jsx`, `src/pages/Inicio.jsx` | App en ejecución, estructura de componentes, navegación responsiva |
| 10 · Datos, props, estado y persistencia | Usar catálogo y precios reales del JS original; trasladar el carrito a estado React y localStorage | `src/data/productos.js`, `src/utils/persistencia.js`, `Productos.jsx`, `Carrito.jsx`, `App.jsx` | Filtro, cantidades, totales, recarga y administración local |
| 11 · Router y formularios | Mapear rutas al dominio NutriVida y validar formularios sin simular un backend inexistente | `src/pages/*`, rutas en `App.jsx` | Navegación interna/directa, 404, errores y envíos válidos |
| 12 · Responsividad y despliegue | Utilizar Bootstrap responsive y preparar build/Nginx con fallback SPA; EC2 requiere acceso real | `src/styles.css`, `vite.config.js`, `deploy/nginx-nutrivida.conf` | CI/build, inspección manual 375/768/1024/1440 px, URL pública si hay EC2 |
| 13 · Primeras pruebas | Mantener Vitest autorizado por la Guía 13 entregada, con jsdom y React Testing Library | `vite.config.js`, `src/test/setup.js`, `src/tests/`, `src/utils/*.spec.*` | Tests, consultas accesibles, callbacks y commits |
| 14 · Mocks, cobertura y defensa | Tres suites separadas de 10 casos, espías/mocks útiles, informe interpretado y preparación individual | `src/tests/integrante-*.spec.jsx`, `documentacion/RUBRICA_EP2_TRAZABILIDAD.md`, `documentacion/Informe_Cobertura_Testing_EP2.md` | CI, cobertura HTML, capturas reales, ERS y defensa |

## Decisiones de adaptación que evitan copiar el ejemplo incorrectamente

- Los identificadores del catálogo son códigos como `EV002` y `TG001`, de modo que el parámetro de ruta se compara como texto; no se transforma a número como en el ejemplo de Conecta Cultura.
- Los seis productos y sus precios provienen de `assets/js/detalle-producto.js`; no se inventaron otros precios para los productos originales.
- `localStorage` constituye persistencia local de demostración, no un backend, agenda, cuenta de usuario ni sistema de pagos.
- Los formularios explican que no envían datos a un servidor. Las contraseñas no se almacenan.
- La Guía 13 entregada declara que el reemplazo de Jasmine/Karma por Vitest fue autorizado. Como el PDF de la rúbrica aún nombra Jasmine/Karma, debe confirmarse con el docente para eliminar ese riesgo evaluativo.
- Un archivo Nginx no demuestra que la app está publicada: no se registrará IP/URL/fecha de EC2 sin despliegue verificado.

## Documentos de apoyo

- [Guía 9 adaptada](guias/GUIA_09_ADAPTADA_NUTRIVIDA.md)
- [Guía 10 adaptada](guias/GUIA_10_ADAPTADA_NUTRIVIDA.md)
- [Guía 11 adaptada](guias/GUIA_11_ADAPTADA_NUTRIVIDA.md)
- [Guía 12 adaptada](guias/GUIA_12_ADAPTADA_NUTRIVIDA.md)
- [Guía 13 adaptada](guias/GUIA_13_ADAPTADA_NUTRIVIDA.md)
- [Guía 14 adaptada](guias/GUIA_14_ADAPTADA_NUTRIVIDA.md)
- [Trazabilidad de la rúbrica oficial](RUBRICA_EP2_TRAZABILIDAD.md)
- [ERS adaptado a EP2](ERS_EP2_NutriVida.md)
- [Plantilla del informe de cobertura](Informe_Cobertura_Testing_EP2.md)
- [Lista de evidencias pendientes](EVIDENCIAS_PENDIENTES_EP2.md)
