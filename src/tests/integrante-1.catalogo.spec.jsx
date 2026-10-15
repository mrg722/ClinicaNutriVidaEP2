import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import Productos from "../pages/Productos";
import { formatearPrecio } from "../utils/precio";

const productos = [
  { id: "EV002", nombre: "Bioimpedanciometría", categoria: "Evaluación", descripcion: "Evaluación corporal.", precio: 12000, imagen: "/bio.jpg" },
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
  it("muestra nombre y categoría desde las props", () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
    expect(screen.getByText("Evaluación")).toBeInTheDocument();
  });

  it("muestra el precio formateado", () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={vi.fn()} /></MemoryRouter>);
    expect(screen.getByText(/12\.000/)).toBeInTheDocument();
  });

  it("da a la imagen un texto alternativo descriptivo", () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("img", { name: "Imagen de Bioimpedanciometría" })).toBeInTheDocument();
  });

  it("llama al callback con el producto correcto", async () => {
    const user = userEvent.setup();
    const onAgregar = vi.fn();
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={onAgregar} /></MemoryRouter>);
    await user.click(screen.getByRole("button", { name: "Agregar Bioimpedanciometría al carrito" }));
    expect(onAgregar).toHaveBeenCalledWith(productos[0]);
  });

  it("enlaza al detalle usando el código del producto", () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} onAgregar={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("link", { name: "Ver detalle" })).toHaveAttribute("href", "/productos/EV002");
  });

  it("genera las tarjetas desde todos los objetos recibidos", () => {
    renderCatalogo();
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Taller de alimentación saludable" })).toBeInTheDocument();
  });

  it("filtra los productos por categoría", async () => {
    const user = userEvent.setup();
    renderCatalogo();
    await user.selectOptions(screen.getByLabelText("Filtrar por categoría"), "Taller");
    expect(screen.getByRole("heading", { name: "Taller de alimentación saludable" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Bioimpedanciometría" })).not.toBeInTheDocument();
  });

  it("busca por nombre del servicio", async () => {
    const user = userEvent.setup();
    renderCatalogo();
    await user.type(screen.getByLabelText("Buscar servicios"), "bioimpedanciometría");
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Taller de alimentación saludable" })).not.toBeInTheDocument();
  });

  it("muestra un aviso si no hay coincidencias", async () => {
    const user = userEvent.setup();
    renderCatalogo();
    await user.type(screen.getByLabelText("Buscar servicios"), "servicio inexistente");
    expect(screen.getByRole("status")).toHaveTextContent("No encontramos servicios");
  });

  it("trata precios gratis e inválidos de forma explícita", () => {
    expect(formatearPrecio(0)).toBe("Gratis");
    expect(formatearPrecio(-1)).toBe("Precio no disponible");
  });
});
