const express = require('express');
const productApiController = require('../../controllers/api/productApiController');
const router = express.Router();


router.get('/', productApiController.lista); //El endpoint seria ej: localhost:3000/api/users
//router.get('/:id', productApiController.detalle) //El endpoint seria ej: localhost:3000/api/users/1 
//router.get('/page/:page?', productApiController.paginado); //El endPoint seria ej: localhost:3000/api/users/page/1

module.exports = router;

