const express = require('express');
const { 
    getCustomer,
    getAllCustomer,
    getCustomerById,
    postCustomer,
    putCustomerById,
    deleteCustomerById,
    getCustomerByIdFromTo,
    searchCustomer
} = require('../Controllers/customer.controller');


const router = express.Router();

    
    router.get('/', getCustomer);
    router.get('/all', getAllCustomer);
    router.get('/:id', getCustomerById);
    router.get('/page/:id/:rowinpage', getCustomerByIdFromTo);
    router.post('/', postCustomer);
    router.post('/search', searchCustomer);
    router.put('/', putCustomerById);
    router.delete('/', deleteCustomerById);

module.exports = router;