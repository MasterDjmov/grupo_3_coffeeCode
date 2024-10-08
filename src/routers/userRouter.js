const userController = require('../controllers/userController');
const fileProfile = require('../middleware/fileUploadProfile');
const express = require('express');
const router = express.Router();
const loginValidator = require('../middleware/loginValidator');
const registerValidator = require('../middleware/registerValidator');

router.get('/login', userController.formLogin);
router.post('/login',loginValidator, userController.login);

router.get('/register', userController.register);
router.post('/register',registerValidator ,userController.create);

router.get('/clave', userController.recuperarClave);

router.get('/profile', userController.formProfile);
router.post('/profile', fileProfile.single('imagefile'), userController.updateProfile);

//funcion para controlar si existe el email de un usuario
router.get('/control_email', userController.controlEmail);

module.exports = router;