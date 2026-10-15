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
  it.each([
    ["/carrito", "Tu carrito"],
    ["/reserva", "Agendar una cita"],
    ["/contacto", "Contacto"],
    ["/admin", "Administración de productos"],
    ["/login", "Iniciar sesión"],
    ["/registro", "Crear cuenta"],
  ])("renderiza la ruta %s", (ruta, encabezado) => {
    window.history.pushState({}, "", ruta);
    render(<App />);
    expect(screen.getByRole("heading", { name: encabezado })).toBeInTheDocument();
  });

  it("usa el catálogo original si la persistencia de productos no contiene una lista", () => {
    localStorage.setItem("nutrivida-productos", JSON.stringify({ datos: [] }));
    window.history.pushState({}, "", "/productos");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
  });

  it("muestra el carrito vacío ante datos persistidos que no son una lista", () => {
    localStorage.setItem("carrito", JSON.stringify({ producto: "inválido" }));
    window.history.pushState({}, "", "/carrito");
    render(<App />);
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
  });

  it("descarta filas malformadas y normaliza cantidades al recuperar el carrito", () => {
    localStorage.setItem("carrito", JSON.stringify([
      null,
      { id: "MAL", nombre: "Fila inválida", precio: "sin precio", cantidad: 3 },
      { id: "OK", nombre: "Fila válida", precio: 10000, cantidad: 0 },
    ]));
    window.history.pushState({}, "", "/carrito");
    render(<App />);
    expect(screen.getByRole("row", { name: /Fila válida/ })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Fila válida/ })).toHaveTextContent("1");
    expect(screen.queryByText("Fila inválida")).not.toBeInTheDocument();
  });

  it("muestra una alternativa para un código de producto inexistente", () => {
    window.history.pushState({}, "", "/productos/NO-EXISTE");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Servicio no encontrado" })).toBeInTheDocument();
  });

  it("permite abrir el detalle de un servicio que no tiene imagen", () => {
    localStorage.setItem("nutrivida-productos", JSON.stringify([
      { id: "CUSTOM-1", nombre: "Servicio sin fotografía", categoria: "Consulta", descripcion: "Servicio de prueba.", precio: 5000, imagen: null },
    ]));
    window.history.pushState({}, "", "/productos/CUSTOM-1");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Servicio sin fotografía" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Imagen de Servicio sin fotografía" })).not.toBeInTheDocument();
  });

  it("integra el alta y la eliminación local desde administración", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/admin");
    render(<App />);
    await user.type(screen.getByLabelText("Nombre"), "Servicio de prueba integrado");
    await user.selectOptions(screen.getByLabelText("Categoría"), "Taller");
    await user.type(screen.getByLabelText("Precio en pesos chilenos"), "17000");
    await user.click(screen.getByRole("button", { name: "Guardar producto" }));
    expect(screen.getByRole("row", { name: /Servicio de prueba integrado/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Eliminar Servicio de prueba integrado" }));
    expect(screen.queryByRole("row", { name: /Servicio de prueba integrado/ })).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("nutrivida-productos")).some(
      (producto) => producto.nombre === "Servicio de prueba integrado",
    )).toBe(false);
  });

  it("incrementa el mismo producto y lo quita cuando la cantidad vuelve a cero", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/productos");
    render(<App />);
    const agregar = screen.getByRole("button", { name: "Agregar Bioimpedanciometría al carrito" });
    await user.click(agregar);
    await user.click(agregar);
    await user.click(screen.getByRole("link", { name: /Carrito, 2 unidades/i }));
    expect(screen.getByText(/Total:.*24\.000/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Quitar una unidad de Bioimpedanciometría" }));
    await user.click(screen.getByRole("button", { name: "Quitar una unidad de Bioimpedanciometría" }));
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
  });

  it("reconoce el perfil administrativo del acceso de demostración", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/login");
    render(<App />);
    await user.type(screen.getByLabelText("Correo electrónico"), "admin@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "1234");
    await user.click(screen.getByRole("button", { name: "Validar acceso" }));
    expect(screen.getByText(/Perfil detectado: Administrador/)).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Ir a administración" }));
    expect(screen.getByRole("heading", { name: "Administración de productos" })).toBeInTheDocument();
  });

  it("reconoce el perfil nutricionista en el acceso de demostración", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/login");
    render(<App />);
    await user.type(screen.getByLabelText("Correo electrónico"), "nutricionista@duoc.cl");
    await user.type(screen.getByLabelText("Contraseña"), "1234");
    await user.click(screen.getByRole("button", { name: "Validar acceso" }));
    expect(screen.getByText(/Perfil detectado: Nutricionista/)).toBeInTheDocument();
  });

});
