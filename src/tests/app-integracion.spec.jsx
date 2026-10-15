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
      null,
      { id: null, nombre: "Fila inválida", precio: 900 },
      { id: "EV003", nombre: "Fila válida", precio: 10000, cantidad: 0 },
    ]));
    render(<App />);
    expect(screen.getByRole("row", { name: /Fila válida/ })).toBeInTheDocument();
    expect(screen.getByText("Fila válida")).toBeInTheDocument();
    expect(screen.queryByText("Fila inválida")).not.toBeInTheDocument();
  });

  it("recupera el catálogo inicial cuando la clave de productos contiene un tipo incorrecto", () => {
    localStorage.setItem("nutrivida-productos", JSON.stringify({ datos: [] }));
    window.history.pushState({}, "", "/productos");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Bioimpedanciometría" })).toBeInTheDocument();
  });
  it("elimina una línea del carrito desde la navegación real", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/productos");
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Agregar Bioimpedanciometría al carrito" }));
    await user.click(screen.getByRole("button", { name: "Agregar Taller de alimentación saludable al carrito" }));
    await user.click(screen.getByRole("link", { name: /Carrito, 2 unidades/i }));
    await user.click(screen.getByRole("button", { name: "Eliminar Bioimpedanciometría" }));
    expect(screen.queryByRole("row", { name: /Bioimpedanciometría/ })).not.toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Taller de alimentación saludable/ })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("carrito"))).toHaveLength(1);
  });

  it("renderiza un detalle sin imagen y agrega el servicio desde esa vista", async () => {
    const user = userEvent.setup();
    localStorage.setItem("nutrivida-productos", JSON.stringify([
      { id: "CUSTOM-2", nombre: "Consulta sin fotografía", categoria: "Consulta", descripcion: "Servicio de prueba.", precio: 5000, imagen: null },
    ]));
    window.history.pushState({}, "", "/productos/CUSTOM-2");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Consulta sin fotografía" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Imagen de Consulta sin fotografía" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    await user.click(screen.getByRole("link", { name: /Carrito, 1 unidades/i }));
    expect(screen.getByRole("row", { name: /Consulta sin fotografía/ })).toBeInTheDocument();
  });

  it("muestra y valida el formulario de inicio de sesión sin crear una sesión real", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/login");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Validar acceso" }));
    expect(screen.getByText("Ingresa un correo válido.")).toBeInTheDocument();
    expect(screen.getByText("La contraseña debe tener al menos 8 caracteres.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "ClaveSegura123");
    await user.click(screen.getByRole("button", { name: "Validar acceso" }));
    expect(screen.getByRole("status")).toHaveTextContent(/no autentica usuarios reales/i);
  });

  it("usa una lista vacía cuando los servicios guardados no tienen formato de arreglo", async () => {
    const user = userEvent.setup();
    localStorage.setItem("nutrivida-guardados", JSON.stringify({ servicio: "Consulta nutricional" }));
    render(<App />);
    expect(screen.getByRole("button", { name: "Guardar servicio" })).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: "Guardar servicio" })[0]);
    expect(screen.getByRole("button", { name: "Guardado ✓" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("nutrivida-guardados"))).toEqual(["Consulta nutricional"]);
  });

  it("muestra los errores de campos obligatorios en contacto", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/contacto");
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Validar mensaje" }));
    expect(screen.getByText("Ingresa tu nombre.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un correo válido.")).toBeInTheDocument();
    expect(screen.getByText("Escribe un mensaje de al menos 10 caracteres.")).toBeInTheDocument();
  });

  it("rechaza datos de administración incompletos y un precio negativo", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/admin");
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Guardar producto" }));
    expect(screen.getByText("El nombre es obligatorio.")).toBeInTheDocument();
    expect(screen.getByText("Selecciona una categoría.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un precio igual o mayor que cero.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Nombre"), "Producto inválido");
    await user.selectOptions(screen.getByLabelText("Categoría"), "Taller");
    await user.type(screen.getByLabelText("Descripción"), "Descripción de prueba.");
    await user.type(screen.getByLabelText("Precio en pesos chilenos"), "-1");
    await user.click(screen.getByRole("button", { name: "Guardar producto" }));
    expect(screen.getByText("Ingresa un precio igual o mayor que cero.")).toBeInTheDocument();
    expect(screen.queryByRole("row", { name: /Producto inválido/ })).not.toBeInTheDocument();
  });

});
