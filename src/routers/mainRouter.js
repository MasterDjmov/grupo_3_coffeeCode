const mainController = require('../controllers/mainController');

const express = require('express');
const router = express.Router();

router.get('/', mainController.index);
router.get('/about', mainController.about);
router.get('/info', mainController.info);

module.exports = router;