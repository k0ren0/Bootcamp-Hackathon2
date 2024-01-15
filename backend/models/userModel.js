const bcrypt = require('bcrypt');

module.exports = (db) => {
  return {
    createUser: async (username, password) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await db('users').insert({ username, password: hashedPassword });
      } catch (error) {
        throw error;
      }
    },
    
    // Add other user-related model methods here
  };
};
