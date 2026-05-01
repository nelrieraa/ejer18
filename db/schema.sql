CREATE DATABASE IF NOT EXISTS Biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Biblioteca;

CREATE TABLE IF NOT EXISTS libros (
  id      INT          NOT NULL AUTO_INCREMENT,
  titulo  VARCHAR(255) NOT NULL,
  autor   VARCHAR(255) NOT NULL,
  isbn    VARCHAR(20)  UNIQUE,
  estado  ENUM('Disponible', 'Prestado') NOT NULL DEFAULT 'Disponible',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS prestamos (
  id                INT          NOT NULL AUTO_INCREMENT,
  libro_id          INT          NOT NULL,
  nombre_prestatario VARCHAR(255) NOT NULL,
  fecha_prestamo    DATE         NOT NULL,
  fecha_devolucion  DATE         NOT NULL,
  fecha_entrega     DATE         NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_prestamo_libro FOREIGN KEY (libro_id) REFERENCES libros (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
