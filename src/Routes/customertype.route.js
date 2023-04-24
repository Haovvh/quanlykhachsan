
const { Router } = require('express');
const { 
    getCustomerType,
    getAllCustomerType,
    getCustomerTypeById,
    postCustomerType,
    putCustomerTypeById,
    deleteCustomerTypeById
} = require('../Controllers/customertype.controller');


const router = Router();

    router.get('/', getCustomerType);
    router.get('/all', getAllCustomerType);
    router.get('/:id', getCustomerTypeById);
    router.post('/', postCustomerType);
    router.put('/', putCustomerTypeById);
    router.delete('/', deleteCustomerTypeById);
    
module.exports = router;