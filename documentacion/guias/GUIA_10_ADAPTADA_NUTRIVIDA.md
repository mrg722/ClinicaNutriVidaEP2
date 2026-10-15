# Guía 10 · Adaptación punto por punto a Clínica NutriVida

**Fuente:** Guía Práctica 10, *Datos, props y estado en React: Cartelera interactiva y persistencia simulada*.

**Objetivo:** separar datos y presentación, usar props/estado, procesar eventos y persistir estado. La guía de origen modela actividades con cupos/inscripciones; NutriVida modela servicios y talleres con códigos/precios del sitio original. Se adapta el patrón, no se inventan cupos.

## Matriz por sección

| Punto original | Transferencia al proyecto | Archivo/evidencia | Criterio |
|---|---|---|---|
| 1–3. Propósito, resultados, ruta y vocabulario | Comprender objeto, arreglo, prop, estado, evento, inmutabilidad y localStorage con el catálogo real | Este documento, ERS y README | Explicación con ejemplos NutriVida |
| 4. Preparar repo | Usar rama/repo existentes; ejecutar npm ci, git status y npm run dev | package.json y README | Entorno reproducible |
| 5. Fuente de datos | Centralizar los seis servicios originales y sus imágenes | src/data/productos.js | Códigos, nombres y precios coinciden con assets/js/detalle-producto.js |
| 6. Props | La tarjeta recibe objeto producto y callback de agregar | src/components/TarjetaProducto.jsx | Presenta datos recibidos y no muta la prop |
| 7. Render del arreglo | Crear una tarjeta por objeto con map y key estable basada en id | src/pages/Productos.jsx | Todas las tarjetas nacen del arreglo |
| 8. Estado con useState | Búsqueda y filtro modifican qué elementos se ven sin mutar lista base | Productos.jsx | Pruebas de búsqueda/filtro/no-results |
| 9. Estado compartido de inscripciones | Se adapta a carrito: agregar, incrementar, reducir, borrar línea y vaciar | src/App.jsx y src/pages/Carrito.jsx | Total/filas reflejan el estado global |
| 10. Persistencia con useEffect | Guardar/restaurar carrito y catálogo de demostración en localStorage | src/utils/persistencia.js y App.jsx | Tests de persistencia; reload real queda como comprobación manual |
| 11. CRUD simulado | Alta y eliminación de servicios desde administración local | src/pages/Administracion.jsx | Validación, callback y actualización del catálogo |
| Trabajo autónomo/evidencias | Ejecutar casos del dominio NutriVida | Tres suites individuales y suite de integración | CI pasa con 64 casos |
| Checklist/cierre Git | Relacionar comportamiento, prueba y commit; no subir node_modules | .gitignore, workflow, PR | CI verde antes de merge |

## Datos de origen del catálogo

| Código | Servicio | Precio CLP original | Categoría |
|---|---|---:|---|
| EV002 | Bioimpedanciometría | 12.000 | Evaluación |
| EV003 | Encuesta de hábitos alimentarios | 10.000 | Evaluación |
| EV004 | Análisis de exámenes | 15.000 | Evaluación |
| TG001 | Taller de alimentación saludable | 15.000 | Taller |
| TG002 | Taller de cocina nutritiva | 20.000 | Taller |
| TG003 | Taller de nutrición para deportistas | 18.000 | Taller |

No se inventaron identificadores ni precios para el catálogo inicial. El panel puede agregar servicios locales de demostración, con ID nuevo, pero no representa un backend.

## Persistencia y límites

| Clave | Uso | Límite |
|---|---|---|
| carrito | Productos y cantidades | Solo el navegador actual |
| nutrivida-productos | Catálogo demo modificado | No se sincroniza entre usuarios |
| nutrivida-guardados | Servicios guardados desde Inicio | No es una cuenta de usuario |

leerJSON maneja clave ausente, JSON roto y tipo incorrecto con alternativa. guardarJSON devuelve false ante fallo de almacenamiento. No se almacenan contraseñas ni se persisten datos sensibles de reserva.

## Adaptaciones frente a la actividad cultural

- Los ejemplos de ocho actividades y cuatro categorías pertenecen a Conecta Cultura; aquí se usa el catálogo que existe.
- Los casos de cupos críticos y botón de inscripción deshabilitado no se copian como si NutriVida tuviera cupos en el catálogo React. Se prueban condiciones reales del producto: precio inválido, búsqueda/filtro vacíos, ID inexistente, cantidades y total del carrito.
- Estado se actualiza inmutablemente; props son de solo lectura.
- La persistencia es local y se etiqueta como demostración, no como base compartida.

## Criterios de aceptación

Catálogo desde datos; tarjeta parametrizada; búsqueda/filtro reactivos; operaciones de carrito inmutables; subtotal/total correcto; persistencia tolerante a valores inválidos; altas/bajas administrativas validadas; pruebas en CI y reload manual pendiente.