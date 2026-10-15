# Clínica NutriVida · Evaluación Parcial 2

Frontend académico para DSY1104 Desarrollo FullStack II. Esta versión conserva el sitio original de la EP1 y añade la aplicación React/Vite como actualización progresiva del mismo proyecto.

## Ejecutar localmente

Requisitos: Node.js compatible con Vite 7 (se recomienda Node 22), npm y Git.

```bash
git clone https://github.com/mrg722/ClinicaNutriVidaEP2.git
cd ClinicaNutriVidaEP2
npm ci
npm run dev
```

Vite mostrará la URL local. La app React parte desde `index.html` y `src/main.jsx`; no usar Live Server para comprobar el router React. Las páginas HTML originales siguen en el repositorio como referencia y conservación del trabajo EP1.

## Comandos de validación

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
- `test:integrante-2`: cantidades, totales y callbacks del carrito.
- `test:integrante-3`: reserva, contacto, registro y administración.
- `coverage`: genera el reporte V8 en `coverage/index.html`.
- `build` + `preview`: comprueba la compilación de producción localmente. Preview no es un despliegue público.

## Aplicación React

Rutas centrales: Inicio, Servicios, Tienda, detalle `/productos/:id`, Carrito, Reserva, Contacto, Administración, Inicio de sesión, Registro y 404.

Tecnologías: React 19, Vite 7, React Router, Bootstrap 5, React Bootstrap, Vitest, jsdom y React Testing Library.

## Estructura principal

- `src/components/`: navegación, tarjetas y pie reutilizable.
- `src/pages/`: vistas y formularios controlados.
- `src/data/productos.js`: datos originales de la tienda y sus precios.
- `src/utils/`: formato de precios y persistencia local protegida ante datos inválidos.
- `src/tests/`: diez pruebas propuestas por integrante en cada suite individual.
- `documentacion/guias/`: adaptación punto por punto de las Guías 9–14 al proyecto.
- `documentacion/RUBRICA_EP2_TRAZABILIDAD.md`: indicadores, evidencias, pendientes y estado.
- `deploy/nginx-nutrivida.conf`: base de configuración Nginx para SPA.
- `scripts/empaquetar-entrega.ps1`: empaquetado de archivos confirmados por Git.

## Límites conocidos de la demostración

El catálogo, carrito y altas/bajas del panel se guardan en el navegador con `localStorage`; no existe backend ni sincronización entre dispositivos. Los formularios de reserva/contacto/acceso validan entradas, pero no envían datos ni crean cuentas reales. No introducir contraseñas ni información médica sensible.

El archivo Nginx prepara el fallback del router, pero la publicación real en EC2 requiere una instancia, llave y configuración de red provistas por el equipo/docente. No se declara desplegado hasta verificar una URL pública real.

## Guías y entrega

Empieza por [el índice de adaptación y trazabilidad](documentacion/GUIAS_9_14_Y_RUBRICA.md), revisa cada guía adaptada y contrasta la matriz de rúbrica. La pauta oficial conserva el nombre Jasmine/Karma, mientras que la Guía 13 entregada en el curso documenta la autorización de Vitest; consulta esa diferencia con el docente para la presentación individual.

Para generar el ZIP en Windows, confirma primero los archivos finales en Git y ejecuta en PowerShell:

```powershell
.\scripts\empaquetar-entrega.ps1
```

## Integrantes registrados en el trabajo EP1

Martin Reyes · Martin Lara · Diego Adan
