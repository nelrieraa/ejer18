const { layout } = require('../layout');

function catalogo(libros) {
  const filas = libros.map(l => `
    <tr>
      <td><a href="/libro/${l.id}">${l.titulo}</a></td>
      <td>${l.autor}</td>
      <td><span class="badge badge-${l.estado === 'Disponible' ? 'disponible' : 'prestado'}">${l.estado}</span></td>
    </tr>`).join('');

  return layout('Catálogo', `
    <div class="page-header">
      <h1>Catálogo de Libros</h1>
    </div>
    <div class="card">
      <table class="table">
        <thead><tr><th>Título</th><th>Autor</th><th>Estado</th></tr></thead>
        <tbody>${filas || '<tr><td colspan="3" class="empty">No hay libros.</td></tr>'}</tbody>
      </table>
    </div>`);
}

function detalle(libro, historial, prestamoActivo) {
  const isDisponible = libro.estado === 'Disponible';

  const accion = isDisponible
    ? `<a href="/prestamo/formulario/${libro.id}" class="btn btn-primary btn-lg">Prestar Libro</a>`
    : `
      <div class="prestamo-activo">
        <p>Prestado a: <strong>${prestamoActivo.nombre_prestatario}</strong></p>
        <p>Fecha de devolución: <strong>${fmtDate(prestamoActivo.fecha_devolucion)}</strong></p>
      </div>
      <form action="/prestamo/devolver/${libro.id}" method="POST">
        <button type="submit" class="btn btn-success btn-lg"
          onclick="return confirm('¿Confirmar devolución?')">Registrar Devolución</button>
      </form>`;

  const filasHistorial = historial.map(p => `
    <tr>
      <td>${p.nombre_prestatario}</td>
      <td>${fmtDate(p.fecha_prestamo)}</td>
      <td>${fmtDate(p.fecha_devolucion)}</td>
      <td>${p.fecha_entrega ? fmtDate(p.fecha_entrega) : '<span class="badge badge-prestado">Activo</span>'}</td>
    </tr>`).join('');

  return layout(`${libro.titulo}`, `
    <div class="page-header">
      <h1>${libro.titulo}</h1>
      <a href="/" class="btn btn-secondary">← Catálogo</a>
    </div>

    <div class="ficha-layout">
      <div class="card">
        <h2>Información del libro</h2>
        <table class="ficha-table">
          <tr><th>Título</th><td>${libro.titulo}</td></tr>
          <tr><th>Autor</th><td>${libro.autor}</td></tr>
          <tr><th>ISBN</th><td>${libro.isbn || '—'}</td></tr>
          <tr><th>Estado</th><td><span class="badge badge-${libro.estado === 'Disponible' ? 'disponible' : 'prestado'}">${libro.estado}</span></td></tr>
        </table>
        <div style="margin-top:1.25rem">${accion}</div>
      </div>

      <div class="card">
        <h2>Historial de préstamos</h2>
        <table class="table">
          <thead><tr><th>Prestatario</th><th>F. Préstamo</th><th>F. Devolución</th><th>F. Entrega</th></tr></thead>
          <tbody>${filasHistorial || '<tr><td colspan="4" class="empty">Sin historial.</td></tr>'}</tbody>
        </table>
      </div>
    </div>`);
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-ES');
}

module.exports = { catalogo, detalle };
