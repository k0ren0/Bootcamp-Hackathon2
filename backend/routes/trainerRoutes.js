const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

module.exports = (db, bcrypt) => {
  // Define trainer routes here
  // Example: router.get('/trainers', trainerController(db, bcrypt).getTrainers);
  return router;
};
