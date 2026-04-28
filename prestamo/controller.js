const prestamoModel = require('./model');
const libroModel = require('../libro/model');
const view = require('./view');

async function listaPrestados(req, res) {
  const filas = await prestamoModel.getPrestados();
  res.send(view.prestados(filas));
}

async function porUsuario(req, res) {
  const nombre = req.query.nombre || '';
  if (!nombre.trim()) return res.redirect('/prestados');
  const prestamos = await prestamoModel.getPorUsuario(nombre);
  res.send(view.porUsuario(nombre, prestamos));
}

async function listaVencidos(req, res) {
  const filas = await prestamoModel.getVencidos();
  res.send(view.vencidos(filas));
}

async function formularioPrestamo(req, res) {
  const libro = await libroModel.getById(req.params.libro_id);
  if (!libro) return res.status(404).send('<h1>Libro no encontrado</h1>');
  if (libro.estado === 'Prestado') return res.redirect(`/libro/${libro.id}`);
  res.send(view.formularioPrestamo(libro));
}

async function nuevoPrestamo(req, res) {
  const { libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion } = req.body;
  const libro = await libroModel.getById(libro_id);
  if (!libro || libro.estado === 'Prestado') return res.redirect(`/libro/${libro_id}`);

  if (!nombre_prestatario?.trim() || !fecha_prestamo || !fecha_devolucion) {
    return res.send(view.formularioPrestamo(libro, 'Todos los campos son obligatorios.'));
  }

  await prestamoModel.crear({ libro_id, nombre_prestatario: nombre_prestatario.trim(), fecha_prestamo, fecha_devolucion });
  await libroModel.updateEstado(libro_id, 'Prestado');
  res.redirect(`/libro/${libro_id}`);
}

async function devolverLibro(req, res) {
  const libroId = req.params.libro_id;
  const prestamo = await prestamoModel.getActivoByLibroId(libroId);
  if (prestamo) {
    await prestamoModel.registrarDevolucion(prestamo.id);
    await libroModel.updateEstado(libroId, 'Disponible');
  }
  res.redirect(`/libro/${libroId}`);
}

module.exports = { listaPrestados, porUsuario, listaVencidos, formularioPrestamo, nuevoPrestamo, devolverLibro };
