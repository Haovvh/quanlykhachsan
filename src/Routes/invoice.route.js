
const { Router } = require('express');
const { 
    getInvoice,
    getAllInvoice
} = require('../Controllers/invoice.controller');


const router = Router();

    router.get('/', getInvoice);
    router.post('/action', getAllInvoice);

module.exports = router;