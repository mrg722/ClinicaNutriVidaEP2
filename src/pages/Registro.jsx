import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { comunasPorRegion } from "../data/regiones";
import { guardarJSON, leerJSON } from "../utils/persistencia";
import {
  obtenerFechaLocal,
  validarCorreo,
  validarFechaNoFutura,
  validarNombre,
  validarRun,
} from "../utils/validaciones";

const datosIniciales = {
  run: "",
  nombre: "",
  apellidos: "",
  correo: "",
  fechaNacimiento: "",
  region: "",
  comuna: "",
  direccion: "",
  password: "",
  confirmarPassword: "",
};

function obtenerUsuarios() {
  const usuarios = leerJSON("nutrivida_usuarios", []);
  return Array.isArray(usuarios) ? usuarios : [];
}

export default function Registro() {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [fechaActual] = useState(obtenerFechaLocal);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({
      ...actuales,
      [name]: value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));
    setErrores((actuales) => ({
      ...actuales,
      [name]: "",
      ...(name === "region" ? { comuna: "" } : {}),
      ...(name === "password" ? { confirmarPassword: "" } : {}),
    }));
    setMensaje("");
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = {};
    const run = datos.run.trim().toUpperCase();
    const correo = datos.correo.trim().toLowerCase();

    if (!validarRun(run)) nuevos.run = "Ingresa un RUN chileno válido.";
    if (!validarNombre(datos.nombre)) nuevos.nombre = "Ingresa un nombre válido.";
    if (!validarNombre(datos.apellidos)) nuevos.apellidos = "Ingresa apellidos válidos.";
    if (!validarCorreo(correo)) nuevos.correo = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    if (!validarFechaNoFutura(datos.fechaNacimiento)) nuevos.fechaNacimiento = "La fecha no puede ser futura.";
    if (!datos.region) nuevos.region = "Selecciona una región.";
    if (!datos.comuna || !(comunasPorRegion[datos.region] || []).includes(datos.comuna)) {
      nuevos.comuna = "Selecciona una comuna válida para la región.";
    }
    if (datos.direccion.trim().length < 5) nuevos.direccion = "La dirección debe tener al menos 5 caracteres.";
    if (datos.password.length < 4 || datos.password.length > 10) {
      nuevos.password = "La contraseña debe tener entre 4 y 10 caracteres.";
    }
    if (datos.confirmarPassword !== datos.password) nuevos.confirmarPassword = "Las contraseñas no coinciden.";

    if (Object.keys(nuevos).length) {
      setErrores(nuevos);
      setMensaje("");
      return;
    }

    const usuarios = obtenerUsuarios();
    if (usuarios.some((usuario) => usuario.run === run)) {
      setErrores({ run: "Este RUN ya está registrado." });
      setMensaje("");
      return;
    }
    if (usuarios.some((usuario) => usuario.correo === correo)) {
      setErrores({ correo: "Este correo ya está registrado." });
      setMensaje("");
      return;
    }

    const siguienteId = usuarios.reduce(
      (maximo, usuario) => Math.max(maximo, Number(usuario.id) || 0),
      2,
    ) + 1;

    const usuario = {
      id: siguienteId,
      run,
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo,
      fechaNacimiento: datos.fechaNacimiento,
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion.trim(),
      rol: "Paciente",
      estado: "Activo",
    };

    const guardado = guardarJSON("nutrivida_usuarios", [...usuarios, usuario]);
    if (!guardado) {
      setErrores({ formulario: "No se pudo guardar el registro en este navegador." });
      setMensaje("");
      return;
    }

    setErrores({});
    setDatos(datosIniciales);
    setMensaje("Registro de demostración guardado en este navegador. La contraseña no se almacenó y no se creó una cuenta de servidor.");
  }

  const comunas = comunasPorRegion[datos.region] || [];

  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">CUENTA DE DEMOSTRACIÓN</p>
      <h1>Registrarse</h1>
      <p>Este registro local es académico. No ingreses datos personales reales.</p>
      <Alert variant="warning">
        El formulario valida y guarda un registro demo en este navegador; no crea una cuenta en un servidor. La contraseña nunca se almacena.
      </Alert>
      {mensaje ? <Alert variant="success" role="status">{mensaje}</Alert> : null}
      {errores.formulario ? <Alert variant="danger" role="alert">{errores.formulario}</Alert> : null}

      <Form onSubmit={enviar} noValidate className="nv-form" aria-label="Formulario de registro">
        <Form.Group className="mb-3" controlId="registro-run">
          <Form.Label>RUN</Form.Label>
          <Form.Control name="run" autoComplete="off" maxLength={12} placeholder="Ej.: 12.345.678-5" value={datos.run} onChange={cambiar} isInvalid={Boolean(errores.run)} aria-describedby={errores.run ? "error-registro-run" : undefined} />
          <Form.Control.Feedback id="error-registro-run" type="invalid">{errores.run}</Form.Control.Feedback>
        </Form.Group>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="registro-nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control autoComplete="given-name" maxLength={50} name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={Boolean(errores.nombre)} aria-describedby={errores.nombre ? "error-registro-nombre" : undefined} />
              <Form.Control.Feedback id="error-registro-nombre" type="invalid">{errores.nombre}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="registro-apellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control autoComplete="family-name" maxLength={100} name="apellidos" value={datos.apellidos} onChange={cambiar} isInvalid={Boolean(errores.apellidos)} aria-describedby={errores.apellidos ? "error-registro-apellidos" : undefined} />
              <Form.Control.Feedback id="error-registro-apellidos" type="invalid">{errores.apellidos}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="registro-correo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control autoComplete="email" type="email" maxLength={100} list="dominios-registro" name="correo" value={datos.correo} onChange={cambiar} isInvalid={Boolean(errores.correo)} aria-describedby={errores.correo ? "error-registro-correo" : undefined} />
          <datalist id="dominios-registro">
            <option value="@gmail.com" />
            <option value="@duoc.cl" />
            <option value="@profesor.duoc.cl" />
            <option value="@nutrivida.cl" />
          </datalist>
          <Form.Control.Feedback id="error-registro-correo" type="invalid">{errores.correo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registro-fecha-nacimiento">
          <Form.Label>Fecha de nacimiento (opcional)</Form.Label>
          <Form.Control type="date" max={fechaActual} autoComplete="bday" name="fechaNacimiento" value={datos.fechaNacimiento} onChange={cambiar} isInvalid={Boolean(errores.fechaNacimiento)} aria-describedby={errores.fechaNacimiento ? "error-registro-fecha" : undefined} />
          <Form.Control.Feedback id="error-registro-fecha" type="invalid">{errores.fechaNacimiento}</Form.Control.Feedback>
        </Form.Group>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="registro-region">
              <Form.Label>Región</Form.Label>
              <Form.Select name="region" value={datos.region} onChange={cambiar} isInvalid={Boolean(errores.region)} aria-describedby={errores.region ? "error-registro-region" : undefined}>
                <option value="">Selecciona una región</option>
                {Object.keys(comunasPorRegion).map((region) => <option key={region} value={region}>{region}</option>)}
              </Form.Select>
              <Form.Control.Feedback id="error-registro-region" type="invalid">{errores.region}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="registro-comuna">
              <Form.Label>Comuna</Form.Label>
              <Form.Select name="comuna" value={datos.comuna} onChange={cambiar} disabled={!datos.region} isInvalid={Boolean(errores.comuna)} aria-describedby={errores.comuna ? "error-registro-comuna" : undefined}>
                <option value="">Selecciona una comuna</option>
                {comunas.map((comuna) => <option key={comuna} value={comuna}>{comuna}</option>)}
              </Form.Select>
              <Form.Control.Feedback id="error-registro-comuna" type="invalid">{errores.comuna}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="registro-direccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control as="textarea" rows={2} minLength={5} maxLength={300} autoComplete="street-address" name="direccion" value={datos.direccion} onChange={cambiar} isInvalid={Boolean(errores.direccion)} aria-describedby={errores.direccion ? "error-registro-direccion" : undefined} />
          <Form.Control.Feedback id="error-registro-direccion" type="invalid">{errores.direccion}</Form.Control.Feedback>
        </Form.Group>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="registro-password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" autoComplete="new-password" minLength={4} maxLength={10} name="password" value={datos.password} onChange={cambiar} isInvalid={Boolean(errores.password)} aria-describedby={errores.password ? "error-registro-password" : undefined} />
              <Form.Control.Feedback id="error-registro-password" type="invalid">{errores.password}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="registro-confirmar-password">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control type="password" autoComplete="new-password" minLength={4} maxLength={10} name="confirmarPassword" value={datos.confirmarPassword} onChange={cambiar} isInvalid={Boolean(errores.confirmarPassword)} aria-describedby={errores.confirmarPassword ? "error-registro-confirmar-password" : undefined} />
              <Form.Control.Feedback id="error-registro-confirmar-password" type="invalid">{errores.confirmarPassword}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="success">Registrarme</Button>
        <p className="mt-3 mb-0">¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a></p>
      </Form>
    </Container>
  );
}