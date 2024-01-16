module.exports = (knex) => {
  return {
    createClass: async (req, res) => {
      const { className, schedule, trainerId, capacity } = req.body;

      try {
        await knex('classes').insert({ name: className, schedule, trainer_id: trainerId, capacity });
        res.json({ message: 'Class created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    updateClass: async (req, res) => {
      const { className, schedule, trainerId, capacity } = req.body;
      const classId = req.params.classId;

      try {
        await knex('classes').where({ id: classId }).update({ name: className, schedule, trainer_id: trainerId, capacity });
        res.json({ message: 'Class updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    deleteClass: async (req, res) => {
      const classId = req.params.classId;

      try {
        await knex('classes').where({ id: classId }).del();
        res.json({ message: 'Class deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getAllClasses: async (req, res) => {
      console.log('Request to getAllClasses received');
      try {
        const classes = await knex('classes').select('*');
        res.json({ classes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getClassById: async (req, res) => {
      const classId = req.params.classId;

      try {
        const userClass = await knex('classes').where({ id: classId }).first();
        if (!userClass) {
          return res.status(404).json({ error: 'Class not found' });
        }

        res.json({ userClass });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  };
};
