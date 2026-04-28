const db = require('../db');

async function getAll() {
  const [rows] = await db.query('SELECT * FROM libros ORDER BY titulo');
  return rows;
}

async function getById(id) {
  const [rows] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
  return rows[0] || null;
}

async function updateEstado(id, estado) {
  await db.query('UPDATE libros SET estado = ? WHERE id = ?', [estado, id]);
}

module.exports = { getAll, getById, updateEstado };
