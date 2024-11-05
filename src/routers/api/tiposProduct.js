const express = require('express');
const tiposProductApiController = require('../../controllers/api/tiposProductApiController');
const router = express.Router();


router.get('/', tiposProductApiController.lista); 

module.exports = router;