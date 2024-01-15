const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

module.exports = (db, bcrypt) => {
  // Define user routes here
  // Example: router.get('/classes', userController(db, bcrypt).getClasses);
  return router;
};