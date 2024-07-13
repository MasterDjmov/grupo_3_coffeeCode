const express = require('express');
const mainRouter = require('./src/routers/mainRouter');
const userRouter = require('./src/routers/userRouter');
const productRouter = require('./src/routers/productRouter');
const adminRouter = require('./src/routers/adminRouter');

const app = express();

app.use(express.static('public'));

//necesario para ejs
app.set('views',__dirname + '/src/views/');
app.set('view engine','ejs');


const puerto = 3000;
app.listen(puerto,(error)=>{
    if(error){
        console.log("error:"+error);
    }else{
        console.log("Server iniciado en: "+puerto);
    }
})

//cargo los manejadores de rutas

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);
