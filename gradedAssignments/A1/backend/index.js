require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:     parseInt(process.env.DB_PORT, 10),
});

const app = express();
app.use(cors());
app.use(express.json());

// CRUD endpoints
app.get('/tasks', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at');
  res.json(rows);
});

app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO tasks (description) VALUES ($1) RETURNING *',
    [description]
  );
  res.status(201).json(rows[0]);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { description, is_complete } = req.body;
  const { rows } = await pool.query(
    'UPDATE tasks SET description=$1, is_complete=$2 WHERE id=$3 RETURNING *',
    [description, is_complete, id]
  );
  res.json(rows[0]);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.status(204).end();
});

const PORT = parseInt(process.env.PORT, 10) || 5000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
