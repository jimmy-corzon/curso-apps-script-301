function crearEvento({
  evento,
  email,
  asunto,
  fecha_inicio,
  fecha_fin,
  invitados,
}: {
  evento: string;
  email: string;
  asunto: string;
  fecha_inicio: string;
  fecha_fin: string;
  invitados: string[];
}) {
  Logger.log("Datos recibidos en el metodo POST:");
  Logger.log(`Nombre: ${evento}`);
  Logger.log(`Email: ${email}`);
  Logger.log(`Asunto: ${asunto}`);
  Logger.log(`Fecha: ${fecha_inicio}`);
  Logger.log(`Hora: ${fecha_fin}`);
  Logger.log(`Invitados: ${invitados}`);

  // Enviar correo
  const enviar_a = [email, ...invitados];

  CalendarApp.createEvent(evento, new Date(fecha_inicio), new Date(fecha_fin));

  MailApp.sendEmail(enviar_a.join(","), asunto, "Invitation", {
    htmlBody: `<p>Invitacion al evento: <strong>${evento}</strong></p><p>Fecha y hora: ${fecha_inicio} - ${fecha_fin}</p>`,
  });
}
