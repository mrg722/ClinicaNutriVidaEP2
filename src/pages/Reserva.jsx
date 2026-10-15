import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { obtenerFechaLocal, validarCorreo, validarFechaNoAnterior, validarHoraConsulta, validarMotivoConsulta, validarNombre, validarTelefono } from "../utils/validaciones";

const profesionales = [
  { id: "nutricionista-01", nombre: "Nutricionista 01" },
  { id: "nutricionista-02", nombre: "Nutricionista 02" },
  { id: "nutricionista-03", nombre: "Nutricionista 03" },
  { id: "nutricionista-04", nombre: "Nutricionista 04" },
];

function resolverServicioInicial(parametro, productos) {
  if (!parametro) return "";
  const servicio = productos.find((producto) => producto.id === parametro || producto.nombre === parametro);
  return servicio?.id ?? "";
}

export default function Reserva({ productos }) {
  const [parametros] = useSearchParams();
  const [datos, setDatos] = useState(() => ({
    nombre: "",
    correo: "",
    telefono: "",
    nutricionista: "",
    servicio: resolverServicioInicial(parametros.get("servicio"), productos),
    fecha: "",
    hora: "",
    motivo: "",
  }));
  const [errores, setErrores] = useState({});
  const [enviada, setEnviada] = useState(false);
  const hoy = obtenerFechaLocal();

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
    setEnviada(false);
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    if (!validarNombre(datos.nombre)) nuevosErrores.nombre = "Ingresa un nombre válido.";
    if (!validarCorreo(datos.correo)) nuevosErrores.correo = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    if (!validarTelefono(datos.telefono)) nuevosErrores.telefono = "Ingresa un teléfono válido.";
    if (!datos.nutricionista) nuevosErrores.nutricionista = "Selecciona un profesional.";
    if (!datos.servicio) nuevosErrores.servicio = "Selecciona un servicio.";
    if (!validarFechaNoAnterior(datos.fecha)) nuevosErrores.fecha = "Selecciona una fecha de hoy o posterior.";
    if (!validarHoraConsulta(datos.hora)) nuevosErrores.hora = "Selecciona una hora entre 09:00 y 18:00.";
    if (!validarMotivoConsulta(datos.motivo)) nuevosErrores.motivo = "El motivo debe tener al menos 10 caracteres.";

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
      <p className="small text-secondary">Demostración frontend: no ingreses datos reales ni información médica sensible.</p>
      {enviada ? (
        <Alert variant="success" role="status">
          Solicitud validada en este navegador. No está conectada a una agenda real y no confirma una cita.
        </Alert>
      ) : null}
      <Form onSubmit={enviar} noValidate className="nv-form" aria-label="Formulario de reserva">
        <Form.Group className="mb-3" controlId="reserva-nombre">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control autoComplete="name" maxLength={50} name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={Boolean(errores.nombre)} aria-describedby={errores.nombre ? "error-reserva-nombre" : undefined} />
          <Form.Control.Feedback id="error-reserva-nombre" type="invalid">{errores.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="reserva-correo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control autoComplete="email" maxLength={100} type="email" name="correo" value={datos.correo} onChange={cambiar} isInvalid={Boolean(errores.correo)} aria-describedby={errores.correo ? "error-reserva-correo" : undefined} />
          <Form.Control.Feedback id="error-reserva-correo" type="invalid">{errores.correo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="reserva-telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control autoComplete="tel" maxLength={16} type="tel" name="telefono" placeholder="+56 9 1234 5678" value={datos.telefono} onChange={cambiar} isInvalid={Boolean(errores.telefono)} aria-describedby={errores.telefono ? "error-reserva-telefono" : undefined} />
          <Form.Control.Feedback id="error-reserva-telefono" type="invalid">{errores.telefono}</Form.Control.Feedback>
        </Form.Group>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="reserva-nutricionista">
              <Form.Label>Nutricionista preferido</Form.Label>
              <Form.Select name="nutricionista" value={datos.nutricionista} onChange={cambiar} isInvalid={Boolean(errores.nutricionista)} aria-describedby={errores.nutricionista ? "error-reserva-nutricionista" : undefined}>
                <option value="">Selecciona un profesional</option>
                {profesionales.map((profesional) => <option key={profesional.id} value={profesional.id}>{profesional.nombre}</option>)}
              </Form.Select>
              <Form.Control.Feedback id="error-reserva-nutricionista" type="invalid">{errores.nutricionista}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="reserva-servicio">
              <Form.Label>Servicio</Form.Label>
              <Form.Select name="servicio" value={datos.servicio} onChange={cambiar} isInvalid={Boolean(errores.servicio)} aria-describedby={errores.servicio ? "error-reserva-servicio" : undefined}>
                <option value="">Selecciona una opción</option>
                {productos.map((producto) => <option key={producto.id} value={producto.id}>{producto.nombre}</option>)}
              </Form.Select>
              <Form.Control.Feedback id="error-reserva-servicio" type="invalid">{errores.servicio}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="reserva-fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" min={hoy} name="fecha" value={datos.fecha} onChange={cambiar} isInvalid={Boolean(errores.fecha)} aria-describedby={errores.fecha ? "error-reserva-fecha" : undefined} />
              <Form.Control.Feedback id="error-reserva-fecha" type="invalid">{errores.fecha}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="reserva-hora">
              <Form.Label>Hora</Form.Label>
              <Form.Control type="time" min="09:00" max="18:00" name="hora" value={datos.hora} onChange={cambiar} isInvalid={Boolean(errores.hora)} aria-describedby={errores.hora ? "error-reserva-hora" : undefined} />
              <Form.Control.Feedback id="error-reserva-hora" type="invalid">{errores.hora}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="reserva-motivo">
          <Form.Label>Motivo de consulta</Form.Label>
          <Form.Control as="textarea" rows={4} maxLength={300} minLength={10} name="motivo" value={datos.motivo} onChange={cambiar} isInvalid={Boolean(errores.motivo)} aria-describedby={errores.motivo ? "error-reserva-motivo" : undefined} />
          <Form.Control.Feedback id="error-reserva-motivo" type="invalid">{errores.motivo}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="success">Solicitar cita</Button>
      </Form>
    </Container>
  );
}