import { describe, expect, it } from "vitest";
import { formatearPrecio } from "./precio";

describe("formatearPrecio", () => {
  it("representa el precio cero como Gratis", () => {
    expect(formatearPrecio(0)).toBe("Gratis");
  });

  it("formatea un importe positivo en pesos chilenos", () => {
    expect(formatearPrecio(15000)).toContain("15.000");
  });

  it("rechaza valores negativos", () => {
    expect(formatearPrecio(-1)).toBe("Precio no disponible");
  });

  it("rechaza textos que no representan números finitos", () => {
    expect(formatearPrecio("sin precio")).toBe("Precio no disponible");
  });
});
