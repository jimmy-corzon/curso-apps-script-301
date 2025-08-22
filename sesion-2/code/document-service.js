/**
 * @fileoverview Maneja la creación de documentos a partir de plantillas
 * y la exportación a formato PDF.
 */

/**
 * Crea un documento de Google a partir de una plantilla y lo convierte a PDF.
 * @param {Object} projectData Un objeto con los datos de un proyecto combinado.
 * @returns {GoogleAppsScript.Drive.File|null} El archivo PDF generado o null si hay error.
 */
function createReport(projectData) {
  try {
    const destinationFolderTemp = DriveApp.getFolderById(DESTINATION_FOLDER_TEMP_ID);
    const destinationFolderPdf = DriveApp.getFolderById(DESTINATION_FOLDER_PDF_ID);

    const templateFile = DriveApp.getFileById(TEMPLATE_DOC_ID);

    const reportName = `Reporte - ${projectData.client.name} - ${projectData.name}`;

    // 1. Copiar la plantilla
    const tempDocFile = templateFile.makeCopy(reportName + " (Temporal)", destinationFolderTemp);

    // 2. Abrir y reemplazar placeholders
    const doc = DocumentApp.openById(tempDocFile.getId());
    const body = doc.getBody();

    body.replaceText("{{Numero_Proyecto}}", projectData.id);
    body.replaceText("{{Fecha_Proyecto}}", projectData.date);
    body.replaceText("{{Nombre_Cliente}}", projectData.client.name);
    body.replaceText("{{Direccion_Cliente}}", projectData.client.address);
    body.replaceText("{{Email_Cliente}}", projectData.client.email);
    body.replaceText("{{Proyecto}}", projectData.name);
    body.replaceText("{{Monto}}", projectData.amount.toFixed(2));

    doc.saveAndClose();

    // 3. Exportar a PDF
    const pdfBlob = tempDocFile.getBlob().getAs("application/pdf");
    pdfBlob.setName(reportName + ".pdf");
    const pdfFile = destinationFolderPdf.createFile(pdfBlob);

    // 4. Limpieza: Borrar el archivo temporal de Google Docs
    tempDocFile.setTrashed(true);

    return pdfFile;
  } catch (error) {
    Logger.log(`Error creando el reporte para ${projectData.name}: ${error}`);
    return null;
  }
}
