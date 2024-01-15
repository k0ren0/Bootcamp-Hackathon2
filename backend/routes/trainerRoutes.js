// trainerRoutes.js
const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

module.exports = (db, bcrypt, jwt) => {
  router.get('/dashboard', trainerController(db).dashboard);
  router.get('/registered-users', trainerController(db).getRegisteredUsers);
  router.get('/:trainerId', trainerController(db).getUserById);
  router.get('/trainers-and-classes', trainerController(db).getUsersAndClasses);
  router.get('/users-and-trainers-and-classes', (req, res) => userController(req.app.get('db')).getUsersAndTrainersAndClasses(req, res));
  router.get('/', (req, res) => {
    console.log('Request to /trainers received');
    userController(req.app.get('db')).getAllUsers(req, res);
  });
  // Add more routes as needed
  return router;
};

