import { useState } from "react";
import { Alert, Button, Container, Form, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Reserva({ productos }) {
  const [parametros] = useSearchParams();
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    servicio: parametros.get("servicio") || "",
    fecha: "",
  });
  const [errores, setErrores] = useState({});
  const [enviada, setEnviada] = useState(false);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
    setEnviada(false);
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};
    if (!datos.nombre.trim()) nuevosErrores.nombre = "Ingresa tu nombre.";
    if (!correoValido.test(datos.correo.trim())) nuevosErrores.correo = "Ingresa un correo válido.";
    if (!datos.servicio) nuevosErrores.servicio = "Selecciona un servicio.";
    if (!datos.fecha) nuevosErrores.fecha = "Selecciona una fecha.";
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      setEnviada(false);
      return;
    }
    setEnviada(true);
  }

  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">AGENDA</p>
      <h1>Agendar una cita</h1>
      <p>Completa los datos para validar tu solicitud de reserva.</p>
      {enviada ? (
        <Alert variant="success" role="status">
          Formulario validado. Esta demostración no está conectada a una agenda real y no confirma una cita.
        </Alert>
      ) : null}
      <Form onSubmit={enviar} noValidate className="nv-form" aria-label="Formulario de reserva">
        <Form.Group className="mb-3" controlId="reserva-nombre">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={Boolean(errores.nombre)} aria-describedby={errores.nombre ? "error-reserva-nombre" : undefined} />
          <Form.Control.Feedback id="error-reserva-nombre" type="invalid">{errores.nombre}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="reserva-correo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" name="correo" value={datos.correo} onChange={cambiar} isInvalid={Boolean(errores.correo)} aria-describedby={errores.correo ? "error-reserva-correo" : undefined} />
          <Form.Control.Feedback id="error-reserva-correo" type="invalid">{errores.correo}</Form.Control.Feedback>
        </Form.Group>
        <Row className="g-3">
          <Col md={7}>
            <Form.Group className="mb-3" controlId="reserva-servicio">
              <Form.Label>Servicio</Form.Label>
              <Form.Select name="servicio" value={datos.servicio} onChange={cambiar} isInvalid={Boolean(errores.servicio)} aria-describedby={errores.servicio ? "error-reserva-servicio" : undefined}>
                <option value="">Selecciona un servicio</option>
                {productos.map((producto) => <option key={producto.id} value={producto.nombre}>{producto.nombre}</option>)}
              </Form.Select>
              <Form.Control.Feedback id="error-reserva-servicio" type="invalid">{errores.servicio}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3" controlId="reserva-fecha">
              <Form.Label>Fecha solicitada</Form.Label>
              <Form.Control type="date" name="fecha" value={datos.fecha} onChange={cambiar} isInvalid={Boolean(errores.fecha)} aria-describedby={errores.fecha ? "error-reserva-fecha" : undefined} />
              <Form.Control.Feedback id="error-reserva-fecha" type="invalid">{errores.fecha}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="success">Validar solicitud</Button>
      </Form>
      <p className="small text-secondary mt-3">No ingreses información médica sensible: este formulario es una demostración frontend.</p>
    </Container>
  );
}