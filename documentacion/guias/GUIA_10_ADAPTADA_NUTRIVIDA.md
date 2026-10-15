# Guía 10 adaptada a Clínica NutriVida

**Guía de origen:** Guía Práctica 10, *Datos, props y estado en React: cartelera interactiva y persistencia simulada*.  
**Regla aplicada:** los ejemplos de actividades/inscripciones se traducen al catálogo de servicios y al carrito que ya pertenecían a la tienda de NutriVida.

## Auditoría y adaptación punto por punto

| Punto de la guía original | Adaptación en NutriVida | Archivo/evidencia |
|---|---|---|
| 1. Propósito | Separar los datos de la vista y permitir cambios por estado React. | `src/data/productos.js`, `src/pages/Productos.jsx`. |
| 2. Resultados de aprendizaje | Objetos, props, listas, `useState`, eventos y persistencia siguen siendo los conceptos enseñados. | Componentes y pruebas de los integrantes 1 y 2. |
| 3. Ruta de la sesión | Datos → tarjeta → lista → estado → persistencia → operaciones simples. | `src/data/`, `src/components/`, `src/App.jsx`. |
| 4. Preparar trabajo | Reutilizar esta copia del repo, instalar dependencias con `npm ci` y comprobar `npm run dev`. | `README.md`. |
| 5. Fuente de datos | La fuente conserva los seis códigos, nombres, descripciones, imágenes y precios encontrados en `assets/js/detalle-producto.js`. | `src/data/productos.js`. |
| 6. Props | La tarjeta recibe `producto` y `onAgregar`; el componente hijo no modifica las props. | `src/components/TarjetaProducto.jsx`. |
| 7. Renderizar arreglo | El catálogo usa `map` y la clave original del producto como `key`. | `src/pages/Productos.jsx`. |
| 8. Estado con `useState` | Búsqueda y categoría seleccionada se mantienen en estado; los resultados se derivan del catálogo sin mutarlo. | `src/pages/Productos.jsx`. |
| 9. Estado compartido | El carrito se mantiene en el componente raíz para que catálogo, detalle y carrito utilicen el mismo estado. | `src/App.jsx`, `src/pages/Carrito.jsx`. |
| 10. Persistencia con `useEffect` | Catálogo de demostración y carrito se serializan en `localStorage`; el lector gestiona una clave ausente, JSON inválido o almacenamiento bloqueado. | `src/utils/persistencia.js`, efectos de `src/App.jsx`. |
| 11. CRUD simulado | Administración añade y elimina productos a través de callbacks y estado, conservando la estructura del catálogo. Los cambios son locales al navegador. | `src/pages/Administracion.jsx`, `src/App.jsx`. |
| Trabajo autónomo | No se copian las ocho actividades/categorías de Conecta Cultura. Se usan los productos y categorías reales de NutriVida. | `src/data/productos.js`. |
| Evidencias/lista de cotejo | Probar filtro, búsqueda, agregar dos veces, aumentar/disminuir cantidad, quitar y recargar. | Suites de catálogo/carrito y checklist final. |

## Datos y persistencia

| Clave local | Finalidad | Límite |
|---|---|---|
| `nutrivida-guardados` | Servicios guardados desde la portada | No es una cuenta de usuario |
| `nutrivida-productos` | Altas/bajas académicas del catálogo | No se sincroniza entre navegadores |
| `carrito` | Productos y cantidades del carrito | No procesa pagos ni crea pedidos reales |

No se añaden pagos, backend o servicios remotos porque no existen en el caso implementado. Los identificadores y precios de los seis productos originales no se inventan ni se cambian en la migración.

## Criterios de aceptación

- El catálogo se genera a partir de un arreglo y las tarjetas reciben datos mediante props.
- La búsqueda y el filtro cambian los resultados.
- Los cambios del carrito son inmutables y recalculan total.
- Los valores persistidos se recuperan de forma segura.
- Los cambios administrativos se describen como simulación local y no como una base de datos compartida.
