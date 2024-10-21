const { body, validationResult } = require("express-validator")
const db = require("../database/models");
const { register } = require("../controllers/userController");


const registerValidator = [
    body('nombre')
    .notEmpty().withMessage("El Nombre es Obligatorio.").bail()
    .isLength({min: 2}).withMessage("El Nombre debe tener al Menos 2 caracteres."),

    body('apellido')
    .notEmpty().withMessage("El Apellido es Obligatorio.").bail()
    .isLength({min: 2}).withMessage("El Apellido debe tener al Menos 2 caracteres."),

    body('email')
        .notEmpty().withMessage('El E-mail es Obligatorio.').bail()
        .isEmail().withMessage('Debe proporcionar un Email Válido.')
        .custom(async (value) => {
            const user = await db.Usuarios.findOne({ where: { email: value } });
            if (user) {
                throw new Error('El Email ya está registrado');
            }
            return true;
        }),

    body('clave')
        .notEmpty().withMessage('La contraseña es obligatoria.').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()+\-_.:])[A-Za-z\d@$!%*?&#^()+\-_.:]{8,}$/)
        .withMessage('La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial.'),

    body('clave2')
        .notEmpty().withMessage('Debe confirmar su contraseña.')
        .custom((value, { req }) => {
            if (value !== req.body.clave) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        }),
];

module.exports = registerValidator;