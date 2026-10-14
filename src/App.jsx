
import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col, Card, Button } from 'react-bootstrap';

const servicios = [
  {
    titulo: 'Consulta nutricional',
    descripcion: 'Atención personalizada para mejorar tus hábitos alimentarios.',
    icono: '🥗',
  },
  {
    titulo: 'Planes de alimentación',
    descripcion: 'Planes adaptados a tus objetivos y necesidades.',
    icono: '🍎',
  },
  {
    titulo: 'Seguimiento nutricional',
    descripcion: 'Acompañamiento para revisar tus avances.',
    icono: '💚',
  },
];

function Inicio() {
  const [guardados, setGuardados] = useState(
    () => JSON.parse(localStorage.getItem('nutrivida-guardados') || '[]')
  );

  function guardarServicio(titulo) {
    const nuevos = guardados.includes(titulo)
      ? guardados.filter((item) => item !== titulo)
      : [...guardados, titulo];

    setGuardados(nuevos);
    localStorage.setItem('nutrivida-guardados', JSON.stringify(nuevos));
  }

  return (
    <>
      <section className="nv-hero">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={8}>
              <span className="badge text-bg-success mb-3">Clínica NutriVida</span>
              <h1 className="display-4 fw-bold">Cuida tu alimentación, mejora tu vida</h1>
              <p className="lead mt-3">
                Te acompañamos a construir hábitos saludables con orientación
                nutricional personalizada.
              </p>
              <Button as={NavLink} to="/servicios" variant="success" size="lg">
                Conoce nuestros servicios
              </Button>
            </Col>
            <Col md={4} className="text-center">
              <div className="display-1" aria-hidden="true">🥑</div>
              <p className="fw-semibold">Pequeños hábitos, grandes cambios</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="nv-section">
        <Container>
          <h2 className="fw-bold mb-4">Nuestros servicios</h2>
          <Row className="g-4">
            {servicios.map((servicio) => (
              <Col key={servicio.titulo} sm={6} lg={4}>
                <Card className="nv-card">
                  <Card.Body className="p-4">
                    <div className="display-5 mb-3" aria-hidden="true">
                      {servicio.icono}
                    </div>
                    <Card.Title>{servicio.titulo}</Card.Title>
                    <Card.Text>{servicio.descripcion}</Card.Text>
                    <Button
                      variant={guardados.includes(servicio.titulo) ? 'success' : 'outline-success'}
                      onClick={() => guardarServicio(servicio.titulo)}
                    >
                      {guardados.includes(servicio.titulo) ? 'Guardado ✓' : 'Guardar servicio'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

function Servicios() {
  return (
    <Container className="nv-section">
      <h1>Nuestros servicios</h1>
      <p>Conoce las opciones de atención nutricional que ofrecemos.</p>
      <ul>
        {servicios.map((servicio) => (
          <li key={servicio.titulo} className="mb-3">
            <strong>{servicio.titulo}:</strong> {servicio.descripcion}
          </li>
        ))}
      </ul>
    </Container>
  );
}

function NoEncontrado() {
  return (
    <Container className="nv-section text-center">
      <h1>Página no encontrada</h1>
      <NavLink to="/">Volver al inicio</NavLink>
    </Container>
  );
}

function Layout() {
  return (
    <>
      <Navbar expand="lg" className="nv-navbar" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold">
            🥗 NutriVida
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nutrivida-nav" />
          <Navbar.Collapse id="nutrivida-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/servicios">Servicios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>

      <footer className="nv-footer text-center">
        <Container>
          Clínica NutriVida · Tu bienestar comienza con buenos hábitos.
        </Container>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
