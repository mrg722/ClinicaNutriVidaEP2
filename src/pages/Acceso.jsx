import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Acceso({ modo = "login" }) {
  const esRegistro = modo === "registro";
  const [datos, setDatos] = useState({ nombre: "", correo: "", clave: "" });
  const [errores, setErrores] = useState({});
  const [completado, setCompletado] = useState(false);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
    setCompletado(false);
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = {};
    if (esRegistro && !datos.nombre.trim()) nuevos.nombre = "Ingresa tu nombre.";
    if (!correoValido.test(datos.correo.trim())) nuevos.correo = "Ingresa un correo válido.";
    if (datos.clave.length < 8) nuevos.clave = "La contraseña debe tener al menos 8 caracteres.";
    setErrores(nuevos);
    setCompletado(Object.keys(nuevos).length === 0);
  }

  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">CUENTA DE DEMOSTRACIÓN</p>
      <h1>{esRegistro ? "Crear cuenta" : "Iniciar sesión"}</h1>
      <p>El formulario valida datos en el navegador; no autentica usuarios reales.</p>
      {completado ? (
        <Alert variant="success" role="status">
          Formulario validado. No se ha creado sesión ni guardado la contraseña porque esta versión no dispone de backend.
        </Alert>
      ) : null}
      <Form onSubmit={enviar} noValidate className="nv-form" aria-label={esRegistro ? "Formulario de registro" : "Formulario de inicio de sesión"}>
        {esRegistro ? (
          <Form.Group className="mb-3" controlId="acceso-nombre">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={Boolean(errores.nombre)} autoComplete="name" />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        ) : null}
        <Form.Group className="mb-3" controlId="acceso-correo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" name="correo" value={datos.correo} onChange={cambiar} isInvalid={Boolean(errores.correo)} autoComplete="email" />
          <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="acceso-clave">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="clave" value={datos.clave} onChange={cambiar} isInvalid={Boolean(errores.clave)} autoComplete={esRegistro ? "new-password" : "current-password"} />
          <Form.Control.Feedback type="invalid">{errores.clave}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="success">{esRegistro ? "Validar registro" : "Validar acceso"}</Button>
      </Form>
      <p className="mt-3">
        {esRegistro ? "¿Ya tienes cuenta? " : "¿Todavía no tienes cuenta? "}
        <Link to={esRegistro ? "/login" : "/registro"}>{esRegistro ? "Iniciar sesión" : "Registrarse"}</Link>
      </p>
    </Container>
  );
}