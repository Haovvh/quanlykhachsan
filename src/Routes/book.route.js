const { Router } = require('express');
const { getAllBook, getBook, getBookByIdFromTo, loadBookData, getBookById, postBook, putBook, deleteBook, putBookSuccess } = require('../Controllers/book.controller');

const router = Router();

    router.get('/', getBook);
    router.get('/all', getAllBook);
    
    router.get('/load', loadBookData);
    router.get('/:id', getBookById);
    router.get('/page/:id/:rowinpage', getBookByIdFromTo);
    router.post('/', postBook);
    router.put('/', putBook);
    router.put('/success', putBookSuccess);
    router.delete('/', deleteBook)

module.exports = router;




