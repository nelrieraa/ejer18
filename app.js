require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const libroController = require('./libro/controller');
const prestamoController = require('./prestamo/controller');

app.get('/', libroController.catalogo);
app.get('/libro/:id', libroController.detalle);
app.get('/prestados', prestamoController.listaPrestados);
app.get('/prestamos/usuario', prestamoController.porUsuario);
app.get('/vencidos', prestamoController.listaVencidos);
app.get('/prestamo/formulario/:libro_id', prestamoController.formularioPrestamo);
app.post('/prestamo/nuevo', prestamoController.nuevoPrestamo);
app.post('/prestamo/devolver/:libro_id', prestamoController.devolverLibro);

app.use((req, res) => {
  res.status(404).send('<h1>404 — Página no encontrada</h1><a href="/">Volver al catálogo</a>');
});

app.listen(PORT, () => {
  console.log(`Biblioteca corriendo en http://localhost:${PORT}`);
});

module.exports = app;
