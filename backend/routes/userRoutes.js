// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/dashboard', (req, res) => userController(req.app.get('db')).dashboard(req, res));
router.get('/available-classes', (req, res) => userController(req.app.get('db')).getAvailableClasses(req, res));
router.post('/register-for-class', (req, res) => userController(req.app.get('db')).registerForClass(req, res));
router.get('/users', (req, res) => {
  console.log('Request to /users received');
  userController(req.app.get('db')).getAllUsers(req, res);
});
router.get('/users/:userId', (req, res) => userController(req.app.get('db')).getUserById(req, res));
router.get('/users-and-trainers-and-classes', (req, res) => userController(req.app.get('db')).getUsersAndTrainersAndClasses(req, res));

module.exports = router;
