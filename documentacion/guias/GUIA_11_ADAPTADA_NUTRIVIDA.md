# Guía 11 adaptada a Clínica NutriVida

**Guía de origen:** Guía Práctica 11, *Navegación y formularios en React: React Router, parámetros y vistas administrativas*.  
**Regla aplicada:** se conservan los campos y las validaciones de los formularios NutriVida que ya existían. Los ejemplos de actividades se sustituyen por códigos reales de servicios.

## Auditoría y adaptación punto por punto

| Punto de la guía original | Adaptación en NutriVida | Archivo/evidencia |
|---|---|---|
| 1. Propósito/resultados | La aplicación cambia de vista con React Router y conserva sus formularios. | `src/App.jsx`. |
| 2. Preparar el trabajo | Las dependencias se instalan desde el proyecto existente con `npm ci`; no se clona el proyecto de ejemplo. | `package.json`, `README.md`. |
| 3. Instalar/configurar Router | Se usa el `react-router-dom` ya declarado. `BrowserRouter` se monta una sola vez. | `src/App.jsx`. |
| 4. Crear páginas | Las vistas están separadas por responsabilidad: Inicio, Servicios, Tienda, Detalle, Carrito, Reserva, Contacto, Administración, Acceso y 404. | `src/pages/`. |
| 5. Declarar rutas | Se declaran rutas para las vistas principales, `/productos/:id`, `/admin/*`, `/login`, `/registro` y la ruta `*` para 404. | `src/App.jsx`. |
| 6. Navegar sin recargar | Menú, botones de llamada a la acción y enlaces internos usan `NavLink`/`Link`. | `src/components/Navegacion.jsx`, páginas. |
| 7. Parámetro de detalle | `useParams` recibe un código de texto como `EV002`; no se convierte a número. Si no existe se muestra una alternativa 404 del producto. | `src/pages/DetalleProducto.jsx`. |
| 8. Formulario controlado | Reserva mantiene valores en estado y valida nombre, correo permitido, teléfono, profesional, servicio, fecha, hora y motivo. | `src/pages/Reserva.jsx`, `src/utils/validaciones.js`. |
| 9. Validación de contacto | Contacto valida nombre, correo, teléfono, asunto y mensaje; expone los errores junto a los campos. | `src/pages/Contacto.jsx`. |
| 10. Vistas administrativas | El panel permite dar de alta y quitar servicios en el estado local; exige nombre/categoría/precio. | `src/pages/Administracion.jsx`. |
| 11. Estructura y acceso | El acceso/registro se conserva como demostración de perfiles; no se afirma que exista autenticación segura ni se guardan contraseñas. | `src/pages/Acceso.jsx`. |
| Trabajo autónomo | El ejemplo de alta de una actividad se adapta al catálogo ya presente, sin cambiar el modelo de negocio. | Administración y pruebas. |
| Evidencias/cierre | Verificar URL interna directa, recarga, registro, errores, formulario válido y ruta desconocida. | Tests automatizados más revisión manual final. |

## Rutas a verificar

- `/`
- `/servicios`
- `/productos`
- `/productos/EV002`
- `/carrito`
- `/reserva`
- `/contacto`
- `/admin`
- `/login`
- `/registro`
- una ruta inexistente para comprobar 404.

## Límites del caso

La reserva muestra validación de frontend, no agenda una cita real. Contacto no envía correo ni datos a un servidor. Administración es una vista didáctica sin autorización real. El inicio de sesión detecta un perfil de demostración y no protege recursos reales. Estos límites están descritos para no atribuir al proyecto funciones que no tiene.

## Criterios de aceptación

- Router y navegación funcionan sin reemplazar el documento en cada click.
- Un código existente se resuelve y uno desconocido no rompe la aplicación.
- Los formularios tienen valores controlados y muestran errores útiles.
- Las funcionalidades son coherentes con las reglas originales de NutriVida.
- El build desplegable debe probar el fallback de rutas antes de afirmar que la navegación directa queda resuelta en un servidor.
