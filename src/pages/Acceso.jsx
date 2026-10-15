import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { validarCorreo } from "../utils/validaciones";

export default function Acceso({ modo = "acceso" }) {
  const [datos, setDatos] = useState(modo === "registro" ? { nombre: "", correo: "", password: "" } : { correo: "", password: "" });
  const [errores, setErrores] = useState({});
  const [sesion, setSesion] = useState(null);
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
    setSesion(null);
    setMensajeRegistro("");
  }

  function enviar(evento) {
    evento.preventDefault();

    if (modo === "registro") {
      const nuevos = {};
      if (!datos.nombre || !datos.nombre.trim()) nuevos.nombre = "Ingresa tu nombre.";
      if (!datos.correo || !validarCorreo(datos.correo.trim().toLowerCase())) nuevos.correo = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      if (!datos.password || datos.password.length < 4 || datos.password.length > 10) nuevos.password = "La contraseña debe tener entre 4 y 10 caracteres.";
      setErrores(nuevos);
      if (Object.keys(nuevos).length > 0) return;

      setMensajeRegistro("Registro de demostración completado: no se ha creado sesión ni guardado la contraseña.");
      return;
    }

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
      <h1>{modo === "registro" ? "Crear cuenta" : "Iniciar sesión"}</h1>
      <p>{modo === "registro" ? "Registro de demostración: no creamos cuentas reales ni guardamos contraseñas." : "El acceso es una simulación local por perfil; no autentica contra un servidor ni protege recursos reales."}</p>

      {modo !== "registro" && (
        <Alert variant="warning">
          Usa datos ficticios. Esta demostración no guarda la contraseña y no debe usarse como acceso seguro.
        </Alert>
      )}

      {modo !== "registro" && errores.formulario ? <Alert variant="danger" role="alert">{errores.formulario}</Alert> : null}

      {sesion ? (
        <Alert variant="success" role="status">
          <p className="mb-1">Inicio de sesión de demostración realizado correctamente.</p>
          <p className="mb-2">Perfil detectado: {sesion.rol}</p>
          <Link className="btn btn-success" to={sesion.rol === "Administrador" ? "/admin" : "/"}> 
            {sesion.rol === "Administrador" ? "Ir a administración" : "Continuar al sitio"}
          </Link>
        </Alert>
      ) : null}

      {modo === "registro" && mensajeRegistro ? <Alert variant="success" role="status">{mensajeRegistro}</Alert> : null}

      <Form onSubmit={enviar} noValidate className="nv-form" aria-label={modo === "registro" ? "Formulario de registro" : "Formulario de inicio de sesión"}>
        {modo === "registro" && (
          <Form.Group className="mb-3" controlId="registro-nombre">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={Boolean(errores.nombre)} aria-describedby={errores.nombre ? "error-registro-nombre" : undefined} />
            <Form.Control.Feedback id="error-registro-nombre" type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId={modo === "registro" ? "registro-correo" : "acceso-correo"}>
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            autoComplete="email"
            name="correo"
            value={datos.correo}
            onChange={cambiar}
            isInvalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? (modo === "registro" ? "error-registro-correo" : "error-acceso-correo") : undefined}
          />
          <Form.Control.Feedback id={modo === "registro" ? "error-registro-correo" : "error-acceso-correo"} type="invalid">{errores.correo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId={modo === "registro" ? "registro-password" : "acceso-password"}>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            autoComplete="current-password"
            minLength={4}
            maxLength={10}
            name="password"
            value={datos.password}
            onChange={cambiar}
            isInvalid={Boolean(errores.password)}
            aria-describedby={errores.password ? (modo === "registro" ? "error-registro-password" : "error-acceso-password") : undefined}
          />
          <Form.Control.Feedback id={modo === "registro" ? "error-registro-password" : "error-acceso-password"} type="invalid">{errores.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="success">{modo === "registro" ? "Validar registro" : "Validar acceso"}</Button>
      </Form>

      {modo !== "registro" && <p className="mt-3">¿Todavía no tienes cuenta? <Link to="/registro">Registrarse</Link></p>}
    </Container>
  );
}
