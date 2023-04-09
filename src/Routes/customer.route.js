const express = require('express');
const { 
    getCustomer,
    getAllCustomer,
} = require('../Controllers/customer.controller');


const router = express.Router();

    
    router.get('/', getCustomer);
    router.post('/action', getAllCustomer);

module.exports = router;