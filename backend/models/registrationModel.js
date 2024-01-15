module.exports = (db) => {
    return {
      registerForClass: async (userId, classId) => {
        try {
          return await db('registrations').insert({ user_id: userId, class_id: classId });
        } catch (error) {
          throw error;
        }
      },
      
      // Add other registration-related model methods here
    };
  };
  