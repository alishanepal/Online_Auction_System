const express = require('express');
const cors = require('cors');
const session = require('express-session');
const RegisterController = require('./controllers/registerController');
const LoginController = require('./controllers/loginController');

class AuctionApp {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.use(cors({
      origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
    }));
    this.app.use(express.json());
    this.app.use(session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      },
    }));
    this.app.use((req, res, next) => {
      console.log('Session:', req.session);
      next();
    });
  }

  routes() {
    this.app.get('/api/debug-session', (req, res) => {
      res.json({ session: req.session });
    });
    this.app.post('/api/register', RegisterController.registerUser);
    this.app.post('/api/login', LoginController.loginUser);
    this.app.post('/api/logout', (req, res) => {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
      });
    });
    this.app.get('/api/me', (req, res) => {
      if (req.session.user) {
        res.json({ user: req.session.user });
      } else {
        res.status(401).json({ user: null });
      }
    });
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

module.exports = AuctionApp;
