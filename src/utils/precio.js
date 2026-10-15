export function formatearPrecio(valor) {
  const numero = Number(valor);

  if (!Number.isFinite(numero) || numero < 0) {
    return "Precio no disponible";
  }

  if (numero === 0) {
    return "Gratis";
  }

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(numero);
}
