/**Este archivo servirá para usarlo como middleware de subida de archivos, desde los formularios */
const multer = require('multer');
const path = require('node:path');

/**multer */
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.resolve(__dirname,'../../public/img/perfil'));
    },
    filename: function(req, file,cb){
        cb(null,file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileUpload = multer({storage});

module.exports = fileUpload;



