import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/precio";

export default function Carrito({ carrito, onCambiarCantidad, onEliminar, onVaciar }) {
  const total = carrito.reduce((suma, item) => suma + Number(item.precio) * item.cantidad, 0);

  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">TU SELECCIÓN</p>
      <h1>Tu carrito</h1>
      {carrito.length === 0 ? (
        <div className="nv-empty mt-3">
          <p>El carrito está vacío.</p>
          <Button as={Link} to="/productos" variant="success">Explorar servicios</Button>
        </div>
      ) : (
        <>
          <div className="table-responsive mt-4">
            <Table hover responsive="md" className="align-middle">
              <caption className="visually-hidden">Servicios agregados al carrito</caption>
              <thead>
                <tr><th scope="col">Servicio</th><th scope="col">Precio</th><th scope="col">Cantidad</th><th scope="col">Subtotal</th><th scope="col">Acciones</th></tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.nombre}</th>
                    <td>{formatearPrecio(item.precio)}</td>
                    <td>{item.cantidad}</td>
                    <td>{formatearPrecio(Number(item.precio) * item.cantidad)}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        <Button size="sm" variant="outline-success" aria-label={`Quitar una unidad de ${item.nombre}`} onClick={() => onCambiarCantidad(item.id, -1)}>−</Button>
                        <Button size="sm" variant="outline-success" aria-label={`Agregar una unidad de ${item.nombre}`} onClick={() => onCambiarCantidad(item.id, 1)}>+</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => onEliminar(item.id)} aria-label={`Eliminar ${item.nombre}`}>Eliminar</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <p className="h4 mb-0">Total: {formatearPrecio(total)}</p>
            <div className="d-flex gap-2 flex-wrap">
              <Button variant="outline-danger" onClick={onVaciar}>Vaciar carrito</Button>
              <Button as={Link} to="/reserva" variant="success">Continuar a reserva</Button>
            </div>
          </div>
          <p className="text-secondary small mt-3">Demostración académica: el carrito es local y no procesa pagos.</p>
        </>
      )}
    </Container>
  );
}