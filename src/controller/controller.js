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
        case '/productCart':
            res.sendFile(path.resolve(__dirname, '../views/productCart.html'));
            break;
            case '/productDetail':
                res.sendFile(path.resolve(__dirname, '../views/productDetail.html'));
                break;
        default:
            res.status(404).send('Página no encontrada');
    }
};