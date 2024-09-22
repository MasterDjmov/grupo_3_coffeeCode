const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'imagen_principal') {
            cb(null, path.resolve(__dirname, '../../public/img/products')); 
        } else if (file.fieldname === 'imagen_secundaria') {
            cb(null, path.resolve(__dirname, '../../public/img/imgsecundaria')); 
        } else {
            cb(new Error('Tipo de archivo no soportado')); 
        }
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
        req.originalFileName = fileName;
    }
});


const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|gif/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, gif)'));
};


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});


const uploadImages = upload.fields([
    { name: 'imagen_principal', maxCount: 1 },
    { name: 'imagen_secundaria', maxCount: 1 }
]);

module.exports = uploadImages;
