const express = require('express');
const ProductApiController = require('../../controllers/api/productApiController');
const router = express.Router();


router.get('/', ProductApiController.lista); 

module.exports = router;

