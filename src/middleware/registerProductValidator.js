const {body} = require('express-validator')

const registeProductValidator = [

    body('nombre_producto')
    .notEmpty().withMessage("El Nombre debe ser Obligatorio").bail()
    .isLength({min: 5}).withMessage("El Nombre debe tener al Menos 5 caracteres"),

    body('descripcion_corta')
    .notEmpty().withMessage('El Origen es Obligatorio').bail()
    .isLength({max: 100}).withMessage("El Origen debe no ser Más de 100 caracteres"),

    body('descripcion_larga')
    .notEmpty().withMessage('La Descripción debe ser Obligatoria').bail()
    .isLength({min: 20}).withMessage("La Descripción debe tener al Menos 500 caracteres"),

    body('precio')
    .notEmpty().withMessage("El Precio debe ser Obligatorio").bail()
    .isFloat({min: 0}).withMessage("El Precio debe ser un Número positivo"),

    body('cantidad')
    .notEmpty().withMessage("La Cantidad es Obligatoria").bail()
    .isInt({min: 0}).withMessage("La Cantidad debe ser un Número no negativo"),

    body('idunidad_medida')
    .notEmpty().withMessage("La Unidad debe ser Obligatoria"),

    body('id_pais')
    .notEmpty().withMessage("El País debe ser Obligatorio"),

    body('idproductor')
    .notEmpty().withMessage("El Productor debe ser Obligatorio"),

    body('region')
        .optional().isLength({ max: 50 }).withMessage('La región no debe superar los 50 caracteres'),

    body('altitud')
        .optional().isLength({ max: 50 }).withMessage('La altitud no debe superar los 50 caracteres'),

    body('procesamiento_natural')
        .optional().isLength({ max: 50 }).withMessage('El procesamiento natural no debe superar los 50 caracteres'),

    body('procesamiento_lavado')
        .optional().isLength({ max: 50 }).withMessage('El procesamiento lavado no debe superar los 50 caracteres')
];


module.exports = registeProductValidator;