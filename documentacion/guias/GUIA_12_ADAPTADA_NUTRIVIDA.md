# Guía 12 adaptada a Clínica NutriVida

**Fuente de trabajo:** Guía Práctica 12, *Diseño responsivo y despliegue en AWS: Bootstrap, compilación productiva y Nginx*.

## Punto por punto

1. **Grilla (sección 5).** `Productos.jsx` utiliza columnas `xs={12}`, `md={6}` y `lg={4}`: una tarjeta en móvil, dos desde md y tres desde lg. Se conserva React Bootstrap y la identidad visual actual.
2. **Auditoría responsive (sección 6).** Comprobar manualmente 375 px, 768 px, 1024 px y 1440 px. En cada ancho revisar menú, tarjetas, formularios, tablas administrativas, foco visible, etiquetas, alt de imágenes y ausencia de desbordamiento horizontal. Una matriz escrita no sustituye la inspección real del navegador.
3. **Build (sección 7).** Ejecutar:
   ```bash
   npm ci
   npm run build
   npm run preview
   ```
   `dist/` es el resultado compilado. El servidor de preview sirve para inspección local, no constituye un despliegue público.
4. **Instancia EC2 y acceso SSH (secciones 8–9).** El procedimiento original requiere cuenta/entorno AWS Academy, instancia Ubuntu, par de claves .pem y reglas de red. No se deben inventar IP, DNS, fechas o credenciales. Estos pasos quedan condicionados a disponer de acceso real a AWS.
5. **Nginx (sección 10).** Se añadió `deploy/nginx-nutrivida.conf`, ajustado al directorio `/var/www/clinica-nutrivida`.
6. **Copia del build y permisos (sección 11).** Una vez exista instancia, copiar únicamente el contenido de `dist/`, asignar lectura a Nginx y comprobar el sitio por HTTP. No publicar el servidor de desarrollo de Vite.
7. **Fallback SPA.** La configuración de Nginx incluye `try_files $uri $uri/ /index.html;`, necesario para que React Router procese las rutas internas al recargarlas.
8. **Rutas y evidencia final.** Probar inicio, catálogo, detalle, carrito, reserva, contacto y 404; capturar las cuatro resoluciones reales. Anotar IP/URL y fecha solo después de un despliegue real.

## Matriz responsive

| Ancho | Resultado esperado | Evidencia |
|---:|---|---|
| 375 px | Menú colapsado, tarjetas apiladas, controles utilizables | Captura de navegador requerida |
| 768 px | Dos columnas en catálogo, campos legibles | Captura de navegador requerida |
| 1024 px | Tres columnas en catálogo, tabla administrativa sin overflow | Captura de navegador requerida |
| 1440 px | Ancho máximo legible y espacios equilibrados | Captura de navegador requerida |

**Estado:** estilos y grilla implementados; compilación automática se comprobará en CI. El despliegue EC2 real y capturas de navegador son tareas manuales pendientes hasta disponer de infraestructura y evidencia. No declarar “desplegado” solo por tener el archivo Nginx.