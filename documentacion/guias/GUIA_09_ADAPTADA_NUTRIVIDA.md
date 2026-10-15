# Guía 9 adaptada a Clínica NutriVida

**Guía de origen:** Guía Práctica 9, *Primer proyecto React con Vite: componentes, JSX y React Bootstrap*.  
**Regla aplicada:** se adapta el ejemplo de Conecta Cultura al repositorio y a la identidad de NutriVida. No se crea otro proyecto ni se reemplaza el trabajo de EP1.

## Auditoría y adaptación punto por punto

| Punto de la guía original | Adaptación en NutriVida | Archivo/evidencia |
|---|---|---|
| 1. Propósito | Mantener el sitio de clínica nutricional y construir la interfaz React por partes reutilizables. | Este repositorio y su árbol actual. |
| 2. Resultados de aprendizaje | React, Vite, JSX, componentes, React Bootstrap y Git permanecen como objetivos. | `package.json`, `src/main.jsx`. |
| 3. Ruta de la sesión | Se sigue el orden: herramientas, estructura, componentes, Bootstrap y publicación; no se reinicia el proyecto. | `README.md`. |
| 4. Preparar el trabajo | Comprobar Node, npm y Git; ejecutar `npm ci` desde la raíz. | `package.json`, `package-lock.json`. |
| 5. Qué problema resuelve React | La portada, navegación y tarjetas se forman con componentes en vez de duplicar la interfaz. | `src/App.jsx`, `src/pages/Inicio.jsx`. |
| 6. Crear el proyecto | La guía enseña `npm create vite`, pero NutriVida ya tiene Vite. Se reutiliza la configuración y **no** se crea un repositorio nuevo. | `index.html`, `src/main.jsx`, `vite.config.js`. |
| 7. Primera lectura de JSX | Los componentes devuelven JSX y mantienen la terminología, los textos y la marca de NutriVida. | `src/pages/Inicio.jsx`. |
| 8. Crear componentes | La cabecera/navegación, la tarjeta de producto y el pie quedan separados. | `src/components/Navegacion.jsx`, `TarjetaProducto.jsx`, `PiePagina.jsx`. |
| 9. Componer App | `App.jsx` conecta navegación, vistas, estado del catálogo y carrito. La ruta se declara una sola vez. | `src/App.jsx`. |
| 10. React Bootstrap | Se reutilizan Bootstrap y React Bootstrap ya declarados. El CSS de Bootstrap se importa una sola vez desde `src/main.jsx`. | `src/main.jsx`, `src/components/`, `src/pages/`. |
| 11. Repositorio y Git | Se trabaja sobre `main` de este proyecto y se conserva el HTML de EP1 como parte del mismo repositorio. | Historial Git y archivos originales. |
| Trabajo autónomo | El contenido de ejemplo se sustituye por la portada, servicios y catálogo originales. | Vistas Inicio, Servicios y Tienda. |
| Evidencias | Capturar la portada, navegación contraída/expandida y una tarjeta, si el docente lo solicita. | Evidencia manual pendiente en la lista de cierre. |
| Lista de cotejo/cierre | Verificar servidor Vite, componentes, Bootstrap, contenido NutriVida y estado Git. | Comandos de más abajo. |

## Comprobación

Desde la raíz del repositorio:

```bash
npm ci
npm run dev
```

Abrir la dirección local que imprime Vite. No utilizar Live Server para comprobar React Router: el punto de entrada de esta app es `index.html` + `src/main.jsx`.

## Criterios de aceptación

- La aplicación se monta con React/Vite y la interfaz se compone de componentes.
- No se crea un proyecto Vite paralelo ni se cambia la marca del caso.
- Bootstrap se carga una sola vez desde `src/main.jsx`.
- Se mantiene el sitio HTML original de EP1.
- `node_modules`, `dist` y `coverage` no se versionan.
