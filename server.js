const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",          
  host: "localhost",
  database: "Sangavi",    
  password: "12345",    
  port: 5432,
});

app.post("/api/send-message", async (req, res) => {
  const { name, email, message } = req.body;

 
    await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.status(200).json({ success: true });
  
    console.error("❌ DB Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, password]
    );
    res.status(200).json({ message: "User signed up successfully!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// ➤ Save order
app.post("/api/order", async (req, res) => {
  const { name, dress, amount, address, phone, payment_type } = req.body;
  try {
    await pool.query(
      `INSERT INTO orders (name, dress, amount, address, phone, payment_type) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, dress, amount, address, phone, payment_type]
    );
    res.status(200).json({ message: "Order placed!" });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Order failed" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
