# Evidencias pendientes EP2 NutriVida

Esta lista separa el código que puede verificarse automáticamente de los pasos que requieren el computador del equipo, credenciales, capturas o exposición oral.

## Verificación técnica

- [ ] Confirmar que GitHub Actions finaliza exitosamente para el commit/PR final.
- [ ] Abrir el artefacto `cobertura-nutrivida` y trasladar los cuatro resultados reales al informe.
- [ ] Revisar rutas directas y recarga en /productos/EV002, /carrito, /reserva y /admin después de `npm run preview`.
- [ ] Comprobar persistencia del carrito después de recargar la misma sesión del navegador.
- [ ] Revisar consola, red y accesibilidad básica en navegador.

## Evidencia visual manual

- [ ] Captura de 375 px: menú, catálogo, formulario.
- [ ] Captura de 768 px: dos columnas y formulario.
- [ ] Captura de 1024 px: catálogo, tabla de administración y navegación.
- [ ] Captura de 1440 px: ancho máximo y lectura.
- [ ] Captura de errores y éxito de reserva/contacto.
- [ ] Captura de prueba de interfaz, mock/spy y resumen de cobertura.

## Entregables

- [ ] Revisar/actualizar el DOCX existente de ERS para que describa la versión EP2 final.
- [ ] Revisar/actualizar el DOCX existente de cobertura con números medidos y hallazgos reales.
- [ ] Consultar al docente sobre el uso de Vitest en lugar de Jasmine/Karma: la Guía 13 declara autorización, pero el PDF de rúbrica conserva la denominación original.
- [ ] Ejecutar el empaquetado desde un commit limpio y abrir `deliverables/NutriVida-EP2.zip` para comprobar los contenidos.

## Despliegue (solo si se exige)

- [ ] Obtener acceso real a AWS Academy/EC2 y una llave válida.
- [ ] Crear/revisar reglas de seguridad de la instancia.
- [ ] Publicar `dist/` con Nginx y habilitar fallback SPA.
- [ ] Verificar URL/IP pública, abrir y recargar rutas internas.
- [ ] Registrar fecha/URL solo después de comprobar el despliegue real.

## Defensa individual

Para cada integrante:
- [ ] Explicar el framework y la arquitectura.
- [ ] Mostrar props, estado, Bootstrap y adaptación responsive.
- [ ] Ejecutar y explicar sus diez pruebas.
- [ ] Explicar spies/mocks y métricas reales de cobertura.
- [ ] Mostrar sus commits y responder preguntas sin depender de un guion memorizado.

Mientras alguna de estas evidencias no exista, el estado debe seguir como pendiente; no debe transformarse en una afirmación de cumplimiento.
