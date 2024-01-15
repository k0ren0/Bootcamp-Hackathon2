module.exports = (db) => {
    return {
      getAllClasses: async () => {
        try {
          return await db('classes').select('*');
        } catch (error) {
          throw error;
        }
      },
      
      // Add other class-related model methods here
    };
  };
  