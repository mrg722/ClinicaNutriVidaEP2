# Clínica NutriVida · Evaluación Parcial 2

Frontend académico para DSY1104 Desarrollo FullStack II. Esta versión conserva la web original de EP1 y amplía la app React/Vite dentro del mismo repositorio, con catálogo, detalle, carrito, persistencia local, formularios y administración demostrativa.

## Ejecutar localmente

Requisitos: Node.js compatible con Vite 7 (se recomienda Node 22), npm y Git.

    git clone https://github.com/mrg722/ClinicaNutriVidaEP2.git
    cd ClinicaNutriVidaEP2
    npm ci
    npm run dev

Vite mostrará la URL local. La app React parte de index.html y src/main.jsx. Live Server no comprueba el router React; las páginas HTML originales permanecen en el repositorio como referencia y conservación de EP1.

## Comandos de validación

    npm run test:run
    npm run test:integrante-1
    npm run test:integrante-2
    npm run test:integrante-3
    npm run coverage
    npm run build
    npm run preview

- test:integrante-1: catálogo, props, precios y filtros.
- test:integrante-2: cantidades, totales, callbacks y operaciones del carrito.
- test:integrante-3: reserva, contacto, registro y administración.
- coverage: genera informe V8 en coverage/index.html.
- build + preview: comprueba el build de producción local. Preview no es despliegue público.

## Estado de verificación automatizada

La ejecución [GitHub Actions run 38802384128](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128) terminó con éxito:
- 7/7 archivos de test aprobados.
- 64/64 casos aprobados.
- Statements 100 %, Branches 100 %, Functions 100 %, Lines 100 % en el alcance configurado para V8.
- Build de producción correcto.

Estos resultados no reemplazan la revisión manual responsive, las capturas que exige la entrega, la defensa oral ni un despliegue real si el docente exige EC2/Nginx.

## Aplicación React y estructura

Rutas: Inicio, Servicios, Tienda, detalle /productos/:id, Carrito, Reserva, Contacto, Administración, Inicio de sesión, Registro y 404.

Tecnologías: React 19, Vite 7, React Router, Bootstrap 5, React Bootstrap, Vitest, jsdom y React Testing Library.

- src/components/: navegación, tarjeta de producto y pie reutilizable.
- src/pages/: vistas y formularios controlados.
- src/data/productos.js: datos iniciales del catálogo original.
- src/utils/: formato de precios y persistencia local tolerante a datos inválidos.
- src/tests/: 10 pruebas por integrante y batería de integración.
- documentacion/guias/: Guías 9–14 adaptadas, punto por punto.
- documentacion/RUBRICA_EP2_TRAZABILIDAD.md: indicadores, evidencias y pendientes.
- deploy/nginx-nutrivida.conf: base de configuración Nginx para SPA.
- scripts/empaquetar-entrega.ps1: ZIP desde archivos confirmados en Git.

## Límites conocidos

Catálogo, carrito y altas/bajas administrativas usan localStorage en ese navegador; no existe backend ni sincronización entre dispositivos. Los formularios de reserva/contacto/acceso validan entradas, pero no envían datos ni crean cuentas reales. No introducir contraseñas ni información médica sensible.

La configuración Nginx prepara el fallback de rutas, pero la publicación EC2 necesita instancia y credenciales reales. No se declara desplegado hasta verificar una URL pública y las rutas tras recarga.

## Guías y entregables

Consulta el [índice de guías/rúbrica](documentacion/GUIAS_9_14_Y_RUBRICA.md), las [seis guías adaptadas](documentacion/guias/README.md), el [ERS Markdown](documentacion/ERS_EP2_NutriVida.md), el [informe medido de cobertura](documentacion/Informe_Cobertura_Testing_EP2.md) y la [lista de evidencia pendiente](documentacion/EVIDENCIAS_PENDIENTES_EP2.md).

La pauta oficial menciona Jasmine/Karma; la Guía 13 del curso dice que fue autorizado reemplazarlos por Vitest. Ese punto debe confirmarse con el docente. Los archivos DOCX originales de ERS y cobertura aún deben regenerarse/revisarse para la entrega final.

Para generar el ZIP en Windows, después de integrar y confirmar los documentos definitivos:

    .\scripts\empaquetar-entrega.ps1

Abre el ZIP generado y comprueba su contenido antes de subirlo.

## Integrantes registrados en el trabajo EP1

Martin Reyes · Martin Lara · Diego Adan
