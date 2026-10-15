import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contacto() {
  const [datos, setDatos] = useState({ nombre: "", correo: "", mensaje: "" });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
    setEnviado(false);
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = {};
    if (!datos.nombre.trim()) nuevos.nombre = "Ingresa tu nombre.";
    if (!correoValido.test(datos.correo.trim())) nuevos.correo = "Ingresa un correo válido.";
    if (datos.mensaje.trim().length < 10) nuevos.mensaje = "Escribe un mensaje de al menos 10 caracteres.";
    setErrores(nuevos);
    setEnviado(Object.keys(nuevos).length === 0);
  }

  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">ESTAMOS PARA AYUDARTE</p>
      <h1>Contacto</h1>
      {enviado ? <Alert variant="success" role="status">Formulario validado. En esta versión no se envían mensajes a un servidor.</Alert> : null}
      <Form onSubmit={enviar} noValidate className="nv-form" aria-label="Formulario de contacto">
        <Form.Group className="mb-3" controlId="contacto-nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={Boolean(errores.nombre)} />
          <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="contacto-correo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" name="correo" value={datos.correo} onChange={cambiar} isInvalid={Boolean(errores.correo)} />
          <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="contacto-mensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={4} name="mensaje" value={datos.mensaje} onChange={cambiar} isInvalid={Boolean(errores.mensaje)} />
          <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="success">Validar mensaje</Button>
      </Form>
    </Container>
  );
}