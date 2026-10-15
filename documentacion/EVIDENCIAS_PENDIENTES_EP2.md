# Evidencias pendientes de EP2 · NutriVida

Esta lista distingue lo que puede comprobarse automáticamente de aquello que requiere equipo local, navegador, infraestructura o defensa oral. La verificación automática quedó registrada en [la ejecución #38815259946](https://github.com/mrg722/ClinicaNutriVidaEP2/actions/runs/38815259946).

## Verificación automatizada

- [x] GitHub Actions finalizó correctamente para el commit de código `7e94488fc84861e83d7f84f3573a6d3a572a75f9`: instalación, pruebas, cobertura y build.
- [x] Registrar en el informe los resultados reales de V8: Statements 100 %, Branches 100 %, Functions 100 %, Lines 100 %.
- [ ] Descargar el artefacto `cobertura-nutrivida` de Actions y comprobar el informe HTML; la consola de CI ya confirmó 100 % de métricas dentro del alcance configurado.

## Revisión manual del navegador

- [ ] Captura a 375 px: menú contraído, catálogo y formulario.
- [ ] Captura a 768 px: grilla de dos columnas y formulario legible.
- [ ] Captura a 1200 px: grilla de tres columnas y pie de página.
- [ ] Revisar que no haya desplazamiento horizontal, que el foco sea visible y que las tablas sean utilizables.
- [ ] Abrir directamente `/productos/EV002`, `/carrito`, `/reserva` y `/admin`, y recargar.
- [ ] Comprobar que el carrito se mantiene tras recargar el mismo navegador.
- [ ] Capturar errores y resultado válido de los formularios, sin datos personales reales.

## Documentos y entrega

- [ ] Revisar y actualizar los DOCX existentes `ERS_NutriVida_EP2_Actualizado.docx` y `Informe_Cobertura_Testing_NutriVida_EP2.docx` a partir de los documentos Markdown y resultados finales.
- [ ] Consultar al docente si acepta Vitest en lugar de Jasmine/Karma, tal como indica la Guía 13.
- [ ] Generar el ZIP desde el commit final: `git archive --format=zip --output=NutriVida-EP2.zip HEAD`.
- [ ] Abrir el ZIP para comprobar los archivos y confirmar que no contiene `node_modules`, `dist` ni `coverage`.

## AWS/EC2 (si el docente lo exige)

- [ ] Obtener acceso real a AWS Academy/EC2 y la llave SSH.
- [ ] Configurar reglas de red y Nginx; publicar `dist/`.
- [ ] Verificar URL pública y ruta interna después de recargar.
- [ ] Registrar IP/URL y fecha solo tras verificar el sitio en funcionamiento.

## Presentación individual

Para cada integrante:
- [ ] Explicar el framework y la organización del código.
- [ ] Mostrar props, estado, Bootstrap y la adaptación responsive.
- [ ] Ejecutar y explicar sus diez pruebas.
- [ ] Explicar `vi.fn`, `vi.spyOn` y las métricas medidas.
- [ ] Señalar commits y justificar una decisión técnica con sus propias palabras.

No marcar como completado un punto hasta obtener su evidencia.
