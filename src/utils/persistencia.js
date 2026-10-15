export function leerJSON(clave, alternativa) {
  try {
    const valorGuardado = localStorage.getItem(clave);
    return valorGuardado === null ? alternativa : JSON.parse(valorGuardado);
  } catch {
    return alternativa;
  }
}

export function guardarJSON(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}
