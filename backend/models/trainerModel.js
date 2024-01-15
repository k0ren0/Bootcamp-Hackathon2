const bcrypt = require('bcrypt');

module.exports = (db) => {
  return {
    createTrainer: async (username, password) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await db('trainers').insert({ username, password: hashedPassword });
      } catch (error) {
        throw error;
      }
    },
    
    // Add other trainer-related model methods here
  };
};
