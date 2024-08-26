const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();

router.get('/login', userController.formLogin);
router.post('/login', userController.login);
router.get('/register', userController.register);
router.get('/clave', userController.recuperarClave);
router.get('/profile', userController.editProfile)
module.exports = router;