const adminController = require('../controllers/adminController');

const express = require('express');
const router = express.Router();

router.get('/edit/:id', adminController.formEditProduct);// recibo los datos para editar
router.post('/edit/:id', adminController.editProduct);
// router.get('/list', adminController.listProduct);
router.get('/register', adminController.formRegisterProduct); //cargo el formulario en blanco
router.post('/register', adminController.registerProduct); // capturo lo que viene del formulario y lo inserto,


module.exports = router;