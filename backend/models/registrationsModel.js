module.exports = (db) => {
  return {
    registerForClass: async (userId, classId) => {
      try {
        return await db('registrations').insert({ user_id: userId, class_id: classId });
      } catch (error) {
        throw error;
      }
    },

    getAllRegistrations: async () => {
      try {
        return await db('registrations').select('*');
      } catch (error) {
        throw error;
      }
    },


  };
};
