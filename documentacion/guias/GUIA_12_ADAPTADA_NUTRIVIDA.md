# Guía 12 adaptada a Clínica NutriVida

**Guía de origen:** Guía Práctica 12, *Diseño responsivo y despliegue en AWS: Bootstrap, build productivo y Nginx*.  
**Regla aplicada:** se conservan Bootstrap, Vite y el sitio original. La configuración prepara una SPA, pero un archivo de Nginx no se presenta como despliegue realizado.

## Auditoría y adaptación punto por punto

| Punto de la guía original | Adaptación en NutriVida | Archivo/evidencia |
|---|---|---|
| 1. Preparar el trabajo | Utilizar el repo existente, instalar con `npm ci` y arrancar Vite. | `README.md`. |
| 2. Grilla responsiva | Catálogo: una columna base, dos desde `md` y tres desde `lg`. Las tablas están dentro de contenedores responsivos. | `src/pages/Productos.jsx`, `src/pages/Carrito.jsx`, `src/pages/Administracion.jsx`. |
| 3. Matriz de revisión | Inspeccionar desbordamiento horizontal, navegación móvil, legibilidad, formularios, foco y texto alternativo. | Checklist en `documentacion/EVIDENCIAS_PENDIENTES_EP2.md`. |
| 4. Build productivo | Ejecutar `npm run build` y revisar la aplicación con `npm run preview`. `dist/` es el resultado estático. | `package.json`, CI. |
| 5. Crear instancia EC2 | La guía exige una instancia y credenciales AWS reales. No se inventa IP, llave ni fecha de despliegue. | Paso externo pendiente si lo exige el docente. |
| 6. Llave/SSH | Seguir el procedimiento de la guía en el entorno AWS entregado; proteger la llave y comprobar acceso SSH. | Evidencia pendiente hasta contar con credenciales. |
| 7. Instalar Nginx | Preparar servidor HTTP en EC2 solo después de tener acceso real a la instancia. | `deploy/nginx-nutrivida.conf`. |
| 8. Copiar el build | Copiar el contenido de `dist/` al directorio definido y verificar permisos de lectura. No publicar el servidor Vite de desarrollo. | Ruta configurada en Nginx: `/var/www/clinica-nutrivida`. |
| 9. Fallback SPA | `try_files $uri $uri/ /index.html;` permite que las rutas de React se interpreten después de recargar. | `deploy/nginx-nutrivida.conf`. |
| 10. Diagnóstico | Ejecutar `sudo nginx -t`, recargar Nginx y probar la portada y una ruta interna por HTTP. | Pendiente de instancia real. |
| Trabajo autónomo/evidencias | Capturar 375, 768 y 1200 px según la guía; agregar una captura del sitio servido por Nginx y otra de la ruta tras recargar. | Capturas manuales pendientes. |

## Comprobación local

```bash
npm ci
npm run build
npm run preview
```

La vista previa local verifica el build, pero no equivale a una URL pública ni a un despliegue de EC2.

## Lista de revisión responsive

| Ancho de la guía | Resultado a observar |
|---:|---|
| 375 px | Menú contraído y contenido utilizable sin desbordamiento |
| 768 px | Dos columnas en el catálogo y formularios legibles |
| 1200 px | Tres columnas de catálogo y contenido de escritorio |

Comprobar además foco visible, etiquetas de formularios, alt de imágenes, contraste suficiente, tabla de administración y acciones del carrito. Los resultados y capturas se deben obtener en un navegador; la configuración CSS por sí sola no demuestra la inspección.

## Estado del despliegue

La configuración de Nginx queda preparada, pero la instancia EC2, la llave SSH, reglas de red, URL pública y prueba de recarga requieren infraestructura y acceso real. No se registrará una dirección pública ni se marcará EC2 como completado sin esa verificación.
