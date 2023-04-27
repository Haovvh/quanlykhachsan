
const { Router } = require('express');
const { 
    getInvoice,
    getAllInvoice
} = require('../Controllers/invoice.controller');


const router = Router();

    router.get('/:id', getInvoice);

module.exports = router;