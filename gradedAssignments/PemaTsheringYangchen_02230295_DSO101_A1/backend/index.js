const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

require("dotenv").config();
console.log("→ env:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();
app.use(cors(), express.json());

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false
  )`);

// CRUD endpoints
app.get("/tasks", async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM tasks ORDER BY id");
  res.json(rows);
});
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.status(201).json(rows[0]);
});
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const { rows } = await pool.query(
    "UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title, completed, id]
  );
  res.json(rows[0]);
});
app.delete("/tasks/:id", async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
  res.status(204).end();
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`BE running on port ${port}`));
