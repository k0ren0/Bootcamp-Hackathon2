const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

module.exports = (db, bcrypt) => {
  router.get('/statistics', adminController(db, bcrypt).getStatistics);
  return router;
};