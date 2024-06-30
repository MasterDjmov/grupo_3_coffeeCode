const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'));

// Importar el controlador de rutas
const { ejecutarRutaDeController } = require('./src/controller/controller');

const puerto = 3000;
app.listen(puerto,(error)=>{
    if(error){
        console.log("error:"+error);
    }else{
        console.log("Server iniciado en: "+puerto);
    }
})
/*
app.get('/',(req,res)=>{
    res.sendFile(path.resolve("./src/views/index.html"));
})*/



// Manejar todas las rutas, * es cualquier ruta ej /login
app.get('*', (req, res) => {
    const ruta = req.path; //    /login
    ejecutarRutaDeController(ruta, req, res); // paso la ruta que llego a la función que se encuentra en controller.js
});

