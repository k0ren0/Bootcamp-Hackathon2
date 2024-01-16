const bcrypt = require('bcrypt');

module.exports = (knex) => {
  const trainerModel = require('../models/trainerModel')(knex);

  return {
    createTrainer: async (req, res) => {
      const { username, password } = req.body;

      try {
        await trainerModel.createTrainer(username, password);
        res.json({ message: 'Trainer created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    updateTrainerPassword: async (req, res) => {
      const { newPassword } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await trainerModel.updateTrainerPassword(req.user.id, hashedPassword);
        res.json({ message: 'Password updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    dashboard: (req, res) => {
      res.json({ message: 'Trainer Dashboard' });
    },

    getTrainerClasses: async (req, res) => {
      try {
        const trainerClasses = await knex('classes').where({ trainer_id: req.user.id }).select('*');
        res.json({ trainerClasses });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getTrainerById: async (req, res) => {
      const trainerId = req.params.trainerId;

      try {
        const trainer = await knex('trainers').where({ id: trainerId }).first();
        if (!trainer) {
          return res.status(404).json({ error: 'Trainer not found' });
        }

        res.json({ trainer });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getAllTrainers: async (req, res) => {
      console.log('Request to getAllTrainers received');
      try {
        const trainers = await knex('trainers').select('*');
        res.json({ trainers });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  };
};
