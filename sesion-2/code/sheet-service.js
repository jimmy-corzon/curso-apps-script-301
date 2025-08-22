/**
 * @fileoverview Contiene todas las funciones relacionadas con la interacción
 * con Google Sheets, como leer datos, combinarlos y actualizar estados.
 */

/**
 * Obtiene todos los datos de una hoja específica.
 * @param {string} sheetName El nombre de la hoja de la que se quieren obtener los datos.
 * @returns {Array<Array<any>>} Un array 2D con los datos de la hoja.
 */
function getSheetData(sheetName) {
  try {
    const ss = SpreadsheetApp.openById(GOOGLE_SHEET_ID);
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`La hoja "${sheetName}" no fue encontrada.`);
    }
    // getRange(fila_inicio, col_inicio, num_filas, num_columnas)
    // Empezamos en la fila 2 para saltar los encabezados.
    return sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getDisplayValues();
  } catch (error) {
    Logger.log(`Error en getSheetData(${sheetName}): ${error}`);
    return [];
  }
}

/**
 * Combina los datos de proyectos y clientes en una estructura de objetos unificada.
 * @returns {Array<Object>} Un array de objetos, donde cada objeto representa un proyecto con los datos del cliente anidados.
 */
function getCombinedProjectData() {
  const projectsData = getSheetData(PROJECTS_SHEET_NAME);
  const clientsData = getSheetData(CLIENTS_SHEET_NAME);

  const clientsMap = new Map();
  clientsData.forEach((clientRow) => {
    const clientId = clientRow[CLIENTS_COLUMNS.ID];
    if (clientId) {
      clientsMap.set(clientId, {
        id: clientId,
        name: clientRow[CLIENTS_COLUMNS.NAME],
        address: clientRow[CLIENTS_COLUMNS.ADDRESS],
        email: clientRow[CLIENTS_COLUMNS.EMAIL],
      });
    }
  });

  const combinedData = projectsData
    .map((projectRow, index) => {
      const clientId = projectRow[PROJECTS_COLUMNS.CLIENT_ID];
      const clientInfo = clientsMap.get(clientId);
      const status = projectRow[PROJECTS_COLUMNS.STATUS];

      // Solo procesamos si el cliente existe y el estado NO es 'ENVIADO'
      if (clientInfo && status.toString().toUpperCase() !== STATUS_COMPLETED) {
        return {
          rowNumber: index + 2, // Guardamos el número de fila original para poder actualizarlo después
          date: projectRow[PROJECTS_COLUMNS.DATE],
          id: projectRow[PROJECTS_COLUMNS.ID],
          name: projectRow[PROJECTS_COLUMNS.NAME],
          amount: parseFloat(projectRow[PROJECTS_COLUMNS.AMOUNT]),
          status: status,
          client: clientInfo,
        };
      }
      return null;
    })
    .filter(Boolean); // Limpia los nulos

  return combinedData;
}

/**
 * Actualiza la columna de estado de un proyecto a "ENVIADO".
 * @param {number} rowNumber El número de la fila a actualizar en la hoja de PROYECTOS.
 */
function updateProjectStatus(rowNumber) {
  try {
    const sheet = SpreadsheetApp.openById(GOOGLE_SHEET_ID).getSheetByName(PROJECTS_SHEET_NAME);
    // La columna de estado es la 6 (índice 5 + 1)
    sheet.getRange(rowNumber, PROJECTS_COLUMNS.STATUS + 1).setValue(STATUS_COMPLETED);
    SpreadsheetApp.flush(); // Asegura que los cambios se guarden inmediatamente.
  } catch (error) {
    Logger.log(`Error actualizando la fila ${rowNumber}: ${error}`);
  }
}
