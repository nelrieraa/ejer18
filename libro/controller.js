const libroModel = require('./model');
const prestamoModel = require('../prestamo/model');
const view = require('./view');

async function catalogo(req, res) {
  const libros = await libroModel.getAll();
  res.send(view.catalogo(libros));
}

async function detalle(req, res) {
  const libro = await libroModel.getById(req.params.id);
  if (!libro) return res.status(404).send('<h1>Libro no encontrado</h1><a href="/">Volver</a>');
  const historial = await prestamoModel.getHistorialByLibroId(libro.id);
  const prestamoActivo = libro.estado === 'Prestado'
    ? await prestamoModel.getActivoByLibroId(libro.id)
    : null;
  res.send(view.detalle(libro, historial, prestamoActivo));
}

module.exports = { catalogo, detalle };
