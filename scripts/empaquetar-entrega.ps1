$ErrorActionPreference = "Stop"

# Ejecutar desde la raíz de un repositorio Git con los cambios ya confirmados.
# git archive incluye archivos versionados y excluye node_modules, coverage y .git.
$raiz = git rev-parse --show-toplevel
if ($LASTEXITCODE -ne 0 -or -not $raiz) {
  throw "Ejecuta este script dentro de un repositorio Git."
}

Set-Location $raiz
New-Item -ItemType Directory -Force -Path "deliverables" | Out-Null
$destino = Join-Path $raiz "deliverables/NutriVida-EP2.zip"
if (Test-Path $destino) {
  Remove-Item $destino -Force
}

git archive --format=zip --output=$destino HEAD
if ($LASTEXITCODE -ne 0) {
  throw "No se pudo generar el ZIP desde HEAD."
}

Write-Host "Entrega creada: $destino"
Write-Host "Incluye archivos confirmados en Git; confirma que el informe y ERS finales estén añadidos antes de ejecutarlo."