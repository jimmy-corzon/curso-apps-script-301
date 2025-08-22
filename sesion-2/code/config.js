/**
 * @fileoverview Centraliza toda la configuración del proyecto para facilitar
 * el mantenimiento. Contiene IDs de archivos, nombres de hojas y columnas.
 */

// IDs de los recursos de Google Workspace
const GOOGLE_SHEET_ID = "14k_7WsOmX_vPWdmDggpLU_ZUycmTEkjMe5WIwmPn20I";
const TEMPLATE_DOC_ID = "1GFb6XUn4-MT9lURD51fFvTyh0fcD7URHbSpM32cBfWw";

const DESTINATION_FOLDER_TEMP_ID = "1x3gIPQHT4P9V_X1FFMk6BgzqwPg9pEy6";
const DESTINATION_FOLDER_PDF_ID = "1tHOw33p2T0HlRrHxbwMUAbGKmeVPDYTn";

// Nombres de las hojas de cálculo
const PROJECTS_SHEET_NAME = "proyectos";
const CLIENTS_SHEET_NAME = "clientes";

// Nombre de la plantilla de correo electrónico
const EMAIL_TEMPLATE_NAME = "email-template";

// Mapeo de columnas para la hoja de PROYECTOS (los índices inician en 0)
const PROJECTS_COLUMNS = {
  DATE: 0,
  ID: 1,
  CLIENT_ID: 2,
  NAME: 3,
  AMOUNT: 4,
  STATUS: 5,
};

// Mapeo de columnas para la hoja de CLIENTES (los índices inician en 0)
const CLIENTS_COLUMNS = {
  ID: 0,
  NAME: 1,
  ADDRESS: 2,
  CITY: 3, // Asumiendo que la columna 4 es Ciudad
  EMAIL: 4, // Corregido para que coincida con tus datos de ejemplo
};

// Constantes para el estado del reporte
const STATUS_PENDING = false;
const STATUS_COMPLETED = "ENVIADO";
