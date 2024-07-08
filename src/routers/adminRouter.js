const adminController = require('../controllers/adminController');

const express = require('express');
const router = express.Router();

router.get('/editProduct', adminController.editProduct);
router.get('/listProduct', adminController.listProduct);
router.get('/registerProduct', adminController.registerProduct);


module.exports = router;