# Guía 11 adaptada a Clínica NutriVida

**Fuente de trabajo:** Guía Práctica 11, *Navegación y formularios en React: React Router, parámetros y vistas administrativas*.  
**Decisión clave:** los códigos del catálogo de NutriVida son identificadores de texto (por ejemplo EV002), no números secuenciales. Por eso `useParams()` conserva el texto del parámetro y busca una coincidencia exacta, en vez de convertirlo con `Number(id)`.

## Punto por punto

1. **Router instalado y envuelto.** `App.jsx` declara `BrowserRouter` y el componente principal de rutas. No se agrega un segundo router dentro de `main.jsx`.
2. **Vistas de la guía.** Las vistas se adaptan a `Inicio.jsx`, `Servicios.jsx`, `Productos.jsx`, `DetalleProducto.jsx`, `Carrito.jsx`, `Reserva.jsx`, `Contacto.jsx`, `Administracion.jsx` y `NoEncontrada.jsx`.
3. **Mapa de rutas.** `/`, `/servicios`, `/productos`, `/productos/:id`, `/carrito`, `/reserva`, `/contacto`, `/admin`, `/admin/productos`, `/login` y `/registro`; la ruta `*` muestra una página 404.
4. **Navegación interna.** `Navegacion.jsx` usa `NavLink` y componentes Link para mantener navegación SPA; los enlaces activos se identifican visualmente.
5. **Detalle con parámetro.** `DetalleProducto.jsx` busca `productos.find(item => item.id === id)`. El caso inexistente muestra “Servicio no encontrado” y un enlace al catálogo.
6. **Formulario controlado de reserva.** `Reserva.jsx` guarda nombre, correo, servicio y fecha en estado; evita envío HTML tradicional, comprueba nombre/correo/servicio/fecha y muestra errores junto a los campos.
7. **Formulario de contacto.** `Contacto.jsx` valida nombre, correo y longitud mínima del mensaje. El mensaje final aclara que no se envía a un servidor.
8. **Administración.** `Administracion.jsx` valida nombre, categoría y precio antes de llamar a `onCrearProducto`; el padre actualiza catálogo mediante estado. El borrado también usa un callback explícito.
9. **Acceso y registro.** `Acceso.jsx` valida los campos del demo y no almacena claves ni afirma que se creó una cuenta o sesión.
10. **Trabajo autónomo y pruebas.** Los casos se distribuyen entre los archivos de pruebas de los tres integrantes. La navegación directa, rutas desconocidas, errores y formularios válidos deben comprobarse en Vitest y manualmente.

## Criterios de aceptación

- `BrowserRouter` envuelve la aplicación una sola vez.
- Todas las rutas internas usan `Link`/`NavLink`.
- Un ID de catálogo válido abre su detalle; uno inválido presenta una alternativa utilizable.
- Los campos controlados utilizan `value` y `onChange`.
- Los formularios muestran mensajes específicos para entradas inválidas y no aseguran operaciones de backend inexistentes.
- El panel se declara demostrativo; no representa un sistema real de autenticación/autorización.

**Verificación manual pendiente:** escribir rutas directamente y recargar el navegador en la compilación de producción y en un servidor configurado con fallback SPA.