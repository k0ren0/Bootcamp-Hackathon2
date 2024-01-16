module.exports = (db) => {
    const registrationsModel = require('../models/registrationsModel')(db);
  
    return {
      getAllRegistrations: async (req, res) => {
        try {
          const allRegistrations = await registrationsModel.getAllRegistrations();
          res.json({ allRegistrations });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
  
      registerForClass: async (req, res) => {
        const { userId, classId } = req.body;
  
        try {
       
          await registrationsModel.registerUserForClass(userId, classId);
  
          res.json({ message: 'Successfully registered for the class' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
  

    };
  };
  