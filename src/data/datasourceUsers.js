const { error } = require('node:console');
const fs = require('node:fs/promises');
const path = require('node:path');

const datasource = {
    filePath: path.resolve(__dirname, "users.json"),

  async load() {
    return fs.readFile(this.filePath,"utf-8")
    .then(function(datos){
      const conjuntoDatosParseado = JSON.parse(datos);
      return conjuntoDatosParseado;
    })
    .catch(function(error){
      console.log("Error de acceso al archivo");
      return null;
    })
  },
  async save(data) {
    const jsonData = JSON.stringify(data, null, 2);
    try {
      await fs.writeFile(this.filePath, jsonData, "utf-8");
      console.log("Archivo guardado correctamente");
    } catch (error) {
      console.error("Error al escribir el archivo:", error);
     
    }
  }
}

module.exports = datasource;