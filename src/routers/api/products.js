const express = require('express');
const ProductApiController = require('../../controllers/api/productApiController');
const router = express.Router();


router.get('/', ProductApiController.lista);
router.delete('/:id', ProductApiController.delete);

module.exports = router;

