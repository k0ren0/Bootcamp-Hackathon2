const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/create', (req, res) => classController(req.app.get('db')).createClass(req, res));
router.put('/update', authenticateToken, (req, res) => classController(req.app.get('db')).updateClass(req, res));

router.get('/classes', authenticateToken, (req, res) => classController(req.app.get('db')).getAllClasses(req, res));
router.get('/:classId', authenticateToken, (req, res) => classController(req.app.get('db')).getClassById(req, res));
router.get('/', authenticateToken, (req, res) => {
  console.log('Request to /classes/');
  classController(req.app.get('db')).getAllClasses(req, res);
});

// Добавьте ваши текущие маршруты

module.exports = router;
