const express = require('express');
const indexRouter = require('./src/routers/indexRouter');
const app = express();

app.use(express.static('public'));

const puerto = 3000;
app.listen(puerto,(error)=>{
    if(error){
        console.log("error:"+error);
    }else{
        console.log("Server iniciado en: "+puerto);
    }
})

//cargo los manejadores de rutas
app.use('/', indexRouter);
