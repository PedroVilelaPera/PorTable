const express = require('express');
const router = express.Router();
const { createSheetController, getSheetsController } = require('../controllers/sheet_controller');
const { authMiddleware }  = require('../middlewares/auth')

router.use(authMiddleware)

router.post('/sheets', createSheetController);

router.get('/users', getSheetsController);

module.exports = router;