const productController = require('../controllers/productController');

const express = require('express');
const router = express.Router();

router.get('/productCart', productController.productCart);
router.get('/productCartDetail', productController.productCartDetail);
router.get('/productCart_detalle', productController.productCart_detalle);
router.get('/productCart_facturacion', productController.productCart_facturacion);

module.exports = router;