
const express = require('express');
const cors = require('cors');
const { registerUser } = require('./controllers/registerController');
const { loginUser } = require('./controllers/loginController');

const app = express();
app.use(cors());
app.use(express.json());

// Register user endpoint
app.post('/api/register', registerUser);
// Login user endpoint
app.post('/api/login', loginUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
