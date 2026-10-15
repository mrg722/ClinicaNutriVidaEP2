import { Button, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/precio";

export default function TarjetaProducto({ producto, onAgregar }) {
  return (
    <Card className="nv-card h-100">
      {producto.imagen ? (
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={`Imagen de ${producto.nombre}`}
          className="nv-product-image"
        />
      ) : null}
      <Card.Body className="p-4 d-flex flex-column">
        <span className="badge text-bg-success align-self-start mb-2">{producto.categoria}</span>
        <Card.Title as="h2" className="h5">{producto.nombre}</Card.Title>
        <Card.Text>{producto.descripcion}</Card.Text>
        <p className="fw-bold fs-5">{formatearPrecio(producto.precio)}</p>
        <Stack direction="horizontal" gap={2} className="mt-auto flex-wrap">
          <Button
            variant="success"
            onClick={() => onAgregar(producto)}
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
            Agregar al carrito
          </Button>
          <Link className="btn btn-outline-success" to={`/productos/${producto.id}`}>
            Ver detalle
          </Link>
        </Stack>
      </Card.Body>
    </Card>
  );
}