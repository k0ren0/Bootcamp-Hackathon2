module.exports = (knex) => {
    return {
      getAvailableClasses: async () => {
        try {
          return await knex('classes').where({ status: 'available' }).select('*');
        } catch (error) {
          throw error;
        }
      },
  
      registerUserForClass: async (userId, classId) => {
        try {
          return await knex('user_classes').insert({ user_id: userId, class_id: classId });
        } catch (error) {
          throw error;
        }
      },
    };
  };
  