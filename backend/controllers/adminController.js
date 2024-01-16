const bcrypt = require('bcrypt');

module.exports = (knex) => {
  const adminModel = require('../models/adminModel')(knex);

  return {
    createAdmin: async (req, res) => {
      const { username, password } = req.body;

      try {
        await adminModel.createAdmin(username, password);
        res.json({ message: 'Admin created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    updateAdminPassword: async (req, res) => {
      const { newPassword } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await adminModel.updateAdminPassword(req.user.id, hashedPassword);
        res.json({ message: 'Password updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    dashboard: (req, res) => {
      res.json({ message: 'Admin Dashboard' });
    },

    getAllUsers: async (req, res) => {
      console.log('Request to getAllUsers received');
      try {
        const users = await knex('users').select('*');
        res.json({ users });
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

    getAllClasses: async (req, res) => {
      console.log('Request to getAllClasses received');
      try {
        const classes = await knex('classes').select('*');
        res.json({ classes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  };
};
