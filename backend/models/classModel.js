module.exports = (db) => {
    return {
      getAvailableClasses: async () => {
        try {

          const currentDate = new Date();
          const availableClasses = await db('classes')
            .select('*')
            .where('time', '>', currentDate)
            .orderBy('time', 'asc');
  
          return availableClasses;
        } catch (error) {
          throw error;
        }
      },
  
      registerUserForClass: async (userId, classId) => {
        try {
          
          return await db('registrations').insert({ user_id: userId, class_id: classId });
        } catch (error) {
          throw error;
        }
      },
    
    };
  };
  