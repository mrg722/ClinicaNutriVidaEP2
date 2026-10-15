import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { serviciosPrincipales } from "./Inicio";

export default function Servicios() {
  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">CLÍNICA NUTRIVIDA</p>
      <h1>Nuestros servicios</h1>
      <p>Conoce las opciones de atención nutricional que ofrecemos.</p>
      <ListGroup className="mt-4">
        {serviciosPrincipales.map((servicio) => (
          <ListGroup.Item key={servicio.titulo} className="py-3">
            <h2 className="h5">{servicio.titulo}</h2>
            <p className="mb-2">{servicio.descripcion}</p>
            <Link to={`/reserva?servicio=${encodeURIComponent(servicio.titulo)}`}>
              Consultar disponibilidad
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}