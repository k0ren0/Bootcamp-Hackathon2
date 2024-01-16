const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

module.exports = (db, bcrypt, jwt) => {
  router.get('/dashboard', (req, res) => {
    adminController(db, bcrypt, jwt).dashboard(req, res);

  });

  return router;
};
