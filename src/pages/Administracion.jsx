import { useState } from "react";
import { Alert, Button, Container, Form, Table } from "react-bootstrap";
import { formatearPrecio } from "../utils/precio";

const inicial = { nombre: "", categoria: "", descripcion: "", precio: "" };

export default function Administracion({ productos, onCrearProducto, onEliminarProducto }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
    setMensaje("");
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = {};
    if (!datos.nombre.trim()) nuevos.nombre = "El nombre es obligatorio.";
    if (!datos.categoria) nuevos.categoria = "Selecciona una categoría.";
    if (datos.precio === "" || !Number.isFinite(Number(datos.precio)) || Number(datos.precio) < 0) {
      nuevos.precio = "Ingresa un precio igual o mayor que cero.";
    }
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    onCrearProducto({
      id: `NV-${Date.now()}`,
      nombre: datos.nombre.trim(),
      categoria: datos.categoria,
      descripcion: datos.descripcion.trim() || "Servicio de Clínica NutriVida.",
      precio: Number(datos.precio),
      imagen: null,
    });
    setDatos(inicial);
    setMensaje("Producto agregado al catálogo local de demostración.");
  }

  return (
    <Container as="main" className="nv-section">
      <p className="nv-eyebrow">PANEL ACADÉMICO</p>
      <h1>Administración de productos</h1>
      <Alert variant="info">
        Área demostrativa sin autenticación ni backend. Los cambios se guardan únicamente en este navegador.
      </Alert>

      {mensaje ? <Alert variant="success" role="status">{mensaje}</Alert> : null}
      <section className="nv-form-panel mb-5">
        <h2 className="h4">Crear producto o servicio</h2>
        <Form onSubmit={enviar} noValidate aria-label="Formulario para crear producto">
          <Form.Group className="mb-3" controlId="admin-nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={Boolean(errores.nombre)} />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="admin-categoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoria" value={datos.categoria} onChange={cambiar} isInvalid={Boolean(errores.categoria)}>
              <option value="">Selecciona una categoría</option>
              <option value="Evaluación">Evaluación</option>
              <option value="Taller">Taller</option>
              <option value="Consulta">Consulta</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="admin-descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} name="descripcion" value={datos.descripcion} onChange={cambiar} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="admin-precio">
            <Form.Label>Precio en pesos chilenos</Form.Label>
            <Form.Control type="number" min="0" step="1" name="precio" value={datos.precio} onChange={cambiar} isInvalid={Boolean(errores.precio)} />
            <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="success">Guardar producto</Button>
        </Form>
      </section>

      <h2 className="h4">Catálogo actual ({productos.length})</h2>
      <div className="table-responsive">
        <Table hover>
          <caption>Productos disponibles en el catálogo de demostración</caption>
          <thead><tr><th scope="col">Código</th><th scope="col">Producto</th><th scope="col">Precio</th><th scope="col">Acción</th></tr></thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <th scope="row">{producto.nombre}</th>
                <td>{formatearPrecio(producto.precio)}</td>
                <td><Button variant="outline-danger" size="sm" onClick={() => onEliminarProducto(producto.id)} aria-label={`Eliminar ${producto.nombre}`}>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}