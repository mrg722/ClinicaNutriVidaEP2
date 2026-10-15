import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { formatearPrecio } from "../utils/precio";

export default function DetalleProducto({ productos, onAgregar }) {
  const { id } = useParams();
  const producto = productos.find((item) => item.id === id);

  if (!producto) {
    return (
      <Container as="main" className="nv-section">
        <h1>Servicio no encontrado</h1>
        <p>
          El servicio solicitado no existe. Vuelve al catálogo para continuar.
        </p>
        <Link className="btn btn-success" to="/productos">Volver a la tienda</Link>
      </Container>
    );
  }

  return (
    <Container as="main" className="nv-section">
      <Row className="g-4 align-items-start">
        <Col md={5}>
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt={`Imagen de ${producto.nombre}`}
              className="nv-detail-image"
            />
          ) : null}
        </Col>
        <Col md={7}>
          <span className="badge text-bg-success mb-2">{producto.categoria}</span>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p className="display-6 fw-bold">{formatearPrecio(producto.precio)}</p>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="success" onClick={() => onAgregar(producto)}>
              Agregar al carrito
            </Button>
            <Link className="btn btn-outline-success" to="/productos">
              Volver al catálogo
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
