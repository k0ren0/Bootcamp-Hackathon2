// trainerRoutes.js
const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

module.exports = (db, bcrypt, jwt) => {
  router.get('/dashboard', trainerController(db).dashboard);
  router.get('/registered-users', trainerController(db).getRegisteredUsers);
  router.get('/users/:userId', trainerController(db).getUserById);
  router.get('/users-and-classes', trainerController(db).getUsersAndClasses);

  // Add more routes as needed
  return router;
};
