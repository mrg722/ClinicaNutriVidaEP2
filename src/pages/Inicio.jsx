import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { guardarJSON, leerJSON } from "../utils/persistencia";

export const serviciosPrincipales = [
  {
    titulo: "Consulta nutricional",
    descripcion: "Atención personalizada para mejorar tus hábitos alimentarios.",
    icono: "🥗",
  },
  {
    titulo: "Planes de alimentación",
    descripcion: "Planes adaptados a tus objetivos y necesidades.",
    icono: "🍎",
  },
  {
    titulo: "Seguimiento nutricional",
    descripcion: "Acompañamiento para revisar tus avances.",
    icono: "💚",
  },
];

function leerGuardados() {
  const valor = leerJSON("nutrivida-guardados", []);
  return Array.isArray(valor) ? valor : [];
}

export default function Inicio() {
  const [guardados, setGuardados] = useState(leerGuardados);

  function guardarServicio(titulo) {
    const nuevos = guardados.includes(titulo)
      ? guardados.filter((item) => item !== titulo)
      : [...guardados, titulo];

    setGuardados(nuevos);
    guardarJSON("nutrivida-guardados", nuevos);
  }

  return (
    <>
      <section className="nv-hero">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={8}>
              <span className="badge text-bg-success mb-3">Clínica NutriVida</span>
              <h1 className="display-4 fw-bold">Cuida tu alimentación, mejora tu vida</h1>
              <p className="lead mt-3">
                Te acompañamos a construir hábitos saludables con orientación
                nutricional personalizada.
              </p>
              <Button as={Link} to="/servicios" variant="success" size="lg">
                Conoce nuestros servicios
              </Button>
              <Button as={Link} to="/productos" variant="outline-success" size="lg" className="ms-2">
                Explorar tienda
              </Button>
            </Col>
            <Col lg={4} className="text-center">
              <div className="nv-hero-icon" aria-hidden="true">🥑</div>
              <p className="fw-semibold">Pequeños hábitos, grandes cambios</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="nv-section">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
            <div>
              <p className="nv-eyebrow">ATENCIÓN PERSONALIZADA</p>
              <h2 className="fw-bold mb-0">Nuestros servicios</h2>
            </div>
            <Link to="/servicios">Ver todos los servicios</Link>
          </div>
          <Row className="g-4">
            {serviciosPrincipales.map((servicio) => {
              const guardado = guardados.includes(servicio.titulo);
              return (
                <Col key={servicio.titulo} sm={6} lg={4}>
                  <Card className="nv-card h-100">
                    <Card.Body className="p-4">
                      <div className="nv-service-icon mb-3" aria-hidden="true">
                        {servicio.icono}
                      </div>
                      <Card.Title as="h3">{servicio.titulo}</Card.Title>
                      <Card.Text>{servicio.descripcion}</Card.Text>
                      <Button
                        variant={guardado ? "success" : "outline-success"}
                        onClick={() => guardarServicio(servicio.titulo)}
                        aria-pressed={guardado}
                      >
                        {guardado ? "Guardado ✓" : "Guardar servicio"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
}