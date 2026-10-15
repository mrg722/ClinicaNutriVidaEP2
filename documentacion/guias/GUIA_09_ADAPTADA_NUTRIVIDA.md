# Guía 9 adaptada a Clínica NutriVida

**Fuente de trabajo:** Guía Práctica 9, *Primer proyecto React con Vite: Componentes, JSX y React Bootstrap*.  
**Regla de adaptación:** no crear un segundo proyecto ni sustituir NutriVida por Conecta Cultura. Se conserva el HTML de EP1 como referencia y se amplía la app React que ya existe en este mismo repositorio.

## Preparación adaptada (secciones 1–5)

1. **Propósito y resultados.** La app React debe utilizar JSX, componentes reutilizables, React Bootstrap y navegación clara. La portada y el catálogo mantienen nombre, textos e identidad de NutriVida.
2. **Herramientas.** Node.js compatible con Vite 7 (Node 22 recomendado), npm y Git.
3. **Clonar el repositorio existente.**
   ```bash
   git clone https://github.com/mrg722/ClinicaNutriVidaEP2.git
   cd ClinicaNutriVidaEP2
   npm ci
   npm run dev
   ```
   No ejecutar `npm create vite`, `git init` ni crear un repositorio adicional; Vite y Git ya están configurados.
4. **Conceptos en el caso real.** React renderiza la interfaz; Vite ejecuta y compila; JSX declara la UI; los componentes separan navegación, tarjetas y vistas.
5. **Estructura.** `src/main.jsx` monta React y carga Bootstrap; `src/App.jsx` establece el router y el estado global de la tienda; `src/components/` contiene piezas reutilizables; `src/pages/` contiene vistas; `src/data/productos.js` separa los datos del catálogo.

## Componentes y composición adaptados (secciones 6–10)

6. **Proyecto Vite.** Se aprovecha `package.json`, `vite.config.js`, `src/main.jsx` y `index.html` ya existentes. No se reemplaza la configuración de Vite por una plantilla nueva.
7. **JSX.** Cada componente retorna JSX y exporta su función. Los textos deben pertenecer a NutriVida, no al caso didáctico de actividades culturales.
8. **Componentes reutilizables.** `src/components/Navegacion.jsx`, `TarjetaProducto.jsx` y `PiePagina.jsx` separan menú, tarjeta de tienda y pie de página. Las vistas se encuentran en `src/pages/`.
9. **Componer la app.** `App.jsx` reúne navegación, rutas y pie de página. Las rutas delegan en los componentes de cada vista, sin duplicar toda la estructura en varios archivos.
10. **Bootstrap / React Bootstrap.** Bootstrap CSS se importa una vez desde `src/main.jsx`; React Bootstrap se usa en la navegación, tarjetas, formularios, tablas, filas y columnas.

## Publicación, evidencias y cotejo (sección 11 y cierre)

11. **Git.** El trabajo se desarrolla en una rama de adaptación revisable y después se integra mediante PR; no se vuelve a inicializar el repositorio. Los commits son pequeños y describen su guía y finalidad.

**Evidencias exigibles:** app ejecutándose; estructura de componentes; menú expandido y contraído en móvil; commit visible en GitHub.  
**Criterios de aceptación:** (a) se inicia con `npm run dev`; (b) existe composición real con componentes React; (c) Bootstrap está cargado sin duplicar importaciones; (d) la marca y los contenidos siguen siendo NutriVida; (e) no se versiona `node_modules`.

**Estado de la adaptación:** los componentes y la composición están incorporados en la rama. La verificación final queda sujeta al resultado de CI y a la revisión visual manual a 375 y 1200 px.