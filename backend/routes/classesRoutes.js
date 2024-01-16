const express = require('express');
const router = express.Router();
const classController = require('../controllers/classesController');

module.exports = (db) => {
  router.get('/', classController(db).getAllClasses);
  router.get('/:classId', classController(db).getClassDetails);

  return router;
}

