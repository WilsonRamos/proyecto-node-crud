const mongoose = require('mongoose');


// Definición del esquema para los libros
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  gender: String,
  publication_date: String,
});

// Creación y exportación del modelo 'Book' basado en el esquema 'bookSchema'
module.exports = mongoose.model('Book', bookSchema)
