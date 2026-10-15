# Guía 12 · Adaptación punto por punto a Clínica NutriVida

**Fuente:** Guía Práctica 12, *Diseño responsivo y despliegue en AWS: Bootstrap, compilación productiva y Nginx*.

## Matriz de las etapas originales

| Sección fuente | Adaptación | Archivo/acción | Estado honesto |
|---|---|---|---|
| 4. Preparar y ejecutar | Usar rama/repo existente; npm ci y npm run dev | README y package-lock | Instalación/build CI aprobado |
| 5. Grilla responsiva | Tarjetas responsive con una, dos y tres columnas | Productos.jsx | Código implementado |
| 6. Matriz de revisión | Comprobar overflow, menú, tarjetas, formulario, foco e imágenes en varios anchos | Checklist de evidencias | Capturas visuales pendientes |
| 7. Build de producción | Build y preview, no exponer servidor de desarrollo | Scripts build/preview | Build correcto en CI |
| 8. Crear EC2 | Instancia Ubuntu del curso, si el equipo tiene acceso | AWS Academy | Pendiente de infraestructura |
| 9. Llave SSH | Proteger .pem, limitar SSH y conectar a instancia real | PowerShell/SSH | Pendiente; nunca subir llave a Git |
| 10. Instalar Nginx | Instalar y comprobar con nginx -t/estado de servicio | EC2 | Pendiente de instancia |
| 11. Copiar build/permisos | Copiar contenido de dist, permisos de lectura y recorrido | /var/www/clinica-nutrivida | Procedimiento no ejecutado |
| 12. Configurar fallback SPA | try_files con fallback a index.html para rutas React Router | deploy/nginx-nutrivida.conf | Archivo creado, despliegue pendiente |
| 13. Diagnóstico | Configuración Nginx, servicio activo, HTTP, assets y reload de rutas | EC2/navegador | Pendiente hasta despliegue |
| Trabajo autónomo/evidencias | Capturas de build, navegación responsive, Nginx y ruta tras recarga | Informe/entrega | CI sí; capturas manuales no |
| Checklist/cierre Git | Registrar build/despliegue con evidencia real | Workflow/PR | No inventar IP, URL ni fecha |

## Grilla y revisión responsiva

El catálogo usa columnas xs=12, md=6 y lg=4. Los estilos definen alturas razonables para imágenes, espaciado móvil y foco visible.

| Ancho | Comprobación esperada | Evidencia |
|---:|---|---|
| 375 px | Menú colapsado, tarjetas apiladas, inputs utilizables, sin overflow | Captura real pendiente |
| 768 px | Dos tarjetas por fila donde corresponda, formularios legibles | Captura real pendiente |
| 1024 px | Catálogo y tabla administrativa sin desbordamiento | Captura real pendiente |
| 1440 px | Ancho máximo y lectura equilibrada | Captura real pendiente |

## Build local y Nginx

Comprobación local:

    npm ci
    npm run build
    npm run preview

Preview no es un despliegue público. El archivo deploy/nginx-nutrivida.conf sirve como configuración base: puerto 80, root /var/www/clinica-nutrivida, try_files con fallback SPA y caché para assets existentes.

Cuando el equipo tenga EC2, seguir este orden: build aprobado; copiar dist; comprobar usuario/permisos; validar Nginx; habilitar sitio; reload; abrir URL pública; probar /productos/EV002 y /carrito; recargar cada ruta directamente. Credenciales, IP, fecha y URL deben proceder de la instancia real. Sin esos pasos solo se puede marcar “configuración preparada”, no “desplegado”.

## Checklist

- [x] Grilla Bootstrap y build configurados.
- [x] Configuración Nginx con fallback SPA disponible.
- [ ] Capturas a 375/768/1024/1440 px.
- [ ] Revisar foco, etiquetas, tablas y ausencia de overflow en navegador.
- [ ] Despliegue EC2/Nginx real, si lo exige el curso, y verificación de URL/rutas.
- [ ] Evidencia de ruta interna tras reload.

La implementación no declara desplegado el producto mientras no exista una URL real verificada.