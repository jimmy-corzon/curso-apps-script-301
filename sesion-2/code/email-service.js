/**
 * @fileoverview Gestiona la creación y el envío de correos electrónicos
 * utilizando plantillas HTML.
 */

/**
 * Envía un reporte en PDF por correo electrónico.
 * @param {Object} projectData Un objeto con los datos de un proyecto combinado.
 * @param {GoogleAppsScript.Drive.File} pdfAttachment El archivo PDF para adjuntar.
 */
function sendReportByEmail(projectData, pdfAttachment) {
  try {
    const recipient = projectData.client.email;
    const subject = `Reporte de Avance del Proyecto: ${projectData.name}`;

    const template = HtmlService.createTemplateFromFile(EMAIL_TEMPLATE_NAME);
    template.data = projectData; // Pasamos el objeto completo a la plantilla
    const htmlBody = template.evaluate().getContent();

    GmailApp.sendEmail(recipient, subject, "Por favor, active HTML para ver este correo.", {
      htmlBody: htmlBody,
      attachments: [pdfAttachment],
    });

    Logger.log(`Correo enviado exitosamente a ${recipient} para el proyecto ${projectData.name}`);
  } catch (error) {
    Logger.log(`Error enviando correo para ${projectData.name}: ${error}`);
  }
}
