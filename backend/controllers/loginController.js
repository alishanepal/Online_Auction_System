const pool = require('../db');

// Controller for logging in a user
async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // You can add JWT or session logic here for real apps
    res.status(200).json({ message: 'Login successful', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { loginUser };
