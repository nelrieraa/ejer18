const { layout } = require('../layout');

function prestados(filas) {
  const rows = filas.map(p => `
    <tr>
      <td>${p.titulo}</td>
      <td>${p.autor}</td>
      <td><a href="/prestamos/usuario?nombre=${encodeURIComponent(p.nombre_prestatario)}">${p.nombre_prestatario}</a></td>
      <td>${fmtDate(p.fecha_devolucion)}</td>
    </tr>`).join('');

  return layout('Libros Prestados', `
    <div class="page-header">
      <h1>Libros Prestados</h1>
      <a href="/" class="btn btn-secondary">← Catálogo</a>
    </div>
    <div class="card">
      <table class="table">
        <thead><tr><th>Título</th><th>Autor</th><th>Prestatario</th><th>F. Devolución</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="4" class="empty">No hay libros prestados.</td></tr>'}</tbody>
      </table>
    </div>`);
}

function porUsuario(nombre, prestamos) {
  const rows = prestamos.map(p => `
    <tr>
      <td>${p.titulo}</td>
      <td>${p.autor}</td>
      <td>${fmtDate(p.fecha_devolucion)}</td>
    </tr>`).join('');

  return layout(`Préstamos de ${nombre}`, `
    <div class="page-header">
      <h1>Libros prestados a: ${nombre}</h1>
      <a href="/prestados" class="btn btn-secondary">← Prestados</a>
    </div>
    <div class="card">
      <table class="table">
        <thead><tr><th>Título</th><th>Autor</th><th>F. Devolución</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="3" class="empty">Este usuario no tiene préstamos activos.</td></tr>'}</tbody>
      </table>
    </div>`);
}

function vencidos(filas) {
  const rows = filas.map(p => `
    <tr>
      <td><a href="/libro/${p.libro_id}">${p.titulo}</a></td>
      <td>${p.autor}</td>
      <td><a href="/prestamos/usuario?nombre=${encodeURIComponent(p.nombre_prestatario)}">${p.nombre_prestatario}</a></td>
      <td>${fmtDate(p.fecha_devolucion)}</td>
      <td><span class="badge badge-vencido">${p.dias_vencido} día${p.dias_vencido !== 1 ? 's' : ''}</span></td>
    </tr>`).join('');

  return layout('Libros Vencidos', `
    <div class="page-header">
      <h1>Libros con devolución vencida</h1>
      <a href="/" class="btn btn-secondary">← Catálogo</a>
    </div>
    <div class="card">
      <table class="table">
        <thead><tr><th>Título</th><th>Autor</th><th>Prestatario</th><th>Venció el</th><th>Días vencido</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="5" class="empty">No hay préstamos vencidos.</td></tr>'}</tbody>
      </table>
    </div>`);
}

function formularioPrestamo(libro, error = '') {
  const hoy = new Date().toISOString().split('T')[0];
  return layout(`Prestar: ${libro.titulo}`, `
    <div class="page-header">
      <h1>Prestar libro</h1>
      <a href="/libro/${libro.id}" class="btn btn-secondary">← Volver</a>
    </div>
    <div class="card form-card">
      <h2>${libro.titulo} — ${libro.autor}</h2>
      ${error ? `<div class="alert alert-error">${error}</div>` : ''}
      <form action="/prestamo/nuevo" method="POST" class="form">
        <input type="hidden" name="libro_id" value="${libro.id}">
        <div class="form-group">
          <label>Nombre del prestatario *</label>
          <input type="text" name="nombre_prestatario" required placeholder="Nombre completo">
        </div>
        <div class="form-group">
          <label>Fecha de préstamo *</label>
          <input type="date" name="fecha_prestamo" value="${hoy}" required>
        </div>
        <div class="form-group">
          <label>Fecha de devolución *</label>
          <input type="date" name="fecha_devolucion" required min="${hoy}">
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Confirmar préstamo</button>
          <a href="/libro/${libro.id}" class="btn btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>`);
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-ES');
}

module.exports = { prestados, porUsuario, vencidos, formularioPrestamo };
