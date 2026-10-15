import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../pages/Carrito";

const carritoEjemplo = [
  { id: "EV002", nombre: "Bioimpedanciometría", precio: 10000, cantidad: 2 },
];

function renderCarrito(overrides = {}) {
  const props = {
    carrito: carritoEjemplo,
    onCambiarCantidad: vi.fn(),
    onEliminar: vi.fn(),
    onVaciar: vi.fn(),
    ...overrides,
  };
  return { ...render(<MemoryRouter><Carrito {...props} /></MemoryRouter>), props };
}

describe("Integrante 2 · carrito y persistencia", () => {
  it("muestra mensaje y enlace cuando el carrito está vacío", () => {
    renderCarrito({ carrito: [] });
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explorar servicios" })).toHaveAttribute("href", "/productos");
  });

  it("muestra los productos y las cantidades recibidas", () => {
    renderCarrito();
    expect(screen.getByRole("row", { name: /Bioimpedanciometría/ })).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calcula el total multiplicando precio por cantidad", () => {
    renderCarrito();
    expect(screen.getByText(/Total:.*20\.000/)).toBeInTheDocument();
  });

  it("solicita aumentar la cantidad mediante el callback", async () => {
    const user = userEvent.setup();
    const onCambiarCantidad = vi.fn();
    renderCarrito({ onCambiarCantidad });
    await user.click(screen.getByRole("button", { name: "Agregar una unidad de Bioimpedanciometría" }));
    expect(onCambiarCantidad).toHaveBeenCalledWith("EV002", 1);
  });

  it("solicita disminuir la cantidad mediante el callback", async () => {
    const user = userEvent.setup();
    const onCambiarCantidad = vi.fn();
    renderCarrito({ onCambiarCantidad });
    await user.click(screen.getByRole("button", { name: "Quitar una unidad de Bioimpedanciometría" }));
    expect(onCambiarCantidad).toHaveBeenCalledWith("EV002", -1);
  });

  it("permite eliminar una línea del carrito", async () => {
    const user = userEvent.setup();
    const onEliminar = vi.fn();
    renderCarrito({ onEliminar });
    await user.click(screen.getByRole("button", { name: "Eliminar Bioimpedanciometría" }));
    expect(onEliminar).toHaveBeenCalledWith("EV002");
  });

  it("permite vaciar el carrito completo", async () => {
    const user = userEvent.setup();
    const onVaciar = vi.fn();
    renderCarrito({ onVaciar });
    await user.click(screen.getByRole("button", { name: "Vaciar carrito" }));
    expect(onVaciar).toHaveBeenCalledOnce();
  });

  it("muestra subtotal de una línea", () => {
    renderCarrito();
    expect(screen.getByText(/20\.000/)).toBeInTheDocument();
  });

  it("ofrece continuar al formulario de reserva", () => {
    renderCarrito();
    expect(screen.getByRole("link", { name: "Continuar a reserva" })).toHaveAttribute("href", "/reserva");
  });

  it("suma el total de más de una línea de producto", () => {
    renderCarrito({
      carrito: [
        { id: "A", nombre: "Consulta", precio: 10000, cantidad: 1 },
        { id: "B", nombre: "Taller", precio: 15000, cantidad: 1 },
      ],
    });
    expect(screen.getByText(/Total:.*25\.000/)).toBeInTheDocument();
  });
});