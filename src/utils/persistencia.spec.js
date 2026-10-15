import { afterEach, describe, expect, it, vi } from "vitest";
import { guardarJSON, leerJSON } from "./persistencia";

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("leerJSON", () => {
  it("devuelve el valor alternativo si la clave no existe", () => {
    expect(leerJSON("sin-clave", [])).toEqual([]);
  });

  it("interpreta JSON guardado", () => {
    localStorage.setItem("productos", JSON.stringify([{ id: "EV002" }]));
    expect(leerJSON("productos", [])).toEqual([{ id: "EV002" }]);
  });

  it("usa el valor alternativo ante texto malformado", () => {
    localStorage.setItem("carrito", "{");
    expect(leerJSON("carrito", [])).toEqual([]);
  });
});

describe("guardarJSON", () => {
  it("escribe la clave y el valor serializado", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const productos = [{ id: "EV002", nombre: "Bioimpedanciometría" }];
    expect(guardarJSON("carrito", productos)).toBe(true);
    expect(espia).toHaveBeenCalledWith("carrito", JSON.stringify(productos));
  });

  it("devuelve false si el navegador no deja escribir", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Almacenamiento no disponible");
    });
    expect(guardarJSON("carrito", [])).toBe(false);
  });
});
