// Ejemplo de script tipo "Container Bound" en Google Apps Script
// Este archivo contiene funciones básicas para mostrar conceptos de Apps Script.
// Un script "Container Bound" está asociado a un documento de Google (por ejemplo, una hoja de cálculo).

function listarMisArchivos() {
  // Lista los nombres de todos los archivos en tu Google Drive
  const files = DriveApp.getFiles();

  while (files.hasNext()) {
    // Muestra el nombre de cada archivo en el registro
    Logger.log(files.next().getName());
  }
}

function sumar() {
  // Suma dos números y muestra el resultado en el registro
  const res = 2 + 2;
  Logger.log("Respuesta" + res);
}

function mYformula(a, b) {
  // Recibe dos números, los suma y retorna el resultado como texto
  const ope = a + b;
  return "La suma es " + ope;
}
