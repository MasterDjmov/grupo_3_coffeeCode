const express = require('express');
const mainRouter = require('./src/routers/mainRouter');
const userRouter = require('./src/routers/userRouter');
const productRouter = require('./src/routers/productRouter');
const adminRouter = require('./src/routers/adminRouter');
const session = require('express-session');

const app = express();

//Incorporando Sesión en Middleware
app.use(session({secret:"CoffeCode Clave Secreta"}));
app.use(express.static('public'));

//necesario para ejs
app.set('views',__dirname + '/src/views/');
app.set('view engine','ejs');

//activo middleware para recibir post
app.use(express.json());

 //activo middleware para recibir url encoded
app.use(express.urlencoded({extended:true}));

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

//bloqueo 404
app.use((req, res) => {
    res.status(404).render('./errors/404');
});