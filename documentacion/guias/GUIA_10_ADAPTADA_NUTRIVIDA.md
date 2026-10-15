# Guía 10 adaptada a Clínica NutriVida

**Fuente de trabajo:** Guía Práctica 10, *Datos, props y estado en React: Cartelera interactiva y persistencia simulada*.  
**Regla de adaptación:** las estructuras culturales de ejemplo se reemplazan por los servicios y precios ya presentes en `assets/js/detalle-producto.js`. No se inventan códigos ni precios.

## Punto por punto

1. **Datos como objetos (sección 5).** `src/data/productos.js` centraliza los seis ítems originales: EV002, EV003, EV004, TG001, TG002 y TG003; conserva nombres, descripciones y precios de la versión JS existente, e importa las imágenes que ya están en `assets/img/`.
2. **Props (sección 6).** `TarjetaProducto` recibe `producto` y `onAgregar`. El hijo muestra el objeto recibido y notifica al padre al agregarlo; no modifica directamente la prop.
3. **Listas dinámicas (sección 7).** `Productos.jsx` transforma `productos` con `map` y usa `producto.id` como `key`. No se copian manualmente seis tarjetas de JSX.
4. **Estado (sección 8).** La búsqueda y la categoría seleccionada viven en `useState` dentro de `Productos.jsx`. El resultado visible se deriva del catálogo, sin alterar el arreglo original.
5. **Estado de carrito (sección 9).** `App.jsx` mantiene el carrito compartido para catálogo, detalle y página `/carrito`. Las operaciones agregan, incrementan, disminuyen, eliminan y vacían mediante actualizaciones inmutables.
6. **Persistencia (sección 10).** `leerJSON` y `guardarJSON` encapsulan `localStorage` en `src/utils/persistencia.js`; `useEffect` sincroniza `carrito` y la administración del catálogo. Los datos inválidos o un error de almacenamiento utilizan un fallback en lugar de romper la pantalla.
7. **CRUD de demostración (sección 11).** `Administracion.jsx` agrega y elimina productos desde el estado del catálogo. Es persistencia local del navegador, no un backend compartido entre usuarios.
8. **Trabajo autónomo.** El requisito “ocho actividades y cuatro categorías” pertenece a Conecta Cultura y no se copia literalmente. En NutriVida el criterio adaptado es usar todos los servicios identificados en la fuente original, permitir filtrar las categorías existentes y mostrar el estado vacío cuando no hay coincidencias.
9. **Evidencias y Git.** Las pruebas del catálogo y del carrito se separan en carpetas por integrante; los casos automatizados comprueban props, filtro, total, callbacks, límites y estados vacíos.

## Claves de persistencia

| Clave | Propósito | Límite |
|---|---|---|
| `carrito` | Productos seleccionados y cantidades | Solo existe en ese navegador |
| `nutrivida-productos` | Cambios académicos de catálogo | No es una base de datos compartida |
| `nutrivida-guardados` | Servicios guardados desde la portada | Preferencia local, no cuenta del usuario |

No almacenar contraseñas en `localStorage`; los formularios de acceso de esta entrega solo validan datos y muestran explícitamente que no hay autenticación real.

**Criterios de aceptación:** el catálogo se produce desde datos; el filtro y la búsqueda responden a acciones; cada tarjeta recibe props; las operaciones de carrito actualizan cantidades y total; la persistencia se recupera con recarga y maneja datos malformados; la administración crea y elimina elementos localmente.