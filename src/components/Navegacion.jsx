import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const enlaces = [
  { to: "/", texto: "Inicio" },
  { to: "/servicios", texto: "Servicios" },
  { to: "/productos", texto: "Tienda" },
  { to: "/reserva", texto: "Agendar cita" },
  { to: "/contacto", texto: "Contacto" },
];

export default function Navegacion({ cantidadCarrito = 0 }) {
  return (
    <Navbar expand="lg" className="nv-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          Clínica NutriVida
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nutrivida-nav" aria-label="Abrir navegación" />
        <Navbar.Collapse id="nutrivida-nav">
          <Nav className="ms-auto align-items-lg-center">
            {enlaces.map((enlace) => (
              <Nav.Link
                key={enlace.to}
                as={NavLink}
                to={enlace.to}
                end={enlace.to === "/"}
              >
                {enlace.texto}
              </Nav.Link>
            ))}
            <Nav.Link as={NavLink} to="/carrito" aria-label={`Carrito, ${cantidadCarrito} unidades`}>
              Carrito <Badge bg="light" text="dark">{cantidadCarrito}</Badge>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin">Administración</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}