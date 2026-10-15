import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NoEncontrada() {
  return (
    <Container as="main" className="nv-section text-center">
      <p className="nv-eyebrow">ERROR 404</p>
      <h1>Página no encontrada</h1>
      <p>La dirección solicitada no corresponde a una vista disponible.</p>
      <Link className="btn btn-success" to="/">Volver al inicio</Link>
    </Container>
  );
}