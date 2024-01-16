
module.exports = (db) => {
  return {
    getAllClasses: async (req, res) => {
      try {
        const classes = await db('classes').select('*');
        res.json({ classes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    getClassDetails: async (req, res) => {
      const { classId } = req.params;

      try {
        const classDetails = await db('classes').where({ id: classId }).first();
        if (classDetails) {
          res.json({ classDetails });
        } else {
          res.status(404).json({ error: 'Class not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },


  };
};
