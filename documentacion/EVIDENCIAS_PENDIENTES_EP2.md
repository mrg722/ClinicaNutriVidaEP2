# Evidencias pendientes EP2 NutriVida

Esta lista diferencia el código comprobado automáticamente de lo que requiere navegador del equipo, credenciales, revisión docente, DOCX/ZIP finales o exposición oral.

## Verificación automática
- [x] Workflow de GitHub Actions exitoso: 64/64 tests, 7/7 archivos de prueba y build correcto en [run 38802384128](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38802384128).
- [x] Reporte de cobertura medido: Statements 100 %, Branches 100 %, Functions 100 %, Lines 100 % dentro del alcance V8 de vite.config.js.
- [x] Tres suites separadas con diez tests cada una.
- [ ] Descargar/abrir el artefacto cobertura-nutrivida y guardar capturas que se entregarán junto con el proyecto.
- [ ] Comprobar las rutas directas y su reload con npm run preview: /productos/EV002, /carrito, /reserva y /admin.
- [ ] Comprobar en navegador que el carrito persiste tras reload.
- [ ] Revisar consola, foco, etiquetas, imágenes y accesibilidad básica en navegador.

## Evidencia visual manual
- [ ] Captura 375 px: menú, catálogo, formulario y ausencia de overflow.
- [ ] Captura 768 px: grilla y formulario.
- [ ] Captura 1024 px: catálogo, tabla administrativa y navegación.
- [ ] Captura 1440 px: ancho máximo y lectura equilibrada.
- [ ] Captura de error y validación exitosa de reserva/contacto.
- [ ] Captura de interacción, callback mock, spy de localStorage y resumen/detalle HTML de cobertura.

## Entregables de evaluación
- [ ] Regenerar o revisar el DOCX de ERS existente en documentacion/ERS_NutriVida_EP2_Actualizado.docx para alinearlo al frontend React final.
- [ ] Regenerar o revisar el DOCX de cobertura existente en documentacion/Informe_Cobertura_Testing_NutriVida_EP2.docx con números medidos y hallazgos reales.
- [ ] Consultar al docente sobre Vitest frente a Jasmine/Karma: la Guía 13 declara autorización de Vitest, pero el PDF oficial conserva la denominación Jasmine/Karma.
- [ ] Ejecutar el script empaquetar-entrega.ps1 después de integrar los archivos definitivos; abrir deliverables/NutriVida-EP2.zip y comprobar contenido.
- [ ] Confirmar que el repositorio público, ERS, informe y ZIP correspondan a la misma versión/commit.

## Despliegue (si se exige por la Guía 12)
- [ ] Obtener acceso real a AWS Academy/EC2 y una llave válida.
- [ ] Crear/revisar reglas de seguridad de la instancia y conexión SSH.
- [ ] Publicar el contenido de dist con Nginx y fallback SPA.
- [ ] Verificar URL/IP pública y recargar rutas internas.
- [ ] Registrar URL, IP y fecha solo tras comprobar el despliegue real.

## Defensa individual
Para cada integrante:
- [ ] Explicar arquitectura React/Vite, rutas y decisiones.
- [ ] Mostrar un componente, props, estado y Bootstrap en distintos anchos.
- [ ] Ejecutar y explicar sus diez tests y una interacción real.
- [ ] Explicar vi.fn, vi.spyOn y las métricas reales; justificar el alcance de cobertura.
- [ ] Mostrar commits propios y responder preguntas sin depender de un guion memorizado.

**Estado:** la parte automatizada de tests/cobertura/build está verificada. Los puntos anteriores sin marcar no se pueden dar por completados por documentación o CI solamente.
