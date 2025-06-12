const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

// Middleware para validar el ID de un libro
const getBook = async (req, res, next) => {
    let book;
    const { id } = req.params;  // Extrae el parámetro id de la URL

    // Verifica si el ID tiene el formato válido de un ID de MongoDB (24 caracteres hexadecimales)
    if (!id.match(/^([0-9a-fA-F]{24})$/)) {
        // Si el ID no es válido, responde con un error 404
        return res.status(404).json({
            message: 'El ID del libro no es válido'  // Mensaje de error
        });
    }

    try {
        book = await Book.findById(id);
        if(!book){
            return res.status(404).json(
                {
                    message: "El libro no fue encontrado"
                }
            )
        }
        
        } catch (error) {

            // Si hay algún error, responde con un error 500 (servidor interno)
            res.status(500).json({ message: error.message });
        }
      res.book = book;
      next(); 
};

module.exports = getBook;


// Obtener todos los libros [GET ALL]
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        console.log('GET ALL', books);
        if (books.length === 0) {
            return res.status(204).json([]);
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo libro [POST]
router.post('/', async (req, res) => {
    const { title, author, genre, publication_date } = req?.body;

    if (!title || !author || !genre || !publication_date) {
        return res.status(400).json({
            message: 'Los campos título, autor, género y fecha son obligatorios'
        });
    }

    const newBook = new Book({
        title,
        author,
        genre,
        publication_date
    });
    

    try {
        const saveBook = await newBook.save()
        res.status(201).json(saveBook)
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }

    // Aquí se puede agregar el código para guardar el libro en la base de datos, por ejemplo:
    // const newBook = new Book({ title, author, genre, publication_date });
    // newBook.save().then(() => res.status(201).json(newBook));
});

module.exports = router;
