import { describe, expect, it } from "vitest";
import {
  normalizarCorreo,
  obtenerFechaLocal,
  validarCorreo,
  validarFechaNoAnterior,
  validarHoraConsulta,
  validarMotivoConsulta,
  validarNombre,
  validarTelefono,
} from "./validaciones";

describe("validaciones de NutriVida", () => {
  it("normaliza correo y trata valores nulos", () => {
    expect(normalizarCorreo("  Ana@GMAIL.COM ")).toBe("ana@gmail.com");
    expect(normalizarCorreo(null)).toBe("");
  });

  it("acepta los dominios del formulario original", () => {
    expect(validarCorreo("ana@gmail.com")).toBe(true);
    expect(validarCorreo("alumno@duoc.cl")).toBe(true);
    expect(validarCorreo("profe@profesor.duoc.cl")).toBe(true);
    expect(validarCorreo("ana@example.com")).toBe(false);
  });

  it("valida nombres con tildes y rechaza números", () => {
    expect(validarNombre("Ana María")).toBe(true);
    expect(validarNombre("José Núñez")).toBe(true);
    expect(validarNombre("Ana3")).toBe(false);
    expect(validarNombre(null)).toBe(false);
  });

  it("valida teléfonos nacionales o internacionales", () => {
    expect(validarTelefono("+56 9 1234 5678")).toBe(true);
    expect(validarTelefono("912345678")).toBe(true);
    expect(validarTelefono("teléfono")).toBe(false);
  });

  it("crea fecha local con formato AAAA-MM-DD", () => {
    expect(obtenerFechaLocal(new Date(2026, 9, 15))).toBe("2026-10-15");
  });

  it("acepta reservas de hoy o posteriores", () => {
    const hoy = new Date(2026, 9, 15);
    expect(validarFechaNoAnterior("", hoy)).toBe(false);
    expect(validarFechaNoAnterior("2026-10-14", hoy)).toBe(false);
    expect(validarFechaNoAnterior("2026-10-15", hoy)).toBe(true);
    expect(validarFechaNoAnterior("2026-10-16", hoy)).toBe(true);
  });

  it("valida horario de consulta inclusive entre 09:00 y 18:00", () => {
    expect(validarHoraConsulta("09:00")).toBe(true);
    expect(validarHoraConsulta("18:00")).toBe(true);
    expect(validarHoraConsulta("08:59")).toBe(false);
    expect(validarHoraConsulta("18:01")).toBe(false);
    expect(validarHoraConsulta("")).toBe(false);
  });

  it("requiere al menos diez caracteres en el motivo", () => {
    expect(validarMotivoConsulta("Dolor")).toBe(false);
    expect(validarMotivoConsulta("Consulta general")).toBe(true);
    expect(validarMotivoConsulta(null)).toBe(false);
  });
});
