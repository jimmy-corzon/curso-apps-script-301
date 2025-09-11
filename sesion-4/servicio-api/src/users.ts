function verificarUsuario(email: string) {
  // Obtener la hoja de cálculo y la pestaña donde estastán los correos permitidos

  const ss = SpreadsheetApp.openById("13NCD1Ei9JUme3HIm-dAIEuyyrJlXJ0jtPOP48gkQP9A");

  const sheet = ss.getSheetByName("users");

  // Buscar en la hoja de calculo si el correo existe
  const data = sheet?.getDataRange().getValues() || [];

  let dataUser = null;
  let exists = false;
  for (let i = 0; i < data.length; i++) {
    // Validar si existe
    if (data[i][2] === email) {
      exists = true;
      dataUser = data[i];
      break;
    }
  }

  // Retornar true o false
  return { exists, dataUser };
}

function server_createUser({ name, email }: { name: string; email: string }) {
  const ss = SpreadsheetApp.openById("13NCD1Ei9JUme3HIm-dAIEuyyrJlXJ0jtPOP48gkQP9A");

  const sheet = ss.getSheetByName("users");

  const idUser = Utilities.getUuid();

  // Agregar el usuario a la hoja de cálculo
  sheet?.appendRow([idUser, name, email]);

  return { id: idUser, name, email };
}
