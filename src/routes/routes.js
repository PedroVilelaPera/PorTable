const express = require('express');
const router = express.Router();
const { createSheetController, getSheetsController } = require('../controllers/sheet_controller');
const { registerUserController } = require('../controllers/user_controller');
const { authMiddleware }  = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/sheets', createSheetController);

router.get('/sheets', getSheetsController);

router.post('/register', registerUserController);

module.exports = router;