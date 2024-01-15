const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

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
const knex = require('knex');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(\`[${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next();
});

// Knex configuration for PostgreSQL
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'your_database_name',
  },
});

// Set up routes
const adminRoutes = require('./routes/adminRoutes')(db, bcrypt);
const trainerRoutes = require('./routes/trainerRoutes')(db, bcrypt);
const userRoutes = require('./routes/userRoutes')(db, bcrypt);

app.use('/admin', adminRoutes);
app.use('/trainer', trainerRoutes);
app.use('/user', userRoutes);

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`);

// Create controller files
createFile('backend/controllers/adminController.js', `
// Admin controller logic goes here
module.exports = (db, bcrypt) => {
  return {
    getStatistics: (req, res) => {
      // Implement logic to fetch and return statistics
      res.json({ message: 'Admin statistics' });
    },
  };
};
`);

createFile('backend/controllers/trainerController.js', `
// Trainer controller logic goes here
module.exports = (db, bcrypt) => {
  return {
    // Implement trainer controller methods
  };
};
`);

createFile('backend/controllers/userController.js', `
// User controller logic goes here
module.exports = (db, bcrypt) => {
  return {
    // Implement user controller methods
  };
};
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

module.exports = (db, bcrypt) => {
  router.get('/statistics', adminController(db).getStatistics);
  return router;
};
`);

createFile('backend/routes/trainerRoutes.js', `
const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

module.exports = (db, bcrypt) => {
  // Define trainer routes here
  // Example: router.get('/trainers', trainerController(db).getTrainers);
  return router;
};
`);

createFile('backend/routes/userRoutes.js', `
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

module.exports = (db, bcrypt) => {
  // Define user routes here
  // Example: router.get('/classes', userController(db).getClasses);
  return router;
};
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
const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'your_database_name',
  },
});

module.exports = db;
`);

// Create .env file
createFile('.env', `
# Database configuration
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name

# Port for the server
PORT=3000
`);

// Create .gitignore file
createFile('.gitignore', `
# Node.js
node_modules/

# Dependency directories
/*/node_modules
/node_modules

# dotenv environment variables file
.env
`);

// Log the completion message
console.log('Project structure and files created successfully.');
