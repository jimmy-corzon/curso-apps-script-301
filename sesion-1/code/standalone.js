// Ejemplo de script tipo "Standalone" en Google Apps Script
// Este archivo muestra cómo interactuar con Google Sheets y servicios externos.
// Un script "Standalone" es independiente y se crea desde script.google.com
function simularSolicitudServicioExterno() {
  // Id de la hoja de cálculo de Google Sheets
  const id_sheet = "1oQCnK1CBQKFbCHECDPbO6UfdV7UWJKQ60VzLXEMUY40";

  // Abrir la hoja de cálculo por ID
  const ss = SpreadsheetApp.openById(id_sheet);

  // Seleccionar la pestaña llamada "Datos"
  const sheet = ss.getSheetByName("Datos");

  // Obtener el rango D3
  const range = sheet.getRange("D3");

  // Obtener el valor de la celda D3
  const value = range.getValue();

  // URL de un servicio externo para recibir datos
  const url_api = "https://webhook.site/9ac2e3ab-e63b-41de-b389-faf1b2b8958d"; // servicio externo

  // Datos que se envían al servicio externo
  const formData = {
    datos: value,
  };

  // Obtener el token de las propiedades del script
  const token = PropertiesService.getScriptProperties().getProperty("TOKEN");

  // Enviar los datos usando una solicitud HTTP POST
  UrlFetchApp.fetch(url_api, {
    method: "post",
    payload: formData,
    headers: {
      token: token,
    },
  });

  // Mostrar mensaje en el registro
  Logger.log("Se envio");
}
