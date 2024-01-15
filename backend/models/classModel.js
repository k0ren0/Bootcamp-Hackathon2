module.exports = (db) => {
    return {
      getAvailableClasses: async () => {
        try {
          // Implement logic to fetch classes that are available
          // (e.g., classes that are not fully booked and not in the past)
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
          // Implement logic to add the user's registration for the class to the database
          return await db('registrations').insert({ user_id: userId, class_id: classId });
        } catch (error) {
          throw error;
        }
      },
      // Add more class-related model methods as needed
    };
  };
  