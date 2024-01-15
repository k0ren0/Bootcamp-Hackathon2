
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
const adminRoutes = require('./routes/adminRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/admin', adminRoutes);
app.use('/trainer', trainerRoutes);
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
