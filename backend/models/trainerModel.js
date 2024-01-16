module.exports = (knex) => {
    return {
      getAllTrainers: async () => {
        try {
          return await knex('trainers').select('*');
        } catch (error) {
          throw error;
        }
      },
  
      getTrainerById: async (trainerId) => {
        try {
          return await knex('trainers').where({ id: trainerId }).first();
        } catch (error) {
          throw error;
        }
      },
    };
  };
  