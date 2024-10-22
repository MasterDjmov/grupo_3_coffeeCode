const express = require('express');
const usersAPIController = require('../../controllers/api/usersApiController');
const router = express.Router();


router.get('/', usersAPIController.lista); //El endpoint seria ej: localhost:3000/api/users
router.get('/:id', usersAPIController.detalle) //El endpoint seria ej: localhost:3000/api/users/1 
router.get('/page/:page?', usersAPIController.paginado); //El endPoint seria ej: localhost:3000/api/users/page/1

module.exports = router;

