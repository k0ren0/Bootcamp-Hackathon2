const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

module.exports = (db, bcrypt, jwt) => {
  router.get('/dashboard', (req, res) => {
    adminController(db, bcrypt, jwt).dashboard(req, res);
    // Ваш код обработки запроса для страницы 'dashboard'
  });

  // Добавьте другие роуты по необходимости

  return router;
};
