require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging → archivo access.log
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));
app.use(morgan('dev'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Controladores
const libroController = require('./libro/controller');
const prestamoController = require('./prestamo/controller');

// ── Catálogo ──────────────────────────────────────────
app.get('/', libroController.catalogo);

// ── Detalle de libro ──────────────────────────────────
app.get('/libro/:id', libroController.detalle);

// ── Libros prestados ──────────────────────────────────
app.get('/prestados', prestamoController.listaPrestados);

// ── Préstamos por usuario ─────────────────────────────
app.get('/prestamos/usuario', prestamoController.porUsuario);

// ── Vencidos ──────────────────────────────────────────
app.get('/vencidos', prestamoController.listaVencidos);

// ── Formulario y acción de prestar ────────────────────
app.get('/prestamo/formulario/:libro_id', prestamoController.formularioPrestamo);
app.post('/prestamo/nuevo', prestamoController.nuevoPrestamo);

// ── Devolución ────────────────────────────────────────
app.post('/prestamo/devolver/:libro_id', prestamoController.devolverLibro);

// 404
app.use((req, res) => {
  res.status(404).send('<h1>404 — Página no encontrada</h1><a href="/">Volver al catálogo</a>');
});

app.listen(PORT, () => {
  console.log(`📚 Biblioteca corriendo en http://localhost:${PORT}`);
});

module.exports = app;
