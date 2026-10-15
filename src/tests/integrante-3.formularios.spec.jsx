import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Reserva from "../pages/Reserva";
import Contacto from "../pages/Contacto";
import Acceso from "../pages/Acceso";
import Administracion from "../pages/Administracion";

const productos = [
  { id: "EV002", nombre: "Consulta nutricional", categoria: "Evaluación", descripcion: "Consulta.", precio: 12000 },
];

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

describe("Integrante 3 · formularios y validaciones", () => {
  it("muestra errores al enviar una reserva vacía", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Reserva productos={productos} /></MemoryRouter>);
    await user.click(screen.getByRole("button", { name: "Validar solicitud" }));
    expect(screen.getByText("Ingresa tu nombre.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un correo válido.")).toBeInTheDocument();
  });

  it("rechaza una dirección de correo inválida en reserva", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Reserva productos={productos} /></MemoryRouter>);
    await user.type(screen.getByLabelText("Nombre completo"), "Ana Demo");
    await user.type(screen.getByLabelText("Correo electrónico"), "correo-invalido");
    await user.selectOptions(screen.getByLabelText("Servicio"), "Consulta nutricional");
    await user.type(screen.getByLabelText("Fecha solicitada"), "2026-10-22");
    await user.click(screen.getByRole("button", { name: "Validar solicitud" }));
    expect(screen.getByText("Ingresa un correo válido.")).toBeInTheDocument();
  });

  it("muestra aviso de demostración cuando la reserva pasa las validaciones", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Reserva productos={productos} /></MemoryRouter>);
    await user.type(screen.getByLabelText("Nombre completo"), "Ana Demo");
    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.com");
    await user.selectOptions(screen.getByLabelText("Servicio"), "Consulta nutricional");
    await user.type(screen.getByLabelText("Fecha solicitada"), "2026-10-22");
    await user.click(screen.getByRole("button", { name: "Validar solicitud" }));
    expect(screen.getByRole("status")).toHaveTextContent("no está conectada a una agenda real");
  });

  it("preselecciona el servicio indicado en la URL", () => {
    render(<MemoryRouter initialEntries={["/reserva?servicio=Consulta%20nutricional"]}><Reserva productos={productos} /></MemoryRouter>);
    expect(screen.getByLabelText("Servicio")).toHaveValue("Consulta nutricional");
  });

  it("rechaza mensajes de contacto demasiado cortos", async () => {
    const user = userEvent.setup();
    render(<Contacto />);
    await user.type(screen.getByLabelText("Nombre"), "Ana");
    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.com");
    await user.type(screen.getByLabelText("Mensaje"), "Hola");
    await user.click(screen.getByRole("button", { name: "Validar mensaje" }));
    expect(screen.getByText("Escribe un mensaje de al menos 10 caracteres.")).toBeInTheDocument();
  });

  it("valida el formulario de contacto completo sin afirmar envío a servidor", async () => {
    const user = userEvent.setup();
    render(<Contacto />);
    await user.type(screen.getByLabelText("Nombre"), "Ana");
    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.com");
    await user.type(screen.getByLabelText("Mensaje"), "Necesito más información.");
    await user.click(screen.getByRole("button", { name: "Validar mensaje" }));
    expect(screen.getByRole("status")).toHaveTextContent("no se envían mensajes a un servidor");
  });

  it("valida el nombre obligatorio en el formulario de registro", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Acceso modo="registro" /></MemoryRouter>);
    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "ClaveSegura123");
    await user.click(screen.getByRole("button", { name: "Validar registro" }));
    expect(screen.getByText("Ingresa tu nombre.")).toBeInTheDocument();
  });

  it("no guarda la contraseña y explica que el registro no crea una cuenta real", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Acceso modo="registro" /></MemoryRouter>);
    await user.type(screen.getByLabelText("Nombre completo"), "Ana Demo");
    await user.type(screen.getByLabelText("Correo electrónico"), "ana@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "ClaveSegura123");
    await user.click(screen.getByRole("button", { name: "Validar registro" }));
    expect(screen.getByRole("status")).toHaveTextContent("no se ha creado sesión ni guardado la contraseña");
    expect(localStorage.getItem("clave")).toBeNull();
  });

  it("crea un producto a través de la prop recibida", async () => {
    const user = userEvent.setup();
    const onCrearProducto = vi.fn();
    render(<Administracion productos={productos} onCrearProducto={onCrearProducto} onEliminarProducto={vi.fn()} />);
    await user.type(screen.getByLabelText("Nombre"), "Plan nuevo");
    await user.selectOptions(screen.getByLabelText("Categoría"), "Taller");
    await user.type(screen.getByLabelText("Precio en pesos chilenos"), "18000");
    await user.click(screen.getByRole("button", { name: "Guardar producto" }));
    expect(onCrearProducto).toHaveBeenCalledWith(expect.objectContaining({ nombre: "Plan nuevo", categoria: "Taller", precio: 18000 }));
  });

  it("solicita eliminar el producto seleccionado en administración", async () => {
    const user = userEvent.setup();
    const onEliminarProducto = vi.fn();
    render(<Administracion productos={productos} onCrearProducto={vi.fn()} onEliminarProducto={onEliminarProducto} />);
    await user.click(screen.getByRole("button", { name: "Eliminar Consulta nutricional" }));
    expect(onEliminarProducto).toHaveBeenCalledWith("EV002");
  });
});