const userController = require('../controllers/userController');
const fileProfile = require('../middleware/fileUploadProfile');
const express = require('express');
const router = express.Router();

router.get('/login', userController.formLogin);
router.post('/login', userController.login);
router.get('/register', userController.register);
router.post('/register', userController.create);
router.get('/clave', userController.recuperarClave);
router.get('/profile', userController.formProfile);
router.post('/profile', fileProfile.single('imagefile'), userController.updateProfile);
module.exports = router;