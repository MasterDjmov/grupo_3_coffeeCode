const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();

router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/recuperarClave', userController.recuperarClave);
module.exports = router;