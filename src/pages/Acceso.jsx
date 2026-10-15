import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { validarCorreo } from "../utils/validaciones";

export default function Acceso() {
  const [datos, setDatos] = useState({ correo: "", password: "" });
  const [errores, setErrores] = useState({});
  const [sesion, setSesion] = useState(null);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
    setSesion(null);
  }

  function enviar(evento) {
    evento.preventDefault();
    const correo = datos.correo.trim().toLowerCase();
    const nuevos = {};
    if (!validarCorreo(correo)) nuevos.correo = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    if (datos.password.length < 4 || datos.password.length > 10) {
      nuevos.password = "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    if (Object.keys(nuevos).length > 0) {
      setErrores(nuevos);
      setSesion(null);
      return;
    }

    let rol = "Paciente";
    if (correo === "admin@duoc.cl") {
      rol = "Administrador";
    } else if (correo.includes("nutricionista")) {
      rol = "Nutricionista";
    }

    try {
      sessionStorage.setItem("nutrivida_sesion", JSON.stringify({ correo, rol }));
      setErrores({});
      setSesion({ correo, rol });
    } catch {
      setErrores({ formulario: "El navegador no pudo guardar la sesión de demostración." });
      setSesion(null);
    }
  }

  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">CUENTA DE DEMOSTRACIÓN</p>
      <h1>Iniciar sesión</h1>
      <p>El acceso es una simulación local por perfil; no autentica contra un servidor ni protege recursos reales.</p>
      <Alert variant="warning">
        Usa datos ficticios. Esta demostración no guarda la contraseña y no debe usarse como acceso seguro.
      </Alert>
      {errores.formulario ? <Alert variant="danger" role="alert">{errores.formulario}</Alert> : null}
      {sesion ? (
        <Alert variant="success" role="status">
          <p className="mb-1">Inicio de sesión de demostración realizado correctamente.</p>
          <p className="mb-2">Perfil detectado: {sesion.rol}</p>
          <Link className="btn btn-success" to={sesion.rol === "Administrador" ? "/admin" : "/"}>
            {sesion.rol === "Administrador" ? "Ir a administración" : "Continuar al sitio"}
          </Link>
        </Alert>
      ) : null}
      <Form onSubmit={enviar} noValidate className="nv-form" aria-label="Formulario de inicio de sesión">
        <Form.Group className="mb-3" controlId="acceso-correo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            autoComplete="email"
            name="correo"
            value={datos.correo}
            onChange={cambiar}
            isInvalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? "error-acceso-correo" : undefined}
          />
          <Form.Control.Feedback id="error-acceso-correo" type="invalid">{errores.correo}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="acceso-password">
          <Form.Label>Contraseña (4 a 10 caracteres)</Form.Label>
          <Form.Control
            type="password"
            autoComplete="current-password"
            minLength={4}
            maxLength={10}
            name="password"
            value={datos.password}
            onChange={cambiar}
            isInvalid={Boolean(errores.password)}
            aria-describedby={errores.password ? "error-acceso-password" : undefined}
          />
          <Form.Control.Feedback id="error-acceso-password" type="invalid">{errores.password}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="success">Iniciar sesión</Button>
      </Form>
      <p className="mt-3">¿Todavía no tienes cuenta? <Link to="/registro">Registrarse</Link></p>
    </Container>
  );
}