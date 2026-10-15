import { useMemo, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import TarjetaProducto from "../components/TarjetaProducto";

export default function Productos({ productos, onAgregar }) {
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const categorias = useMemo(
    () => [...new Set(productos.map((producto) => producto.categoria))].sort(),
    [productos],
  );
  const visibles = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase("es-CL");
    return productos.filter((producto) => {
      const coincideCategoria =
        categoria === "Todas" || producto.categoria === categoria;
      const coincideBusqueda =
        !termino ||
        producto.nombre.toLocaleLowerCase("es-CL").includes(termino) ||
        producto.descripcion.toLocaleLowerCase("es-CL").includes(termino);
      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoria, productos]);

  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">SERVICIOS Y TALLERES</p>
      <h1>Tienda NutriVida</h1>
      <p>
        Explora nuestros servicios, consulta sus detalles y agrega los que te
        interesen al carrito.
      </p>
      <Row className="g-3 my-3">
        <Col md={7}>
          <Form.Group controlId="buscar-productos">
            <Form.Label>Buscar servicios</Form.Label>
            <Form.Control
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Ej.: alimentación saludable"
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="filtrar-categoria">
            <Form.Label>Filtrar por categoría</Form.Label>
            <Form.Select
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              {categorias.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <p aria-live="polite" className="text-secondary">
        {visibles.length} {visibles.length === 1 ? "resultado" : "resultados"}
      </p>
      {visibles.length === 0 ? (
        <p role="status" className="nv-empty">
          No encontramos servicios con esos criterios.
        </p>
      ) : (
        <Row className="g-4">
          {visibles.map((producto) => (
            <Col key={producto.id} xs={12} md={6} lg={4}>
              <TarjetaProducto producto={producto} onAgregar={onAgregar} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
