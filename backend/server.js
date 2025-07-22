
const express = require('express');
const cors = require('cors');
const RegisterController = require('./controllers/registerController');
const LoginController = require('./controllers/loginController');

const app = express();
app.use(cors());
app.use(express.json());

// Register user endpoint
app.post('/api/register', RegisterController.registerUser);
// Login user endpoint
app.post('/api/login', LoginController.loginUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
