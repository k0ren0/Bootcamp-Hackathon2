const express = require('express');
const router = express.Router();
const registrationsController = require('../controllers/registrationsController')(knex);
const authenticateToken = require('../middleware/authenticateToken');

router.post('/create', authenticateToken, (req, res) => registrationController(req.app.get('db')).createRegistration(req, res));
router.put('/update', authenticateToken, (req, res) => registrationController(req.app.get('db')).updateRegistration(req, res));

router.get('/registrations', authenticateToken, (req, res) => registrationController(req.app.get('db')).getAllRegistrations(req, res));
router.get('/:registrationId', authenticateToken, (req, res) => registrationController(req.app.get('db')).getRegistrationById(req, res));
router.get('/', authenticateToken, (req, res) => {
  console.log('Request to /registrations/');
  registrationController(req.app.get('db')).getAllRegistrations(req, res);
});



module.exports = router;
