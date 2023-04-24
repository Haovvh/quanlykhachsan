const { Router } = require('express');
const { getAllBook, getBook, loadBookData, getBookById, postBook, putBook, deleteBook } = require('../Controllers/book.controller');

const router = Router();

    router.get('/', getBook);
    router.get('/all', getAllBook);
    
    router.get('/load', loadBookData);
    router.get('/:id', getBookById);
    router.post('/', postBook);
    router.put('/', putBook);
    router.delete('/', deleteBook)

module.exports = router;




