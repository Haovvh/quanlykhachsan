const { Router } = require('express');
const { getGender, getAllGender , getGenderById, postGender, putGenderById, deleteGenderById} 
= 
require('../Controllers/gender.controller');

const router = Router();

    router.get('/', getGender);
    router.get('/all', getAllGender);
    router.get('/:id', getGenderById);
    router.post('/', postGender);
    router.put('/', putGenderById);
    router.delete('/', deleteGenderById);

module.exports = router;




