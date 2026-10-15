# Guía 9 · Adaptación punto por punto a Clínica NutriVida

**Fuente:** Guía Práctica 9, *Primer proyecto React con Vite: Componentes, JSX y React Bootstrap*.

**Decisión de adaptación:** la guía de ejemplo usa Conecta Cultura y propone crear otro repositorio React. NutriVida ya tiene un proyecto, React/Vite y los activos originales de EP1. Por eso se conserva este repo, se preservan los archivos originales HTML/JS como referencia y se amplía la app React; no se crea una app de Cultura ni una segunda copia.

## Matriz completa de transferencia

| Punto original | Adaptación al caso NutriVida | Archivo/evidencia | Criterio |
|---|---|---|---|
| 1. Propósito | Entender componentes y migrar partes concretas, no toda la web en una sola pasada | App React existente | La clínica mantiene nombre, textos e imágenes |
| 2. Resultados de aprendizaje | Distinguir React, Vite, JSX, componente, imports/exports y Bootstrap usando el caso real | README y ERS | Cada integrante puede explicar cada término con código propio |
| 3. Ruta de sesión | Herramientas → JSX → componentes → React Bootstrap → Git | Historial de commits | Cambios trazables por finalidad |
| 4. Preparar trabajo | Verificar Node/npm/Git; entrar al repo y ejecutar instalación desde lockfile | README, package.json | Instalar sin duplicar proyecto |
| 5. Qué resuelve React | Reutilizar UI y componer una vista en componentes, en lugar de copiar encabezados/tarjetas | src/components y src/pages | Cada bloque tiene responsabilidad |
| 6. Crear proyecto con Vite | El proyecto Vite ya existe; no ejecutar create-vite ni git init | index.html, src/main.jsx, vite.config.js | Se conserva configuración y Git |
| 7. Leer JSX | Usar estructura semántica, expresiones, atributos y fragmentos JSX | Inicio.jsx, TarjetaProducto.jsx | JSX compila y es legible |
| 8. Crear componentes | Separar navegación, tarjeta de producto y pie de página | Navegacion.jsx, TarjetaProducto.jsx, PiePagina.jsx | Componentes reutilizables |
| 9. Componer App | App compone vistas por rutas; no duplica página completa por vista | src/App.jsx | Cada ruta apunta a su página |
| 10. React Bootstrap | Importar Bootstrap CSS una sola vez y usar Navbar, Container, Card, Form, Row/Col y Button | src/main.jsx, src/components, src/pages, src/styles.css | Menú adaptable y controles consistentes |
| 11. Publicar en GitHub | Trabajar en rama e integrar por PR; no reinicializar repositorio | Rama adaptacion-guias-9-14-nutrivida y workflow | CI verde, historial y trazabilidad |

## Preparación y comandos adaptados

En Windows o en la terminal integrada de VS Code:

    node --version
    npm --version
    git --version
    git clone https://github.com/mrg722/ClinicaNutriVidaEP2.git
    cd ClinicaNutriVidaEP2
    npm ci
    npm run dev

Vite muestra la URL local en terminal. Para producción se usan npm run build y npm run preview. Live Server no valida el router React de producción.

## Transferencia de los componentes del ejemplo al dominio

- Cabecera/Navegación pasa a ser el menú real de la clínica y sus vistas.
- TarjetaActividad se adapta a TarjetaProducto: nombre, categoría, imagen, precio y acción de carrito.
- Cartelera se transforma en catálogo construido desde los datos originales.
- La grilla de 12 columnas se implementa con React Bootstrap: una columna en móvil, dos en tamaño mediano y tres en escritorio.
- No se introducen actividades culturales, inscripciones, precios aleatorios ni categorías ajenas al proyecto.

## Evidencias, checklist y cierre de Git

- [x] React/Vite existente reutilizado sin crear otro repo.
- [x] Componentes propios y JSX compuestos por App.
- [x] Bootstrap CSS cargado globalmente desde la entrada React.
- [x] Se conservan nombre, imágenes y datos de NutriVida.
- [x] Workflow de CI comprueba build de producción.
- [ ] Capturas manuales de menú a 375 px y layout a 1200 px.
- [ ] Cada integrante explica React, Vite, JSX, componentes y Bootstrap con su propio código.

Cierre adaptado: no ejecutar git init. Revisar git status, registrar commits descriptivos e integrar mediante PR después de comprobar el resultado CI.