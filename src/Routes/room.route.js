
const { Router } = require('express');
const { getRoom, getAllRoom, getRoomByIdFromTo, getRoomById, postRoom, putRoomById, deleteRoomById, searchRoom} = 
require('../Controllers/room.controller');
const {validateToken} = require('../Helpers/validateToken.helper');

const router = Router();

    router.get('/', getRoom);
    router.get('/all',validateToken, getAllRoom);
    router.get('/:id',validateToken, getRoomById);
    router.get('/page/:id/:rowinpage',validateToken, getRoomByIdFromTo);
    
    router.post('/search',validateToken, searchRoom);
    router.post('/',validateToken, postRoom);
    router.put('/',validateToken, putRoomById);
    router.delete('/',validateToken, deleteRoomById);
    

module.exports = router;