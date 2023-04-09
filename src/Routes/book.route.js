const { Router } = require('express');
const { getBook, getAllBook } = require('../Controllers/book.controller');

const router = Router();

    router.get('/', getBook);
    router.post('/action', getAllBook);

module.exports = router;


    
    

