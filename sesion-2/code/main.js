/**
 * @fileoverview Punto de entrada principal y orquestador del flujo de trabajo.
 */

/**
 * Función principal que se ejecuta para procesar todos los proyectos pendientes.
 * Itera sobre los proyectos, genera el reporte en PDF, lo envía por correo
 * y actualiza el estado en la hoja de cálculo.
 */
function processPendingReports() {
  Logger.log("Iniciando proceso de generación de reportes...");

  const pendingProjects = getCombinedProjectData();

  if (pendingProjects.length === 0) {
    Logger.log("No hay proyectos pendientes para procesar. Finalizando.");
    return;
  }

  Logger.log(`Se encontraron ${pendingProjects.length} proyectos pendientes.`);

  pendingProjects.forEach((project) => {
    Logger.log(`Procesando proyecto: ${project.name} para el cliente ${project.client.name}`);

    const pdfFile = createReport(project);

    if (pdfFile) {
      sendReportByEmail(project, pdfFile);
      updateProjectStatus(project.rowNumber);
      Logger.log(`Proyecto ${project.name} procesado y estado actualizado.`);
    } else {
      Logger.log(`Falló la creación del reporte para el proyecto ${project.name}. Saltando.`);
    }
  });

  Logger.log("Proceso de generación de reportes finalizado.");
}
