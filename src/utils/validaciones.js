const PATRON_CORREO = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,100}$/;
const PATRON_TELEFONO = /^\+?\d[\d\s-]{7,14}$/;

export function normalizarCorreo(valor) {
  return String(valor ?? "").trim().toLowerCase();
}

export function validarCorreo(valor) {
  return PATRON_CORREO.test(normalizarCorreo(valor));
}

export function validarNombre(valor) {
  return PATRON_NOMBRE.test(String(valor ?? "").trim());
}

export function validarTelefono(valor) {
  return PATRON_TELEFONO.test(String(valor ?? "").trim());
}

export function obtenerFechaLocal(fecha = new Date()) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return [anio, mes, dia].join("-");
}

export function validarFechaNoAnterior(valor, hoy = new Date()) {
  return Boolean(valor) && valor >= obtenerFechaLocal(hoy);
}

export function validarHoraConsulta(valor) {
  return Boolean(valor) && valor >= "09:00" && valor <= "18:00";
}

export function validarMotivoConsulta(valor) {
  return String(valor ?? "").trim().length >= 10;
}
