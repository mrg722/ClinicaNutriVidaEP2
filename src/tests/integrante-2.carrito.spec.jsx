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

describe("Integrante 2 · carrito", () => {
  it("muestra el estado vacío y el enlace al catálogo", () => {
    renderCarrito({ carrito: [] });
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explorar servicios" })).toHaveAttribute("href", "/productos");
  });

  it("muestra producto y cantidad recibidos", () => {
    renderCarrito();
    expect(screen.getByRole("row", { name: /Bioimpedanciometría/ })).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calcula el total multiplicando precio por cantidad", () => {
    renderCarrito();
    expect(screen.getByText(/Total:.*20\.000/)).toBeInTheDocument();
  });

  it("solicita aumentar la cantidad a través de la prop callback", async () => {
    const user = userEvent.setup();
    const onCambiarCantidad = vi.fn();
    renderCarrito({ onCambiarCantidad });
    await user.click(screen.getByRole("button", { name: "Agregar una unidad de Bioimpedanciometría" }));
    expect(onCambiarCantidad).toHaveBeenCalledWith("EV002", 1);
  });

  it("solicita disminuir la cantidad a través de la prop callback", async () => {
    const user = userEvent.setup();
    const onCambiarCantidad = vi.fn();
    renderCarrito({ onCambiarCantidad });
    await user.click(screen.getByRole("button", { name: "Quitar una unidad de Bioimpedanciometría" }));
    expect(onCambiarCantidad).toHaveBeenCalledWith("EV002", -1);
  });

  it("solicita eliminar la línea seleccionada", async () => {
    const user = userEvent.setup();
    const onEliminar = vi.fn();
    renderCarrito({ onEliminar });
    await user.click(screen.getByRole("button", { name: "Eliminar Bioimpedanciometría" }));
    expect(onEliminar).toHaveBeenCalledWith("EV002");
  });

  it("permite vaciar el carrito", async () => {
    const user = userEvent.setup();
    const onVaciar = vi.fn();
    renderCarrito({ onVaciar });
    await user.click(screen.getByRole("button", { name: "Vaciar carrito" }));
    expect(onVaciar).toHaveBeenCalledOnce();
  });

  it("muestra el subtotal de la línea", () => {
    renderCarrito();
    expect(screen.getByRole("row", { name: /Bioimpedanciometría.*20\.000/ })).toBeInTheDocument();
  });

  it("ofrece continuar hacia el formulario de reserva", () => {
    renderCarrito();
    expect(screen.getByRole("link", { name: "Continuar a reserva" })).toHaveAttribute("href", "/reserva");
  });

  it("suma el importe de varias líneas", () => {
    renderCarrito({
      carrito: [
        { id: "A", nombre: "Consulta", precio: 10000, cantidad: 1 },
        { id: "B", nombre: "Taller", precio: 15000, cantidad: 1 },
      ],
    });
    expect(screen.getByText(/Total:.*25\.000/)).toBeInTheDocument();
  });
});
