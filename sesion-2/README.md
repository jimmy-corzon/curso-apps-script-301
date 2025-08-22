# Sesión 2: Generación de Documentos y Comunicaciones Automatizadas

En esta sesión, construimos una solución completa de Apps Script que implementa el patrón de diseño "Generador de Documentos". Este proyecto toma datos de un Google Sheet, los fusiona con una plantilla de Google Doc para generar reportes en PDF y los distribuye automáticamente por correo electrónico.

## Requisitos de la Aplicación

La aplicación cumple con los siguientes requisitos:

- **Lee datos** de clientes y proyectos desde dos pestañas diferentes en un Google Sheet.
- **Combina los datos** para crear un objeto de proyecto unificado.
- **Utiliza una plantilla** de Google Docs para generar un reporte profesional.
- **Reemplaza dinámicamente** los placeholders en la plantilla con los datos del proyecto.
- **Exporta el documento** final a formato PDF.
- **Envía el PDF** como adjunto en un correo electrónico personalizado usando una plantilla HTML.
- **Actualiza el estado** del proyecto en el Google Sheet a "ENVIADO" después de un procesamiento exitoso.

## Estructura del Proyecto

El código está organizado en el directorio `appsscript/` siguiendo el principio de responsabilidad única para facilitar su mantenimiento y escalabilidad.

- `generador-de-documentos/config.js`: Centraliza todas las variables de configuración (IDs de archivos, nombres de hojas, etc.).
- `generador-de-documentos/main.js`: Contiene la función principal `processPendingReports()` que orquesta todo el flujo de trabajo.
- `generador-de-documentos/sheet-service.js`: Maneja toda la lógica de lectura, procesamiento y actualización de datos en Google Sheets.
- `generador-de-documentos/document-service.js`: Se encarga de la creación de documentos a partir de la plantilla y su exportación a PDF.
- `generador-de-documentos/email-service.js`: Gestiona la construcción y el envío de correos electrónicos.
- `generador-de-documentos/email-template.html`: Plantilla HTML para el cuerpo de los correos electrónicos.

---

## 🚀 Guía de Configuración Rápida (Paso a Paso)

Sigue estas instrucciones detalladas para configurar tu propio entorno y ejecutar el proyecto.

### Paso 1: Configurar los Activos en Google Drive

Necesitamos tres "activos" en tu Google Drive antes de poder ejecutar el script.

#### A. Crear la Hoja de Cálculo de Google (Nuestra Base de Datos)

1.  Ve a tu Google Drive y crea una nueva **Carpeta**. Dale un nombre descriptivo, como "Datos - Proyectos".
2.  Ingresa a la carpeta y crea una nueva **Hoja de Cálculo de Google**. Dale un nombre descriptivo, como "Datos de Proyectos".
3.  **Crea dos pestañas** en la parte inferior. Renómbralas exactamente como `proyectos` y `clientes`.
4.  **Pestaña `proyectos`:**

    - En la primera fila, copia y pega estos encabezados:
      `Fecha_Proyecto`, `Numero_Proyecto`, `ID_Cliente`, `Proyecto`, `Monto`, `Estado`
    - Para poblarla con datos de ejemplo, crea un archivo de texto llamado `proyectos.csv` en tu computadora, pega el siguiente contenido y luego impórtalo en esta pestaña (`Archivo > Importar > Subir`).

      - [Archivo de ejemplo de proyectos](data/proyectos.csv)

5.  **Pestaña `clientes`:**

    - En la primera fila, copia y pega estos encabezados:
      `ID_Cliente`, `Nombre_Cliente`, `Direccion_Cliente`, `Ciudad`, `Email_Cliente`
    - Crea un archivo `clientes.csv` con el siguiente contenido e impórtalo en esta pestaña. **¡Importante!** Reemplaza los correos de ejemplo con tu propio correo electrónico para poder recibir los resultados de las pruebas.

      - [Archivo de ejemplo de clientes](data/clientes.csv)

_En la URL de la hoja de cálculo, copia el ID que aparece entre `/d/` y `/edit`. Este es el `GOOGLE_SHEET_ID` que necesitas para el archivo `config.js`._

#### B. Crear la Plantilla de Google Docs

1.  En Google Drive, crea un nuevo **Documento de Google**. Nómbralo "Plantilla - Reportes de proyectos".
2.  Copia y pega el siguiente contenido dentro del documento. Siéntete libre de añadir tu logo, cambiar fuentes y colores. Lo importante es mantener los **placeholders con doble llave `{{...}}`** intactos, ya que el script los buscará para reemplazarlos.

    - [Plantilla de Reporte](data/plantilla-docs.md)

_En la URL del documento, copia el ID que aparece entre `/d/` y `/edit`. Este es el `TEMPLATE_DOC_ID` que necesitas para el archivo `config.js`._

#### C. Crear la Carpeta de Destino

1.  Finalmente, crea una **Carpeta** nueva en Google Drive. Nómbrala "Reportes Generados". Aquí es donde el script guardará todos los PDFs finales y documentos temporales.
2.  Crea dos carpetas dentro de "Reportes Generados": "PDFs" y "Temporales".

_En la URL de la carpeta (Temporales), copia el ID que aparece despues de `/folders/`. Este es el `DESTINATION_FOLDER_TEMP_ID` que necesitas para el archivo `config.js`._

_En la URL de la carpeta (PDFs), copia el ID que aparece despues de `/folders/`. Este es el `DESTINATION_FOLDER_PDF_ID` que necesitas para el archivo `config.js`._

### Paso 2: Crear y Configurar el Proyecto de Apps Script

1.  **Crear un Proyecto Standalone:** En Drive en la carpeta del proyecto, crea un nuevo proyecto de Apps script. Dale un nombre como "Proyecto - Generador de Reportes".
2.  **Copiar el Código:**

    - Renombra el archivo `Código.gs` por `main.gs`.
    - Crea 4 nuevos archivos de script (`Archivo > Nuevo > Archivo de script`) y nómbralos: `config.gs`, `sheet-service.gs`, `document-service.gs`, `email-service.gs`.
    - Crea 1 archivo HTML (`Archivo > Nuevo > Archivo HTML`) y nómbralo `email-template.html`.
    - Copia el contenido de cada archivo de este repositorio y pégalo en el archivo correspondiente de tu proyecto de Apps Script.

      - [contenido de config](code/config.js)
      - [contenido de document-service](code/document-service.js)
      - [contenido de email-service](code/email-service.js)
      - [contenido de email-template](code/email-template.html)
      - [contenido de main](code/main.js)
      - [contenido de sheet-service](code/sheet-service.js)

3.  **Actualizar `config.gs`:**
    - Abre el archivo `config.gs`. Ahora necesitas los IDs de los activos que creaste en el Paso 1.
    - Pega cada ID en la constante correspondiente: `GOOGLE_SHEET_ID`, `TEMPLATE_DOC_ID`, `DESTINATION_FOLDER_TEMP_ID`,`DESTINATION_FOLDER_PDF_ID`.

### Paso 3: Ejecutar el Script y Otorgar Permisos

Esta es la parte más importante la primera vez que ejecutas un script.

1.  **Selecciona la Función Principal:** En la barra superior del editor de Apps Script, asegúrate de que la función seleccionada para ejecutar sea `processPendingReports`.
2.  **Ejecuta el Script:** Haz clic en el botón **Ejecutar**.
3.  **Panel de Autorización (¡No te asustes!):**
    - Aparecerá una ventana emergente que dice **"Se requiere autorización"**. Esto es normal y es el sistema de seguridad de Google en acción. Haz clic en **"Revisar permisos"**.
    - Se abrirá una nueva ventana para que elijas tu cuenta de Google. Selecciónala.
    - Verás una pantalla de advertencia que dice **"Google no verificó esta app"**. Esto es porque el script lo has creado tú y no está publicado en el Marketplace. Es seguro continuar. Haz clic en **"Configuración avanzada"** (puede estar en letra pequeña) y luego en **"Ir a [Nombre de tu proyecto] (no seguro)"**.
    - Finalmente, Google te mostrará una lista de todos los permisos que tu script necesita (ver y administrar Hojas de Cálculo, Documentos, Drive, y enviar correos como tú). Revisa la lista y haz clic en **"Permitir"**.
4.  **Verifica la Ejecución:**
    - La ventana de autorización se cerrará. Vuelve al editor de Apps Script.
    - Abre los registros de ejecución (`Ver > Registros` o `Ctrl+Enter`). Deberías ver los logs del proceso, indicando cuántos proyectos se encontraron y procesaron.
    - Revisa tu carpeta "Reportes Generados" en Drive, tu bandeja de correo electrónico y la hoja de `PROYECTOS` para ver la columna `Estado` actualizada a "ENVIADO".

¡Felicidades! Has configurado y ejecutado con éxito una solución de automatización completa.

---

## Puntos Clave Aprendidos

- **Modularización de código** para proyectos mantenibles.
- **Uso de un archivo de configuración** para evitar "hardcodear" valores.
- **Procesamiento de datos por lotes** y combinación de múltiples fuentes de datos.
- **Manejo de estados** (actualización de la hoja de cálculo) para evitar procesar dos veces el mismo registro.
- **Uso de `HtmlService`** para enviar correos electrónicos profesionales y dinámicos.
- **Flujo de Autorización de OAuth2** en Apps Script.
