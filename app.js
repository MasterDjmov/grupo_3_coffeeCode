const express = require('express');
const cors = require('cors');
const mainRouter = require('./src/routers/mainRouter');
const userRouter = require('./src/routers/userRouter');
const productRouter = require('./src/routers/productRouter');
const adminRouter = require('./src/routers/adminRouter');
const apiUserRouter = require('./src/routers/api/users.js')
const apiProductsRouter = require('./src/routers/api/products.js')
const apiTipoProductsRouter = require('./src/routers/api/tiposProduct.js')

const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

//Incorporando Sesión en Middleware
app.use(session({
    secret:"CoffeCode Clave Secreta",
    resave:false,
    saveUninitialized: true,
}));

app.use(express.static('public'));

//necesario para ejs
app.set('views',__dirname + '/src/views/');
app.set('view engine','ejs');

//activo el metodo de sobreescritura para usar PUT y DELETE
app.use(methodOverride('_method'));

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

// Habilitar CORS para todas las rutas
app.use(cors());

// O permitir solo ciertos orígenes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));

//cargo los manejadores de rutas

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);
app.use('/api/users', apiUserRouter)
app.use('/api/products', apiProductsRouter)
app.use('/api/tipoProducts', apiTipoProductsRouter)
app.use('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Error al cerrar la sesión');
        }
        res.redirect('/'); // Redirige a la página de inicio o donde prefieras
    });
});

//bloqueo 404
app.use((req, res) => {
    res.status(404).render('./errors/404');
});