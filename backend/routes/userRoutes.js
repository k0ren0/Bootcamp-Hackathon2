const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/create', (req, res) => userController(req.app.get('db')).createUser(req, res));
router.put('/update-password', authenticateToken, (req, res) => userController(req.app.get('db')).updateUserPassword(req, res));

router.get('/dashboard', authenticateToken, (req, res) => userController(req.app.get('db')).dashboard(req, res));
router.get('/available-classes', authenticateToken, (req, res) => userController(req.app.get('db')).getAvailableClasses(req, res));
router.post('/register-for-class', authenticateToken, (req, res) => userController(req.app.get('db')).registerForClass(req, res));
router.get('/users-and-trainers-and-classes', authenticateToken, (req, res) => userController(req.app.get('db')).getUsersAndTrainersAndClasses(req, res));
router.get('/:userId', authenticateToken, (req, res) => userController(req.app.get('db')).getUserById(req, res));
router.get('/', authenticateToken, (req, res) => {
  console.log('Request to /users/');
  userController(req.app.get('db')).getAllUsers(req, res);
router.get('/registrations/user', authenticateToken, (req, res) => registrationsController(knex).getRegistrationsByUser(req, res));
router.get('/registrations/trainer', authenticateToken, (req, res) => registrationsController(knex).getRegistrationsByTrainer(req, res));

});


module.exports = router;
