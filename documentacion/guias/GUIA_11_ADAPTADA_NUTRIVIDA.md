# Guía 11 · Adaptación punto por punto a Clínica NutriVida

**Fuente:** Guía Práctica 11, *Navegación y formularios en React: React Router, parámetros y vistas administrativas*.

## Matriz de secciones

| Punto original | Adaptación al caso | Archivo | Criterio comprobable |
|---|---|---|---|
| 4. Preparar/ejecutar repo | Reutilizar repo/lockfile; comprobar estado y servidor de desarrollo | README, package.json | npm ci y npm run dev |
| 5. Configurar router | react-router-dom ya está declarado; BrowserRouter se monta una sola vez | src/App.jsx | No se anidan routers |
| 6. Crear páginas | Vistas de NutriVida reemplazan páginas culturales | src/pages/*.jsx | Todos los imports existen |
| 7. Declarar rutas | Inicio, servicios, productos, detalle, carrito, reserva, contacto, admin, login, registro y 404 | src/App.jsx | Cada ruta muestra su componente |
| 8. Navegación SPA | Link/NavLink para rutas internas y ruta activa visible | Navegacion.jsx y páginas | No recarga documento al usar enlaces |
| 9. Parámetros dinámicos | ID se compara como texto, incluyendo prefijos EV/TG | DetalleProducto.jsx | EV002 abre; ID desconocido muestra alternativa |
| 10. Formulario controlado | Reserva con nombre, correo, servicio y fecha; value/onChange y mensajes | Reserva.jsx | Campos inválidos y caso válido |
| 10. Formulario adicional | Contacto con nombre, correo y mensaje mínimo | Contacto.jsx | Errores y estado de validación |
| 11. Administración | Crear/eliminar producto demo con validación | Administracion.jsx | Callbacks y almacenamiento local |
| Estructura de vistas | Acceso/registro demostrativos y 404 recuperable | Acceso.jsx, NoEncontrada.jsx | No se simula cuenta real |
| Trabajo autónomo/evidencias | Tests propios más integración y checklist manual | src/tests | CI y navegador |
| Cierre Git | Verificar rutas, resultados y commits | PR/Actions | No integrar si CI falla |

## Mapa de rutas

| Ruta | Función |
|---|---|
| / | Portada con guardado local de servicios |
| /servicios | Descripción de servicios principales |
| /productos | Catálogo con búsqueda y filtro |
| /productos/:id | Detalle por código de producto como texto |
| /carrito | Cantidades, eliminación, subtotal y total |
| /reserva | Validación frontend, no agenda real |
| /contacto | Validación frontend, no envío de email |
| /admin y /admin/productos | Administración local del catálogo |
| /login y /registro | Formularios demo, sin autenticación |
| * | 404 con retorno a inicio |

## Validación y límites

La guía original demuestra alta de actividad y detalle numérico; NutriVida usa formularios de reserva/contacto y administración. Los campos están controlados por estado, se valida submit y los errores se muestran junto al campo. No se afirma reserva confirmada, mensaje enviado o cuenta creada, porque no existe backend. Las contraseñas no se guardan.

## Criterios de aceptación

BrowserRouter único; enlaces internos correctos; detalle válido e inexistente; formularios controlados con errores específicos; administración actualizada mediante estado/callback; ruta desconocida con retorno. La recarga directa en build preview y las evidencias visuales deben comprobarse en navegador antes de la entrega.