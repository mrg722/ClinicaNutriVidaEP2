import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

beforeEach(() => {
  cleanup();
  localStorage.clear();
  window.history.pushState({}, "", "/");
});

describe("Integración de rutas, carrito y estado global", () => {
  it("renderiza una página de detalle al entrar directamente por código", () => {
    window.history.pushState({}, "", "/productos/EV002");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
  });

  it("muestra una alternativa cuando el código del detalle no existe", () => {
    window.history.pushState({}, "", "/productos/NO-EXISTE");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Servicio no encontrado" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver a la tienda" })).toHaveAttribute("href", "/productos");
  });

  it("agrega productos nuevos y existentes, actualiza cantidades y elimina la línea al bajar de uno", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/productos");
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Agregar Bioimpedanciometría al carrito" }));
    await user.click(screen.getByRole("button", { name: "Agregar Bioimpedanciometría al carrito" }));
    await user.click(screen.getByRole("button", { name: "Agregar Taller de alimentación saludable al carrito" }));

    await user.click(screen.getByRole("link", { name: /Carrito, 3 unidades/i }));
    expect(screen.getByRole("row", { name: /Bioimpedanciometría.*24\.000/ })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Taller de alimentación saludable/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Agregar una unidad de Bioimpedanciometría" }));
    expect(screen.getByText(/Total:.*51\.000/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Quitar una unidad de Bioimpedanciometría" }));
    await user.click(screen.getByRole("button", { name: "Quitar una unidad de Bioimpedanciometría" }));
    await user.click(screen.getByRole("button", { name: "Quitar una unidad de Bioimpedanciometría" }));
    expect(screen.queryByRole("row", { name: /Bioimpedanciometría/ })).not.toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Taller de alimentación saludable/ })).toBeInTheDocument();
  });

  it("vacía el carrito desde la interfaz real", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/productos");
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Agregar Bioimpedanciometría al carrito" }));
    await user.click(screen.getByRole("link", { name: /Carrito, 1 unidades/i }));
    await user.click(screen.getByRole("button", { name: "Vaciar carrito" }));
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("carrito"))).toEqual([]);
  });

  it("crea productos desde administración y los persiste en el navegador", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/admin");
    render(<App />);
    await user.type(screen.getByLabelText("Nombre"), "Plan NutriVida Demo");
    await user.selectOptions(screen.getByLabelText("Categoría"), "Taller");
    await user.type(screen.getByLabelText("Precio en pesos chilenos"), "18000");
    await user.click(screen.getByRole("button", { name: "Guardar producto" }));

    expect(screen.getByRole("row", { name: /Plan NutriVida Demo/ })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("nutrivida-productos"))).toEqual(
      expect.arrayContaining([expect.objectContaining({ nombre: "Plan NutriVida Demo", precio: 18000 })]),
    );
  });

  it("eliminar de administración también retira ese producto del carrito", async () => {
    const user = userEvent.setup();
    localStorage.setItem("carrito", JSON.stringify([
      { id: "EV002", nombre: "Bioimpedanciometría", precio: 12000, cantidad: 1 },
      { id: "TG001", nombre: "Taller de alimentación saludable", precio: 15000, cantidad: 1 },
    ]));
    window.history.pushState({}, "", "/admin");
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Eliminar Bioimpedanciometría" }));

    const guardados = JSON.parse(localStorage.getItem("nutrivida-productos"));
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    expect(guardados.some((producto) => producto.id === "EV002")).toBe(false);
    expect(carrito.some((producto) => producto.id === "EV002")).toBe(false);
    expect(carrito.some((producto) => producto.id === "TG001")).toBe(true);
  });

  it("recupera un catálogo local previamente almacenado", () => {
    localStorage.setItem("nutrivida-productos", JSON.stringify([
      { id: "CUSTOM-1", nombre: "Producto guardado", categoria: "Consulta", descripcion: "Dato local", precio: 1000, imagen: null },
    ]));
    window.history.pushState({}, "", "/productos");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Producto guardado" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Bioimpedanciometría" })).not.toBeInTheDocument();
  });

  it("tolera datos de carrito inválidos y descarta filas malformadas", () => {
    localStorage.setItem("carrito", "{no-json");
    window.history.pushState({}, "", "/carrito");
    const first = render(<App />);
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
    first.unmount();

    localStorage.setItem("carrito", JSON.stringify([
      { id: null, nombre: "Fila inválida", precio: 900 },
      { id: "EV003", nombre: "Fila válida", precio: 10000, cantidad: 1 },
    ]));
    render(<App />);
    expect(screen.getByRole("heading", { name: "Encuesta de hábitos alimentarios" })).not.toBeInTheDocument();
    expect(screen.getByText("Fila válida")).toBeInTheDocument();
    expect(screen.queryByText("Fila inválida")).not.toBeInTheDocument();
  });

  it("muestra mensaje de vacío cuando la clave de productos contiene un tipo incorrecto", () => {
    localStorage.setItem("nutrivida-productos", JSON.stringify({ datos: [] }));
    window.history.pushState({}, "", "/productos");
    render(<App />);
    expect(screen.getByText("0 resultados")).toBeInTheDocument();
  });
});
