const path = require('path');

// capturo las rutas y las separo con switch
exports.ejecutarRutaDeController = (ruta, req, res) => {
    switch (ruta) {
        case '/':
            res.sendFile(path.resolve(__dirname, '../views/index.html'));
            break;
        case '/login':
            res.sendFile(path.resolve(__dirname, '../views/login.html'));
            break;
        case '/register':
            res.sendFile(path.resolve(__dirname, '../views/register.html'));
            break;
        case '/recuperarClave':
            res.sendFile(path.resolve(__dirname, '../views/recuperarClave.html'));
        break;    
        case '/productCart':
            res.sendFile(path.resolve(__dirname, '../views/productCart.html'));
            break;
        case '/productCart_detalle':
            res.sendFile(path.resolve(__dirname, '../views/productCart_detalle.html'));
            break;  
        case '/productCart_facturacion':
            res.sendFile(path.resolve(__dirname, '../views/productCart_facturacion.html'));
            break;              
        case '/productDetail':
            res.sendFile(path.resolve(__dirname, '../views/productDetail.html'));
            break;
        default:
            res.status(404).send('Página no encontrada');
    }
};