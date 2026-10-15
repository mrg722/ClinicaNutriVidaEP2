import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import Productos from "../pages/Productos";
import { formatearPrecio } from "../utils/precio";

const productos = [
  { id: "EV002", nombre: "Bioimpedanciometría", categoria: "Evaluación", descripcion: "Evaluación corporal.", precio: 12000, imagen: "/assets/img/bio.jpg" },
  { id: "TG001", nombre: "Taller de alimentación saludable", categoria: "Taller", descripcion: "Taller de hábitos.", precio: 15000, imagen: null },
];

function renderCatalogo(props = {}) {
  return render(
    <MemoryRouter>
      <Productos productos={productos} onAgregar={vi.fn()} {...props} />
    </MemoryRouter>,
  );
}

describe("Integrante 1 · catálogo y componentes", () => {
  it("muestra nombre y categoría desde props", () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
    expect(screen.getByText("Evaluación")).toBeInTheDocument();
  });

  it("formatea y muestra el precio", () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={vi.fn()} /></MemoryRouter>);
    expect(screen.getByText(/12\.000/)).toBeInTheDocument();
  });

  it("proporciona texto alternativo descriptivo a la imagen", () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("img", { name: "Imagen de Bioimpedanciometría" })).toBeInTheDocument();
  });

  it("envía el objeto correcto al callback de agregar", async () => {
    const user = userEvent.setup();
    const onAgregar = vi.fn();
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={onAgregar} /></MemoryRouter>);
    await user.click(screen.getByRole("button", { name: "Agregar Bioimpedanciometría al carrito" }));
    expect(onAgregar).toHaveBeenCalledWith(productos[0]);
  });

  it("enlaza al detalle usando el id del producto", () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("link", { name: "Ver detalle" })).toHaveAttribute("href", "/productos/EV002");
  });

  it("renderiza todos los elementos entregados al catálogo", () => {
    renderCatalogo();
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Taller de alimentación saludable" })).toBeInTheDocument();
  });

  it("filtra las tarjetas por categoría", async () => {
    const user = userEvent.setup();
    renderCatalogo();
    await user.selectOptions(screen.getByLabelText("Filtrar por categoría"), "Taller");
    expect(screen.getByRole("heading", { name: "Taller de alimentación saludable" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Bioimpedanciometría" })).not.toBeInTheDocument();
  });

  it("busca por el nombre del servicio", async () => {
    const user = userEvent.setup();
    renderCatalogo();
    await user.type(screen.getByLabelText("Buscar servicios"), "bioimpedanciometría");
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Taller de alimentación saludable" })).not.toBeInTheDocument();
  });

  it("informa cuando no hay resultados", async () => {
    const user = userEvent.setup();
    renderCatalogo();
    await user.type(screen.getByLabelText("Buscar servicios"), "producto inexistente");
    expect(screen.getByRole("status")).toHaveTextContent("No encontramos servicios");
  });

  it("trata precios cero e inválidos de forma explícita", () => {
    expect(formatearPrecio(0)).toBe("Gratis");
    expect(formatearPrecio(-1)).toBe("Precio no disponible");
  });
});