import { describe, expect, it } from "vitest";
import { formatearPrecio } from "./precio";

describe("formatearPrecio", () => {
  it("representa cero como Gratis", () => {
    expect(formatearPrecio(0)).toBe("Gratis");
  });

  it("formatea un precio positivo en pesos chilenos", () => {
    expect(formatearPrecio(15000)).toContain("15.000");
  });

  it("informa que un precio negativo no está disponible", () => {
    expect(formatearPrecio(-1)).toBe("Precio no disponible");
  });

  it("rechaza un valor que no representa un número finito", () => {
    expect(formatearPrecio("no-es-numero")).toBe("Precio no disponible");
  });
});