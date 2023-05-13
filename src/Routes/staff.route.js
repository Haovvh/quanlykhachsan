
const { Router } = require('express');
const { getStaff, getAllStaff, getStaffByIdFromTo, getStaffById, postStaff, putStaffById, deleteStaffById, searchStaff} = 
require('../Controllers/staff.controller');
const {validateToken} = require('../Helpers/validateToken.helper');

const router = Router();
router.get('/', getStaff);
    router.get('/all',validateToken, getAllStaff);
    router.get('/:id',validateToken, getStaffById);
    router.get('/page/:id/:rowinpage',validateToken, getStaffByIdFromTo);
    
    router.post('/search',validateToken, searchStaff);
    router.post('/',validateToken, postStaff);
    router.put('/',validateToken, putStaffById);
    router.delete('/',validateToken, deleteStaffById);
    

module.exports = router;