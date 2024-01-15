const fs = require('fs');
const path = require('path');

// Function to create a directory
function createDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Created directory: ${directoryPath}`);
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
}

// Function to create a file with content
function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
}

// Create project directories
createDirectory('backend');
createDirectory('backend/controllers');
createDirectory('backend/models');
createDirectory('backend/routes');
createDirectory('frontend');
createDirectory('frontend/admin');
createDirectory('frontend/trainer');
createDirectory('frontend/user');
createDirectory('database');
createDirectory('database/migrations');
createDirectory('database/seeds');

// Create server.js
createFile('backend/server.js', `
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
  console.log(\`Server is running on port \${PORT}\`);
});
`);

// Create controller files
createFile('backend/controllers/adminController.js', `
// Admin controller logic goes here
`);

createFile('backend/controllers/trainerController.js', `
// Trainer controller logic goes here
`);

createFile('backend/controllers/userController.js', `
// User controller logic goes here
`);

// Create model files
createFile('backend/models/userModel.js', `
// User model definition goes here
`);

createFile('backend/models/trainerModel.js', `
// Trainer model definition goes here
`);

createFile('backend/models/classModel.js', `
// Class model definition goes here
`);

createFile('backend/models/registrationModel.js', `
// Registration model definition goes here
`);

// Create route files
createFile('backend/routes/adminRoutes.js', `
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define admin routes here
router.get('/statistics', adminController.getStatistics);

module.exports = router;
`);

createFile('backend/routes/trainerRoutes.js', `
const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

// Define trainer routes here
// Example: router.get('/trainers', trainerController.getTrainers);

module.exports = router;
`);

createFile('backend/routes/userRoutes.js', `
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user routes here
// Example: router.get('/classes', userController.getClasses);

module.exports = router;
`);

// Create frontend files
createFile('frontend/admin/index.html', `
<!-- Admin dashboard HTML goes here -->
`);

createFile('frontend/admin/styles.css', `
/* Admin styles go here */
`);

createFile('frontend/admin/admin.js', `
// Admin JavaScript logic goes here
`);

createFile('frontend/trainer/index.html', `
<!-- Trainer dashboard HTML goes here -->
`);

createFile('frontend/trainer/styles.css', `
/* Trainer styles go here */
`);

createFile('frontend/trainer/trainer.js', `
// Trainer JavaScript logic goes here
`);

createFile('frontend/user/index.html', `
<!-- User dashboard HTML goes here -->
`);

createFile('frontend/user/styles.css', `
/* User styles go here */
`);

createFile('frontend/user/user.js', `
// User JavaScript logic goes here
`);

// Create database files
createFile('database/db.js', `
// Database connection logic goes here
`);

// Log the completion message
console.log('Project structure and files created successfully.');
