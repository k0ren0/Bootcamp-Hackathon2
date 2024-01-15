// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

// Защитите маршруты, требующие аутентификации, с использованием middleware
router.get('/dashboard', authenticateToken, (req, res) => userController(req.app.get('db')).dashboard(req, res));
router.get('/available-classes', authenticateToken, (req, res) => userController(req.app.get('db')).getAvailableClasses(req, res));
router.post('/register-for-class', authenticateToken, (req, res) => userController(req.app.get('db')).registerForClass(req, res));
router.get('/', authenticateToken, (req, res) => {
  console.log('Request to /users received');
  userController(req.app.get('db')).getAllUsers(req, res);
});
router.get('/:userId', authenticateToken, (req, res) => userController(req.app.get('db')).getUserById(req, res));
router.get('/users-and-trainers-and-classes', authenticateToken, (req, res) => userController(req.app.get('db')).getUsersAndTrainersAndClasses(req, res));

module.exports = router;
