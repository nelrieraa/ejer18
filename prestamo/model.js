const db = require('../db');

async function getPrestados() {
  const [rows] = await db.query(`
    SELECT l.id, l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion
    FROM libros l
    JOIN prestamos p ON p.libro_id = l.id AND p.fecha_entrega IS NULL
    WHERE l.estado = 'Prestado'
    ORDER BY p.fecha_devolucion ASC
  `);
  return rows;
}

async function getPorUsuario(nombre) {
  const [rows] = await db.query(`
    SELECT l.titulo, l.autor, p.fecha_devolucion
    FROM prestamos p
    JOIN libros l ON l.id = p.libro_id
    WHERE p.nombre_prestatario = ? AND p.fecha_entrega IS NULL
    ORDER BY p.fecha_devolucion ASC
  `, [nombre]);
  return rows;
}

async function getHistorialByLibroId(libroId) {
  const [rows] = await db.query(`
    SELECT * FROM prestamos WHERE libro_id = ? ORDER BY fecha_prestamo DESC
  `, [libroId]);
  return rows;
}

async function getActivoByLibroId(libroId) {
  const [rows] = await db.query(`
    SELECT * FROM prestamos WHERE libro_id = ? AND fecha_entrega IS NULL LIMIT 1
  `, [libroId]);
  return rows[0] || null;
}

async function getVencidos() {
  const [rows] = await db.query(`
    SELECT l.id AS libro_id, l.titulo, l.autor,
           p.nombre_prestatario, p.fecha_devolucion,
           DATEDIFF(CURDATE(), p.fecha_devolucion) AS dias_vencido
    FROM prestamos p
    JOIN libros l ON l.id = p.libro_id
    WHERE p.fecha_entrega IS NULL AND p.fecha_devolucion < CURDATE()
    ORDER BY p.fecha_devolucion ASC
  `);
  return rows;
}

async function crear({ libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion }) {
  await db.query(`
    INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion)
    VALUES (?, ?, ?, ?)
  `, [libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion]);
}

async function registrarDevolucion(prestamoId) {
  await db.query(`
    UPDATE prestamos SET fecha_entrega = CURDATE() WHERE id = ?
  `, [prestamoId]);
}

module.exports = {
  getPrestados, getPorUsuario, getHistorialByLibroId,
  getActivoByLibroId, getVencidos, crear, registrarDevolucion,
};
