# Clínica NutriVida · Evaluación Parcial 2

Frontend de Clínica NutriVida para DSY1104 Desarrollo FullStack II. La EP2 amplía el proyecto existente con React/Vite, conservando la identidad, los recursos y el catálogo del trabajo anterior.

## Cómo ejecutar

Requisitos: Node.js compatible con Vite 7 (se recomienda Node 22), npm y Git.

```bash
git clone https://github.com/mrg722/ClinicaNutriVidaEP2.git
cd ClinicaNutriVidaEP2
npm ci
npm run dev
```

Abre la dirección local que indique Vite. Para probar la aplicación React no uses Live Server: el punto de entrada es `index.html` + `src/main.jsx`. Las páginas HTML de EP1 permanecen en el repositorio.

## Comandos de comprobación

```bash
npm run test:run
npm run test:integrante-1
npm run test:integrante-2
npm run test:integrante-3
npm run coverage
npm run build
npm run preview
```

- `test:integrante-1`: catálogo, props, precios y filtros.
- `test:integrante-2`: carrito, cantidades, subtotal/total y callbacks.
- `test:integrante-3`: reserva, contacto, registro y administración.
- `coverage`: crea el reporte en `coverage/index.html`.
- `build` y `preview`: permiten revisar localmente el resultado de producción. Preview no es un despliegue público.

## Funcionalidades React

- Inicio y servicios de NutriVida.
- Catálogo desde los seis códigos/precios que ya constaban en `assets/js/detalle-producto.js`.
- Búsqueda, filtro y detalle por código.
- Carrito con cantidades, total y persistencia local.
- Formularios controlados de reserva y contacto, acceso/registro de demostración y administración local.
- Ruta 404 y navegación interna con React Router.

## Estructura principal

- `src/components/`: navegación, tarjeta de producto y pie de página.
- `src/pages/`: vistas.
- `src/data/productos.js`: productos originales convertidos a objetos.
- `src/utils/`: precio, persistencia y validaciones.
- `src/tests/`: diez pruebas individuales por integrante.
- `documentacion/guias/`: adaptaciones punto por punto de las Guías 9–14.
- `documentacion/RUBRICA_EP2_TRAZABILIDAD.md`: rúbrica oficial y evidencia de cada indicador.
- `documentacion/ERS_EP2_NutriVida.md`: especificación de esta versión.
- `documentacion/Informe_Cobertura_Testing_EP2.md`: alcance y resultados de pruebas.
- `deploy/nginx-nutrivida.conf`: configuración base Nginx para la SPA.

## Alcance real y límites

El carrito, los servicios guardados y los cambios del panel se guardan en el navegador; no hay base de datos compartida ni procesamiento de pagos. La reserva y el contacto validan datos en pantalla, pero no envían información a un servidor. El acceso es de demostración y no protege rutas. No uses contraseñas ni datos médicos reales.

La configuración Nginx no significa que la web ya esté publicada en EC2. Se necesita una instancia y acceso reales, además de verificar la URL pública y la recarga de las rutas.

## Guías, rúbrica y entrega

Empieza por [el índice de Guías 9–14 y rúbrica](documentacion/GUIAS_9_14_Y_RUBRICA.md). La [matriz de rúbrica](documentacion/RUBRICA_EP2_TRAZABILIDAD.md) separa el trabajo implementado de las comprobaciones que exigen evidencia manual.

La Guía 13 del curso declara que fue autorizado reemplazar Jasmine/Karma por Vitest; el PDF de la rúbrica aún nombra Jasmine/Karma. Conviene confirmar esa equivalencia con el docente antes de la presentación.

Los documentos Markdown quedan como referencia del código. Para la entrega requerida, revisa los DOCX existentes y actualízalos con los resultados del commit final. Para generar el ZIP desde un commit confirmado en Git:

```powershell
git archive --format=zip --output=NutriVida-EP2.zip HEAD
```

Abre el ZIP y comprueba su contenido antes de entregarlo.

## Integrantes registrados en el trabajo de EP1

Martin Reyes · Martin Lara · Diego Adan
