const { Router } = require('express');
const { getAllBook, searchBook, getBook, getBookByIdFromTo, loadBookData, getBookById, postBook, putBook, deleteBook, putBookSuccess, getBookByRole } = require('../Controllers/book.controller');
const {validateToken} = require('../Helpers/validateToken.helper');

const router = Router();

    router.get('/', getBook);
    router.get('/role', getBookByRole);
    router.get('/all',validateToken, getAllBook);
    
    router.get('/load',validateToken, loadBookData);
    router.get('/:id',validateToken, getBookById);
    router.get('/page/:id/:rowinpage',validateToken, getBookByIdFromTo);
    router.post('/',validateToken, postBook);
    router.post('/search',validateToken, searchBook);
    router.put('/',validateToken, putBook);
    router.put('/success',validateToken, putBookSuccess);
    router.delete('/',validateToken, deleteBook)

module.exports = router;




