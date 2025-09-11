function doGet(e: GoogleAppsScript.Events.DoGet) {
  const usuarioActivo = Session.getActiveUser();

  // Verificar si el usuario está en la lista
  const autorizado = verificarUsuario(usuarioActivo.getEmail());

  if (!autorizado) {
    return HtmlService.createHtmlOutput("<h1>Acceso denegado</h1><p>No tienes permiso para acceder a este formulario.</p>");
  }

  return HtmlService.createTemplateFromFile("formulario").evaluate();
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const asunto = e.parameter.asunto;
  const email = e.parameter.email;
  const evento = e.parameter.evento;
  const fecha_inicio = e.parameter.fecha_inicio;
  const fecha_fin = e.parameter.fecha_fin;
  const invitados = e.parameter.invitados ? (e.parameter.invitados as string).split(",").map((inv) => inv.trim()) : [];

  crearEvento({
    asunto,
    email,
    evento,
    fecha_inicio,
    fecha_fin,
    invitados,
  });

  return HtmlService.createHtmlOutput(`
    <h1>Se ha enviado las invitaciones</h1>
    <a href="/">Regresar</a>
  `);
}

function verificarUsuario(email: string) {
  const options: any = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    payload: JSON.stringify({
      email: email,
    }),
    redirect: "follow",
  };

  const response = UrlFetchApp.fetch(
    "https://script.google.com/macros/s/AKfycbwHiMfLvOAJeHss-JeHQFejpFG2DLAhZgSfe2pdTxzIfBO1UxHxley4QdX5-_kLRTCbyw/exec",
    options
  );
  Logger.log(response.getResponseCode());

  Logger.log(response.getContentText());

  if (response.getResponseCode() !== 200) {
    return false;
  }

  const data: {
    status: boolean;
    data: {
      exists: boolean;
      dataUser: [number, string, string];
    };
  } = JSON.parse(response.getContentText());
  Logger.log(data);

  return data.status && data.data.exists;
}
