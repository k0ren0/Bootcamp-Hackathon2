const bcrypt = require('bcrypt');

module.exports = (knex) => {
  const userModel = require('../models/userModel')(knex);

  return {
    createUser: async (req, res) => {
      const { username, password } = req.body;

      try {
        await userModel.createUser(username, password);
        res.json({ message: 'User created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    updateUserPassword: async (req, res) => {
      const { newPassword } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userModel.updateUserPassword(req.user.id, hashedPassword);
        res.json({ message: 'Password updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    dashboard: (req, res) => {
      res.json({ message: 'User Dashboard' });
    },

    getAvailableClasses: async (req, res) => {
      try {
        const availableClasses = await knex('classes').where({ status: 'available' }).select('*');
        res.json({ availableClasses });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    registerForClass: async (req, res) => {
      const { classId } = req.body;

      try {
        const userClass = await knex('user_classes').where({ user_id: req.user.id, class_id: classId }).first();

        if (userClass) {
          return res.status(400).json({ error: 'Already registered for this class' });
        }

        await knex('user_classes').insert({ user_id: req.user.id, class_id: classId });
        res.json({ message: 'Successfully registered for the class' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getUsersAndTrainersAndClasses: async (req, res) => {
      try {
        const users = await knex('users').select('*');
        const trainers = await knex('trainers').select('*');
        const classes = await knex('classes').select('*');

        res.json({ users, trainers, classes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getAllUsers: async (req, res) => {
      try {
        const users = await knex('users').select('*');
        res.json({ users });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getUserById: async (req, res) => {
      const userId = req.params.userId;

      try {
        const user = await knex('users').where({ id: userId }).first();
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  };
};
