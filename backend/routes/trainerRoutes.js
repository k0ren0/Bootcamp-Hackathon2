const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/create', (req, res) => trainerController(req.app.get('db')).createTrainer(req, res));
router.put('/update-password', authenticateToken, (req, res) => trainerController(req.app.get('db')).updateTrainerPassword(req, res));

router.get('/dashboard', authenticateToken, (req, res) => trainerController(req.app.get('db')).dashboard(req, res));
router.get('/classes', authenticateToken, (req, res) => trainerController(req.app.get('db')).getTrainerClasses(req, res));
router.get('/:trainerId', authenticateToken, (req, res) => trainerController(req.app.get('db')).getTrainerById(req, res));
router.get('/', authenticateToken, (req, res) => {
  console.log('Request to /trainers/');
  trainerController(req.app.get('db')).getAllTrainers(req, res);
});

module.exports = router;
