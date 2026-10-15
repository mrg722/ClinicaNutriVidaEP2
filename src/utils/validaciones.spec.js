import { describe, expect, it } from "vitest";
import {
  normalizarCorreo,
  obtenerFechaLocal,
  validarCorreo,
  validarFechaNoAnterior,
  validarFechaNoFutura,
  validarHoraConsulta,
  validarMotivoConsulta,
  validarNombre,
  validarRun,
  validarTelefono,
} from "./validaciones";

describe("validaciones NutriVida", () => {
  it("normaliza correo y maneja un valor vacío o nulo", () => {
    expect(normalizarCorreo("  Ana@GMAIL.COM ")).toBe("ana@gmail.com");
    expect(normalizarCorreo(null)).toBe("");
  });

  it("acepta solo los dominios de correo permitidos en el formulario original", () => {
    expect(validarCorreo("ana@gmail.com")).toBe(true);
    expect(validarCorreo("alumno@duoc.cl")).toBe(true);
    expect(validarCorreo("profe@profesor.duoc.cl")).toBe(true);
    expect(validarCorreo("ana@example.com")).toBe(false);
    expect(validarCorreo("correo-sin-arroba")).toBe(false);
  });

  it("valida nombres con letras y rechaza números o texto vacío", () => {
    expect(validarNombre("Ana María")).toBe(true);
    expect(validarNombre("José Núñez")).toBe(true);
    expect(validarNombre("Ana3")).toBe(false);
    expect(validarNombre(" A ")).toBe(false);
    expect(validarNombre(null)).toBe(false);
  });

  it("valida RUN con dígito verificador 0, K y casos incorrectos", () => {
    expect(validarRun("2.100.000-0")).toBe(true);
    expect(validarRun("5.500.000-K")).toBe(true);
    expect(validarRun("12.345.678-5")).toBe(true);
    expect(validarRun("12.345.678-9")).toBe(false);
    expect(validarRun("abc")).toBe(false);
  });

  it("acepta teléfonos en formato nacional o internacional y rechaza texto", () => {
    expect(validarTelefono("+56 9 1234 5678")).toBe(true);
    expect(validarTelefono("912345678")).toBe(true);
    expect(validarTelefono("teléfono")).toBe(false);
    expect(validarTelefono("")).toBe(false);
  });

  it("genera fecha local YYYY-MM-DD sin depender de UTC", () => {
    expect(obtenerFechaLocal(new Date(2026, 9, 15))).toBe("2026-10-15");
  });

  it("valida que la reserva sea hoy o posterior", () => {
    const hoy = new Date(2026, 9, 15);
    expect(validarFechaNoAnterior("", hoy)).toBe(false);
    expect(validarFechaNoAnterior("2026-10-14", hoy)).toBe(false);
    expect(validarFechaNoAnterior("2026-10-15", hoy)).toBe(true);
    expect(validarFechaNoAnterior("2026-10-16", hoy)).toBe(true);
  });

  it("permite fecha de nacimiento vacía/opcional y rechaza fechas futuras", () => {
    const hoy = new Date(2026, 9, 15);
    expect(validarFechaNoFutura("", hoy)).toBe(true);
    expect(validarFechaNoFutura("2000-01-01", hoy)).toBe(true);
    expect(validarFechaNoFutura("2026-10-16", hoy)).toBe(false);
  });

  it("valida horas de atención inclusivas entre nueve y dieciocho", () => {
    expect(validarHoraConsulta("09:00")).toBe(true);
    expect(validarHoraConsulta("18:00")).toBe(true);
    expect(validarHoraConsulta("08:59")).toBe(false);
    expect(validarHoraConsulta("18:01")).toBe(false);
    expect(validarHoraConsulta("")).toBe(false);
  });

  it("valida el motivo mínimo y tolera valores vacíos", () => {
    expect(validarMotivoConsulta("Dolor")).toBe(false);
    expect(validarMotivoConsulta("Consulta general")).toBe(true);
    expect(validarMotivoConsulta(null)).toBe(false);
  });
});