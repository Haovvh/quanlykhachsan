const { Router } = require('express');
const { getGender, getGenderByIdFromTo, searchGender, getAllGender , getGenderById, postGender, putGenderById, deleteGenderById} 
= 
require('../Controllers/gender.controller');
const {validateToken} = require('../Helpers/validateToken.helper');
const router = Router();

    router.get('/', getGender);
    router.get('/all',validateToken, getAllGender);
    router.get('/:id',validateToken, getGenderById);
    router.get('/page/:id/:rowinpage',validateToken, getGenderByIdFromTo); 
    
    router.post('/',validateToken, postGender);
    router.post('/search',validateToken, searchGender);
    router.put('/',validateToken, putGenderById);
    router.delete('/', validateToken,deleteGenderById);

module.exports = router;




