const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

// Загружаем переменные окружения из файла .env
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Knex configuration for PostgreSQL
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASS || 'your_password',
    database: process.env.DB_NAME || 'your_database_name',
  },
});

// Middleware to set the database connection in the app
app.use((req, res, next) => {
  req.app.set('db', db);
  next();
});

// Helper functions for JWT
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

function generateToken(username) {
  return jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.username;
  } catch (error) {
    return null;
  }
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const username = verifyToken(token);

  if (!username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = { username };
  next();
}

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle login request
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Perform authentication logic here using bcrypt and JWT
  // For simplicity, assuming a user with the given username exists in the database
  // and checking the password

  const user = await db('users').where({ username }).first();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // If authentication is successful, generate JWT token and send it in the response
  const token = generateToken(username);
  res.json({ success: true, message: 'Login successful', token });
});

// Serve registration page
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// Handle registration request
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db('users').insert({
      username: username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(username);

    res.status(201).json({ success: true, message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve profile page with authentication check
app.get('/profile', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/profile.html');
});

// Google OAuth Configuration
passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://localhost:3001/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Save or retrieve user information from the database
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

// Authentication middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Route for initiating Google OAuth login
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// Callback route after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/profile');
  });

// Additional route to check authentication status
app.get('/check-auth', ensureAuthenticated, (req, res) => {
  res.json({ authenticated: true });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
