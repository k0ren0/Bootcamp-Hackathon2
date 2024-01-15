
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define admin routes here
router.get('/statistics', adminController.getStatistics);

module.exports = router;
