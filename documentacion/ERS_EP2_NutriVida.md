# Especificación de Requisitos del Software (ERS) · NutriVida EP2

## 1. Propósito

Actualizar el frontend de Clínica NutriVida para la Evaluación Parcial 2 de DSY1104. La mejora incorpora React, componentes, navegación, formularios controlados, persistencia local y pruebas, conservando la marca y recursos del proyecto original.

## 2. Alcance y limitaciones

La entrega es un frontend académico. No hay backend de usuarios/productos, autenticación segura, pago, envío de correo ni agenda real conectada. El carrito y el catálogo de demostración se conservan en el navegador mediante localStorage; no se sincronizan entre dispositivos.

## 3. Arquitectura

- **Entrada:** `index.html` y `src/main.jsx`.
- **Aplicación, rutas y estado global:** `src/App.jsx`.
- **Componentes comunes:** `src/components/Navegacion.jsx`, `TarjetaProducto.jsx`, `PiePagina.jsx`.
- **Vistas:** `src/pages/Inicio.jsx`, `Servicios.jsx`, `Productos.jsx`, `DetalleProducto.jsx`, `Carrito.jsx`, `Reserva.jsx`, `Contacto.jsx`, `Administracion.jsx`, `Acceso.jsx`, `NoEncontrada.jsx`.
- **Datos del catálogo:** `src/data/productos.js`, adaptados desde `assets/js/detalle-producto.js`.
- **Utilidades:** `src/utils/precio.js`, `persistencia.js`, `validaciones.js`.
- **Estilos:** Bootstrap/React Bootstrap y `src/styles.css`.
- **Pruebas:** Vitest, jsdom, React Testing Library, user-event, jest-dom y proveedor V8.

## 4. Rutas de la aplicación

| Ruta | Función |
|---|---|
| `/` | Portada, servicios principales y guardar servicio localmente |
| `/servicios` | Servicios generales de la clínica |
| `/productos` | Catálogo de seis productos/servicios, búsqueda y filtro |
| `/productos/:id` | Detalle según código de producto |
| `/carrito` | Cantidades, eliminación, subtotal y total |
| `/reserva` | Validación frontend de solicitud de cita |
| `/contacto` | Validación frontend de datos y mensaje |
| `/admin/*` | Alta y eliminación local de productos |
| `/login` | Acceso de demostración por perfil |
| `/registro` | Validación de formulario de registro sin crear una cuenta real |
| `*` | Página 404 |

## 5. Requisitos funcionales

| ID | Requisito | Implementación | Verificación principal |
|---|---|---|---|
| RF-01 | Mostrar portada y servicios | `Inicio.jsx`, `Servicios.jsx` | `src/App.test.jsx` |
| RF-02 | Mostrar catálogo desde datos separados | `productos.js`, `Productos.jsx` | Suite integrante 1 |
| RF-03 | Buscar y filtrar el catálogo | `Productos.jsx` | Suite integrante 1 |
| RF-04 | Mostrar detalle válido o alternativa no encontrada | `DetalleProducto.jsx` | App test y navegación manual |
| RF-05 | Añadir, incrementar, disminuir o eliminar productos | `App.jsx`, `Carrito.jsx` | Suite integrante 2 |
| RF-06 | Calcular subtotales y total | `Carrito.jsx`, `precio.js` | Suite integrante 2 |
| RF-07 | Conservar catálogo/carrito en navegador | `persistencia.js`, efectos de `App.jsx` | Suite de persistencia y reload manual |
| RF-08 | Validar reserva | `Reserva.jsx`, `validaciones.js` | Suite integrante 3 |
| RF-09 | Validar contacto | `Contacto.jsx`, `validaciones.js` | Suite integrante 3 |
| RF-10 | Administrar productos en modo local | `Administracion.jsx` | Suite integrante 3 |
| RF-11 | Acceso/registro de demostración | `Acceso.jsx` | Revisión funcional/manual |
| RF-12 | Navegación interna y ruta 404 | Router en `App.jsx` | `src/App.test.jsx` y revisión manual |

## 6. Requisitos no funcionales

- **Responsividad:** Bootstrap con una, dos o tres columnas según breakpoint y tablas responsivas.
- **Accesibilidad básica:** etiquetas asociadas, texto alternativo, nombres de controles, errores vinculados y foco visible.
- **Reproducibilidad:** instalación con `npm ci`; pruebas, cobertura y build en GitHub Actions.
- **Integridad de alcance:** no afirmar que una reserva se confirmó, que se procesó un pago o que el registro creó un usuario real.
- **Seguridad de demostración:** no almacenar contraseñas ni introducir datos médicos reales.
- **Despliegue:** el build produce archivos estáticos; EC2 requiere credenciales e infraestructura reales.

## 7. Aceptación y evidencia

La aceptación exige que las rutas se abran, el catálogo conserve los datos del proyecto original, el carrito calcule importes y persista localmente, los formularios validen los datos y las pruebas cubran comportamientos relevantes. Build y pruebas se verifican con CI; la responsividad, la navegación tras recarga y la defensa requieren evidencia manual.
