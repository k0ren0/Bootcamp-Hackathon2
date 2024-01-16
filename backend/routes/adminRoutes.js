const express = require('express');
const router = express.Router();
const admionController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/create', (req, res) => adminController(req.app.get('db')).createAdmin(req, res));
router.put('/update-password', authenticateToken, (req, res) => adminController(req.app.get('db')).updateTrainerPassword(req, res));

router.get('/dashboard', authenticateToken, (req, res) => adminController(req.app.get('db')).dashboard(req, res));
router.get('/classes', authenticateToken, (req, res) => adminController(req.app.get('db')).getAdminClasses(req, res));
router.get('/:adminId', authenticateToken, (req, res) => adminController(req.app.get('db')).getAdminById(req, res));
router.get('/', authenticateToken, (req, res) => {
  console.log('Request to /admins/');
  adminController(req.app.get('db')).getAllAdminss(req, res);
});


module.exports = router;
