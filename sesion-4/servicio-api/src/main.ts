function doGet(e: GoogleAppsScript.Events.DoPost) {
  const request = e;
  Logger.log(request);
  return ContentService.createTextOutput(JSON.stringify(request)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const data = e.postData.contents;
  if (data) {
    const emailUser = JSON.parse(data).email;

    // Verificar usuario
    const autorizado = verificarUsuario(emailUser);

    let response: {
      status: boolean;
      message?: string;
      data?: any;
    };
    if (!autorizado) {
      response = {
        status: false,
        message: "No autorizado",
      };
    }
    response = {
      status: true,
      data: autorizado,
    };

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(JSON.stringify({ error: "No autorizado" })).setMimeType(ContentService.MimeType.JSON);
  }
}
