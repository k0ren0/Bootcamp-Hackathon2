const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const db = require('../database/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: process.env.SESSION_SECRET || '23032303',
  resave: false,
  saveUninitialized: true,
}));

app.use(async (req, res, next) => {
  try {
    req.app.set('db', db);
    next();
  } catch (error) {
    next(error);
  }
});

// JWT Setup
const jwtSecret = process.env.JWT_SECRET || '19841984';

function generateToken(username) {
  return jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decoded = verifyToken(token);

  if (!decoded || !decoded.username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = { username: decoded.username };
  next();
}

// Passport Setup
passport.serializeUser(async (user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error, null);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db('users').where({ id }).first();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await db('users').where({ username }).first();

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/profile',
}));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db('users').insert({ username, password: hashedPassword });

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/login', (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'login.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/register', (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'register.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'profile.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/about', (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'about.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/schedule', (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'schedule.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/check-auth', authenticateToken, (req, res) => {
  res.json({ authenticated: true });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database connection check
db.raw('SELECT 1+1 as result')
  .then(() => console.log('Connection to database successful'))
  .catch(error => console.error('Error connecting to database:', error))
  .finally(() => db.destroy());


  db.raw('SELECT 1+1 as result')
  .then(() => {
    console.log('Connection to database successful');

    // Select users
    return db.select('*').from('users');
  })
  .then(users => {
    console.log('Users:', users);

    // Select trainers
    return db.select('*').from('trainers');
  })
  .then(trainers => {
    console.log('Trainers:', trainers);
  })
  .catch(error => console.error('Error:', error))
  .finally(() => {
    db.destroy();
  });