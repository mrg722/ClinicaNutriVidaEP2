import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
  window.history.pushState({}, "", "/");
});

describe("Aplicación NutriVida", () => {
  it("muestra el título principal de la clínica", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: "Cuida tu alimentación, mejora tu vida",
      }),
    ).toBeInTheDocument();
  });

  it("muestra las tres tarjetas de servicios de la portada", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Consulta nutricional" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Planes de alimentación" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Seguimiento nutricional" })).toBeInTheDocument();
  });

  it("permite guardar y quitar un servicio", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole("button", { name: "Guardar servicio" })[0]);
    expect(screen.getByRole("button", { name: "Guardado ✓" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Guardado ✓" }));
    expect(screen.getAllByRole("button", { name: "Guardar servicio" })).toHaveLength(3);
  });

  it("guarda el servicio mediante localStorage", async () => {
    const user = userEvent.setup();
    const espia = vi.spyOn(Storage.prototype, "setItem");
    render(<App />);
    await user.click(screen.getAllByRole("button", { name: "Guardar servicio" })[0]);
    expect(espia).toHaveBeenCalledWith(
      "nutrivida-guardados",
      JSON.stringify(["Consulta nutricional"]),
    );
  });

  it("abre la vista de servicios mediante la ruta", () => {
    window.history.pushState({}, "", "/servicios");
    render(<App />);
    expect(screen.getByText("Conoce las opciones de atención nutricional que ofrecemos.")).toBeInTheDocument();
  });

  it("abre la tienda con los datos del catálogo original", () => {
    window.history.pushState({}, "", "/productos");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Tienda NutriVida" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
  });

  it("muestra una página 404 para una ruta desconocida", () => {
    window.history.pushState({}, "", "/ruta-inexistente");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Página no encontrada" })).toBeInTheDocument();
  });

  it("muestra enlaces de navegación internos", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Servicios" })).toHaveAttribute("href", "/servicios");
    expect(screen.getByRole("link", { name: "Tienda" })).toHaveAttribute("href", "/productos");
  });

  it("muestra el pie de página de NutriVida", () => {
    render(<App />);
    expect(screen.getByText(/Tu bienestar comienza con buenos hábitos/)).toBeInTheDocument();
  });

  it("abre el detalle de un producto usando su código original", () => {
    window.history.pushState({}, "", "/productos/EV002");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Agregar al carrito" })).toBeInTheDocument();
  });
});
