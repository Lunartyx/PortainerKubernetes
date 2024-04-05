// server.js

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 190;

// Middleware
app.use(express.json());

// Connect to MariaDB
const pool = mysql.createPool({
  host: '192.168.134.131',
  user: 'user',
  password: 'password',
  database: 'mydatabase'
});

// Routes
// Retrieve all product IDs
app.get('/product-ids', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT productId FROM products');
    connection.release();
    const productIds = rows.map(row => row.productId);
    res.json(productIds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Retrieve product details by ID
app.get('/products/:productId', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products WHERE productId = ?', [req.params.productId]);
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
