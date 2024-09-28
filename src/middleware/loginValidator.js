const { check } = require('express-validator');
const db = require('../database/models/index.js'); 

const loginValidator = [
    check('email')
        .isEmail()
        .withMessage('Debe ingresar un email válido')
        .bail() 
        .custom(async (value) => {
            const user = await db.Usuarios.findOne({ where: { email: value } });
            if (!user) {
                throw new Error('El email no está registrado');
            }
            return true;
        }),

    check('clave')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')

];

module.exports = loginValidator;
