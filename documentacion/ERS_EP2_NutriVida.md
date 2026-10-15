# ERS · Clínica NutriVida EP2

## 1. Propósito y alcance

NutriVida es un frontend académico de clínica nutricional y tienda de servicios. La EP2 actualiza parte de la interfaz al framework React, manteniendo recursos, identidad y datos del catálogo de EP1. La versión sigue siendo una demostración frontend; no hay backend, autenticación real, agenda conectada ni procesamiento de pagos.

## 2. Arquitectura técnica

- **Entrada:** `index.html` y `src/main.jsx`.
- **Aplicación/rutas/estado:** `src/App.jsx` y React Router.
- **Componentes comunes:** `Navegacion.jsx`, `TarjetaProducto.jsx`, `PiePagina.jsx`.
- **Vistas:** Inicio, Servicios, catálogo, detalle, carrito, reserva, contacto, administración, login/registro demo y 404.
- **Datos:** `src/data/productos.js` usa los identificadores, textos y precios del `assets/js/detalle-producto.js` original.
- **Estilos:** Bootstrap 5 / React Bootstrap y `src/styles.css`.
- **Persistencia local:** `src/utils/persistencia.js`, `localStorage`, sin garantía de sincronización entre usuarios/dispositivos.
- **Pruebas:** Vitest, jsdom, React Testing Library, user-event y proveedor de cobertura V8.

## 3. Rutas

| Ruta | Función |
|---|---|
| `/` | Portada con servicios guardables localmente |
| `/servicios` | Descripción de los servicios principales |
| `/productos` | Catálogo con búsqueda y filtro |
| `/productos/:id` | Detalle por código de producto |
| `/carrito` | Cantidades, eliminación, subtotal y total |
| `/reserva` | Validación frontend de solicitud de cita |
| `/contacto` | Validación frontend de mensaje |
| `/admin`, `/admin/productos` | Alta y eliminación local de productos |
| `/login`, `/registro` | Formularios de demostración sin autenticación |
| `*` | Página 404 |

## 4. Requisitos funcionales

| ID | Requisito | Implementación | Prueba/evidencia prevista |
|---|---|---|---|
| RF-01 | Mostrar portada y servicios guardables | `src/pages/Inicio.jsx` | `src/App.test.jsx` |
| RF-02 | Mostrar catálogo desde datos reutilizables | `src/data/productos.js`, `Productos.jsx` | Suite integrante 1 |
| RF-03 | Buscar y filtrar por categoría | `Productos.jsx` | Suite integrante 1 |
| RF-04 | Mostrar detalle por identificador o alternativa 404 de producto | `DetalleProducto.jsx` | Navegación manual + suite de catálogo |
| RF-05 | Agregar productos y ajustar/eliminar cantidades | `App.jsx`, `Carrito.jsx` | Suite integrante 2 |
| RF-06 | Calcular total por suma de precio × cantidad | `Carrito.jsx` | Suite integrante 2 |
| RF-07 | Persistir catálogo demo y carrito en el navegador | `persistencia.js`, efectos en `App.jsx` | Suite de persistencia + reload manual |
| RF-08 | Validar reserva: nombre, correo, servicio y fecha | `Reserva.jsx` | Suite integrante 3 |
| RF-09 | Validar contacto y longitud mínima de mensaje | `Contacto.jsx` | Suite integrante 3 |
| RF-10 | Crear/eliminar productos localmente desde administración | `Administracion.jsx` | Suite integrante 3 |
| RF-11 | Mostrar formularios de cuenta sin guardar contraseñas | `Acceso.jsx` | Suite integrante 3 |
| RF-12 | Navegar entre vistas y tratar URL desconocida | Router en `App.jsx` | `src/App.test.jsx` + verificación en navegador |

## 5. Requisitos no funcionales

- **Responsividad:** grilla Bootstrap `xs=12`, `md=6`, `lg=4`; validar con dimensiones 375, 768, 1024 y 1440 px.
- **Accesibilidad básica:** etiquetas asociadas, nombres de controles, mensajes cercanos, alt descriptivo de imágenes y foco visible.
- **Reproducibilidad:** `npm ci`, scripts de test/coverage/build y CI en GitHub.
- **Integridad de la demo:** no afirmar que una reserva fue confirmada ni que un mensaje se envió al servidor; no persistir contraseñas.
- **Despliegue:** build estático listo para servidor web; EC2 real necesita infraestructura/credenciales y verificación separadas.

## 6. Criterios de aceptación

1. Las rutas públicas principales se renderizan y los enlaces internos navegan dentro de React Router.
2. El catálogo corresponde a los datos del proyecto original y no usa códigos/precios inventados.
3. El carrito acepta altas/cambios/eliminaciones y conserva datos después de recargar el mismo navegador.
4. Los formularios muestran errores para datos inválidos y un mensaje explícito de demostración al validar entradas válidas.
5. Las pruebas se ejecutan de modo no interactivo y reportan resultados reales.
6. El informe de cobertura incluye alcance, exclusiones, métricas reales, hallazgos y pruebas asociadas.
7. La revisión responsive y la defensa individual se realizan manualmente y no se dan por satisfechas por compilar solamente.

## 7. Limitaciones

Persistencia local por navegador; datos de demostración; no existe backend de usuarios/productos/reservas, pagos, email, autorización de administración ni disponibilidad real de agenda. Los archivos HTML originales siguen en el repositorio para conservar el producto anterior, pero la entrada de la app React usa `index.html` + `src/main.jsx`.
