
module.exports = (db) => {
  return {
    dashboard: (req, res) => {
      res.json({ message: 'Trainer Dashboard' });
    },

    getRegisteredUsers: async (req, res) => {
      try {

        const registeredUsers = await db('registrations')
          .select('users.*')
          .join('users', 'registrations.user_id', '=', 'users.id');
        res.json({ registeredUsers });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getUserById: async (req, res) => {
      const userId = req.params.userId;

      try {

        const user = await db('users').where({ id: userId }).first();
        res.json({ user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getUsersAndClasses: async (req, res) => {
      try {

        const users = await db('users').select('*');
        const classes = await db('classes').select('*');

        res.json({ users, classes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  };
};
