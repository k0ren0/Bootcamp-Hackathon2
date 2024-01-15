module.exports = (db) => {
    const classModel = require('../models/classModel')(db);
    const bcrypt = require('bcrypt');
  return {
    createTrainer: async (username, password) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await db('trainers').insert({ username, password: hashedPassword });
      } catch (error) {
        throw error;
      }
    },
    
    getAllTrainers: async (req, res) => {
        try {
          const trainers = await db('trainers').select('*');
          res.json({ trainers });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
  
      getTrainerById: async (req, res) => {
        const trainerId = req.params.trainerId;
  
        try {
          const trainer = await db('trainers').where({ id: trainerId }).first();
          if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
          }
  
          res.json({ trainer });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    };
  };