USE Biblioteca;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE prestamos;
TRUNCATE TABLE libros;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO libros (titulo, autor, isbn, estado) VALUES
('El ingenioso hidalgo don Quijote de la Mancha', 'Miguel de Cervantes',   '978-84-376-0494-7', 'Disponible'),
('Cien años de soledad',                           'Gabriel García Márquez','978-84-397-2077-3', 'Prestado'),
('1984',                                            'George Orwell',         '978-84-233-3786-3', 'Disponible'),
('El señor de los anillos',                        'J.R.R. Tolkien',        '978-84-450-7179-3', 'Prestado'),
('Crónica de una muerte anunciada',               'Gabriel García Márquez','978-84-397-1417-8', 'Disponible'),
('La sombra del viento',                           'Carlos Ruiz Zafón',     '978-84-08-05233-4', 'Disponible'),
('Harry Potter y la piedra filosofal',            'J.K. Rowling',          '978-84-9838-000-2', 'Prestado'),
('El nombre de la rosa',                           'Umberto Eco',           '978-84-350-1139-3', 'Disponible'),
('Don Juan Tenorio',                               'José Zorrilla',         '978-84-376-0116-8', 'Disponible'),
('El principito',                                  'Antoine de Saint-Exupéry', '978-84-665-1273-5', 'Disponible');

INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega) VALUES
(2, 'Ana García',    '2026-04-01', '2026-04-15', NULL);

INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega) VALUES
(4, 'Juan Pérez',    '2026-03-10', '2026-04-10', NULL);

INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega) VALUES
(7, 'María López',   '2026-04-20', '2026-05-04', NULL);

INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega) VALUES
(1, 'Carlos Ruiz',   '2026-01-05', '2026-01-19', '2026-01-18'),
(1, 'Ana García',    '2026-02-03', '2026-02-17', '2026-02-16');

INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega) VALUES
(3, 'Juan Pérez',    '2026-03-01', '2026-03-15', '2026-03-14');
