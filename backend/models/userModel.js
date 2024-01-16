const bcrypt = require('bcrypt');

module.exports = (knex) => {
  return {
    createUser: async (username, password) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await knex('users').insert({ username, password: hashedPassword });
      } catch (error) {
        throw error;
      }
    },

    updateUserPassword: async (userId, newPassword) => {
      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return await knex('users').where({ id: userId }).update({ password: hashedPassword });
      } catch (error) {
        throw error;
      }
    },

    getAllUsers: async () => {
      try {
        return await knex('users').select('*');
      } catch (error) {
        throw error;
      }
    },

    getUserById: async (userId) => {
      try {
        return await knex('users').where({ id: userId }).first();
      } catch (error) {
        throw error;
      }
    },
  };
};
