const adminController = require('../controllers/adminController');

const express = require('express');
const router = express.Router();

router.get('/edit', adminController.editProduct);
router.get('/list', adminController.listProduct);
router.get('/register', adminController.registerProduct);


module.exports = router;