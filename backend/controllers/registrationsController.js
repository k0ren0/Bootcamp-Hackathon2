module.exports = (knex) => {
    return {
      createRegistration: async (req, res) => {
        const { userId, classId } = req.body;
  
        try {

          const existingRegistration = await knex('registrations')
            .where({ user_id: userId, class_id: classId })
            .first();
  
          if (existingRegistration) {
            return res.status(400).json({ error: 'User is already registered for this class' });
          }
  

          await knex('registrations').insert({ user_id: userId, class_id: classId });
  
          res.json({ message: 'Registration successful' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
  
      deleteRegistration: async (req, res) => {
        const { userId, classId } = req.body;
  
        try {

          await knex('registrations').where({ user_id: userId, class_id: classId }).del();
  
          res.json({ message: 'Registration deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
  
      getAllRegistrations: async (req, res) => {
        try {
          // Получаем все регистрации
          const registrations = await knex('registrations').select('*');
  
          res.json({ registrations });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
  
      getRegistrationsByUserId: async (req, res) => {
        const userId = req.params.userId;
  
        try {
   
          const userRegistrations = await knex('registrations').where({ user_id: userId }).select('*');
  
          res.json({ userRegistrations });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
  
      getRegistrationsByClassId: async (req, res) => {
        const classId = req.params.classId;
  
        try {

          const classRegistrations = await knex('registrations').where({ class_id: classId }).select('*');
  
          res.json({ classRegistrations });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    };
  };
  