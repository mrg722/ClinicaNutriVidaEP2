# Guías 9–14 y rúbrica de la Evaluación Parcial 2

Este índice conecta las Guías Prácticas 9–14 con el código de **Clínica NutriVida** y con la rúbrica oficial DSY1104. La adaptación conserva el proyecto existente y usa sus nombres, archivos, servicios, códigos, precios e identidad.

## Guías adaptadas

| Guía | Mejora aplicada al proyecto | Código que lo demuestra |
|---|---|---|
| 9 · React/Vite/JSX/Bootstrap | Se repara la entrada React y se separan navegación, tarjetas, vistas y pie de página. | `src/App.jsx`, `src/components/`, `src/pages/Inicio.jsx`, `src/main.jsx`. |
| 10 · datos/props/estado/persistencia | Catálogo desde datos originales; filtros, estado compartido del carrito, cantidades y almacenamiento local. | `src/data/productos.js`, `src/pages/Productos.jsx`, `src/pages/Carrito.jsx`, `src/utils/persistencia.js`. |
| 11 · navegación y formularios | Rutas SPA, detalle por código original, validación de los formularios existentes y panel local. | `src/App.jsx`, `src/pages/Reserva.jsx`, `Contacto.jsx`, `Administracion.jsx`, `Acceso.jsx`. |
| 12 · responsive/build/Nginx | Grilla Bootstrap, foco visible, build de producción y configuración Nginx con fallback SPA. | `src/styles.css`, `src/pages/Productos.jsx`, `deploy/nginx-nutrivida.conf`. |
| 13 · pruebas con Vitest | Entorno jsdom, React Testing Library, user-event y pruebas unitarias. | `vite.config.js`, `src/test/setup.js`, `src/tests/`, `src/utils/*.spec.*`. |
| 14 · mocks/cobertura/defensa | Diez pruebas por integrante, spy de persistencia, callbacks simulados y reporte de cobertura. | Suites por integrante y `documentacion/Informe_Cobertura_Testing_EP2.md`. |

## Documentos

- [Adaptación Guía 9](guias/GUIA_09_ADAPTADA_NUTRIVIDA.md)
- [Adaptación Guía 10](guias/GUIA_10_ADAPTADA_NUTRIVIDA.md)
- [Adaptación Guía 11](guias/GUIA_11_ADAPTADA_NUTRIVIDA.md)
- [Adaptación Guía 12](guias/GUIA_12_ADAPTADA_NUTRIVIDA.md)
- [Adaptación Guía 13](guias/GUIA_13_ADAPTADA_NUTRIVIDA.md)
- [Adaptación Guía 14](guias/GUIA_14_ADAPTADA_NUTRIVIDA.md)
- [Rúbrica y trazabilidad](RUBRICA_EP2_TRAZABILIDAD.md)
- [ERS adaptado](ERS_EP2_NutriVida.md)
- [Informe de cobertura](Informe_Cobertura_Testing_EP2.md)
- [Evidencias pendientes](EVIDENCIAS_PENDIENTES_EP2.md)

## Decisiones verificables

1. La guía 9 explica crear un proyecto nuevo, pero NutriVida ya tiene Vite. Se repara y amplía ese proyecto, no se crea otro.
2. Los códigos, nombres, descripciones, imágenes y precios del catálogo proceden de `assets/js/detalle-producto.js`; no se sustituyen por datos del ejemplo cultural.
3. El formulario de reserva, contacto, acceso y administración conserva sus validaciones existentes.
4. El carrito/panel son demostraciones locales: no se afirma que existan backend, pagos, agenda, correo o autenticación real.
5. La Guía 13 proporcionada autoriza Vitest en lugar de Jasmine/Karma, pero el PDF de la rúbrica aún nombra Jasmine/Karma. Se registra la discrepancia para confirmarla con el docente.
6. La configuración Nginx no acredita un despliegue real. AWS, capturas del navegador y defensa requieren evidencias fuera del repositorio.
