function layout(title, content) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Biblioteca</title>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <nav class="navbar">
    <a href="/" class="nav-logo">📚 Biblioteca</a>
    <div class="nav-links">
      <a href="/">Catálogo</a>
      <a href="/prestados">Prestados</a>
      <a href="/vencidos">Vencidos</a>
    </div>
  </nav>
  <main class="main-content">
    ${content}
  </main>
  <footer class="footer">
    <p>Biblioteca &copy; ${new Date().getFullYear()}</p>
  </footer>
</body>
</html>`;
}

module.exports = { layout };
