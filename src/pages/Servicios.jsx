import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { serviciosPrincipales } from "./Inicio";

export default function Servicios() {
  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">CLÍNICA NUTRIVIDA</p>
      <h1>Nuestros servicios</h1>
      <p>Conoce las opciones de atención nutricional que ofrecemos.</p>
      <Row className="g-4 mt-2">
        {serviciosPrincipales.map((servicio) => (
          <Col key={servicio.titulo} md={6} lg={4}>
            <Card className="nv-card h-100">
              <Card.Body className="p-4">
                <Card.Title as="h2" className="h5">{servicio.titulo}</Card.Title>
                <Card.Text>{servicio.descripcion}</Card.Text>
                <Link className="btn btn-outline-success" to="/reserva">
                  Consultar una cita
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
