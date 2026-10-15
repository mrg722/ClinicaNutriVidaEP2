# Evidencias pendientes de EP2 · NutriVida

Esta lista distingue lo que puede comprobarse automáticamente de aquello que requiere equipo local, navegador, infraestructura o defensa oral.

## Verificación automatizada

- [ ] Confirmar workflow verde en el commit de entrega: instalación, pruebas, cobertura y build.
- [ ] Copiar los cuatro porcentajes reales de V8 al informe de cobertura.
- [ ] Abrir el artefacto de cobertura y revisar las líneas/ramas no cubiertas.

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
