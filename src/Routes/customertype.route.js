
const { Router } = require('express');
const { 
    getCustomerType,
    getAllCustomerType
} = require('../Controllers/customertype.controller');


const router = Router();

    router.get('/', getCustomerType);
    router.post('/action', getAllCustomerType);
    
module.exports = router;