const express = require('express');
const router = express.Router();
const { createSheetController } = require('../controllers/sheet_controller.js');

router.post('/sheets', createSheetController);