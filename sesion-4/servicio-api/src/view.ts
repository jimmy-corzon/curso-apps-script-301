function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // Nuevo item del menu
  ui.createMenu("💻 Gestión de usuarios").addItem("Crear usuario", "showSidebar").addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile("create_users").setTitle("Crear usuario");
  //   SpreadsheetApp.getUi().showSidebar(html);
  SpreadsheetApp.getUi().showModalDialog(html, "Crear usuario");
}
