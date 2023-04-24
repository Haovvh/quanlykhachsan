const express = require('express');
const { 
    getCustomer,
    getAllCustomer,
    getCustomerById,
    postCustomer,
    putCustomerById,
    deleteCustomerById
} = require('../Controllers/customer.controller');


const router = express.Router();

    
    router.get('/', getCustomer);
    router.get('/all', getAllCustomer);
    router.get('/:id', getCustomerById);
    router.post('/', postCustomer);
    router.put('/', putCustomerById);
    router.delete('/', deleteCustomerById);

module.exports = router;