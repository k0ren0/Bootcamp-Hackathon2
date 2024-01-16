module.exports = (db) => {
  const classModel = require('../models/classModel')(db);

  return {
    dashboard: (req, res) => {

      res.json({ message: 'User Dashboard' });
    },

    getAvailableClasses: async (req, res) => {
      try {
        const availableClasses = await classModel.getAvailableClasses();
        res.json({ availableClasses });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    registerForClass: async (req, res) => {
      const { classId } = req.body;

      try {
      
        await classModel.registerUserForClass(req.user.id, classId);

        res.json({ message: 'Successfully registered for the class' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getUsersAndTrainersAndClasses: async (req, res) => {
      try {
        const users = await db('users').select('*');
        const trainers = await db('trainers').select('*');
        const classes = await db('classes').select('*');

        res.json({ users, trainers, classes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
    getAllUsers: async (req, res) => {
      console.log('Request to getAllUsers received'); 
      try {
        const users = await db('users').select('*');
        res.json({ users });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getUserById: async (req, res) => {
      const userId = req.params.userId;

      try {
        const user = await db('users').where({ id: userId }).first();
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