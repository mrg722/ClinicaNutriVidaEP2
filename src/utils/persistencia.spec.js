import { afterEach, describe, expect, it, vi } from "vitest";
import { guardarJSON, leerJSON } from "./persistencia";

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("leerJSON", () => {
  it("devuelve alternativa cuando la clave no existe", () => {
    expect(leerJSON("sin-clave", [])).toEqual([]);
  });

  it("convierte el contenido JSON almacenado", () => {
    localStorage.setItem("elementos", JSON.stringify([{ id: 1 }]));
    expect(leerJSON("elementos", [])).toEqual([{ id: 1 }]);
  });

  it("devuelve alternativa si el texto no es JSON válido", () => {
    localStorage.setItem("roto", "{");
    expect(leerJSON("roto", [])).toEqual([]);
  });
});

describe("guardarJSON", () => {
  it("serializa el valor y registra la llamada a setItem", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const datos = [{ id: "EV002", nombre: "Bioimpedanciometría" }];

    expect(guardarJSON("carrito", datos)).toBe(true);
    expect(espia).toHaveBeenCalledWith("carrito", JSON.stringify(datos));
  });

  it("devuelve false si el almacenamiento no permite escribir", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Almacenamiento no disponible");
    });

    expect(guardarJSON("carrito", [])).toBe(false);
  });
});