
const { Router } = require('express');
const { 
    getRoomService,
    getAllRoomService,
    getRoomServiceById,
    postRoomService,
    putRoomServiceById,
    deleteRoomServiceById,
    searchRoomService,
    getRoomServiceByIdFromTo
} = require('../Controllers/RoomService.controller');
const {validateToken} = require('../Helpers/validateToken.helper');

const router = Router();

    router.get('/', getRoomService);
    router.get('/all',validateToken, getAllRoomService);
    router.get('/:id',validateToken, getRoomServiceById);   
    router.get('/page/:id/:rowinpage',validateToken, getRoomServiceByIdFromTo); 
    router.post('/search',validateToken, searchRoomService);
    router.post('/',validateToken, postRoomService);
    
    router.put('/',validateToken, putRoomServiceById);
    router.delete('/',validateToken, deleteRoomServiceById);

module.exports = router;