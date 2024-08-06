const adminController = require('../controllers/adminController');

const express = require('express');
const router = express.Router();

router.get('/edit/:id', adminController.formEditProduct);// recibo los datos para editar
router.get('/delete1/:id', adminController.deleteProduct1);
router.delete('/delete2/:id', adminController.deleteProduct2);

router.get('/create', adminController.formRegisterProduct); //cargo el formulario en blanco
router.post('/create', adminController.registerProduct); // capturo lo que viene del formulario y lo inserto,
router.put('/edit/:id', adminController.editProduct);

module.exports = router;