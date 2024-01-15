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
          // Implement logic to check if the user is allowed to register for the class
          // (e.g., check for availability, user's existing registrations, etc.)
  
          // Assuming the user is allowed to register, you can add the registration to the database
          await registrationsModel.registerUserForClass(userId, classId);
  
          res.json({ message: 'Successfully registered for the class' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
  
      // Add more controller methods as needed
    };
  };
  