const express = require('express');
const router = express.Router();
const registrationsController = require('../controllers/registrationsController');

module.exports = (db) => {
  router.get('/', registrationsController(db).getAllRegistrations);
  router.post('/register-for-class', registrationsController(db).registerForClass);
  // Add more routes as needed
  return router;
};
