
const { Router } = require('express');
const { 
    getRoomService,
    getAllRoomService,
    getRoomServiceById,
    postRoomService,
    putRoomServiceById,
    deleteRoomServiceById
} = require('../Controllers/RoomService.controller');


const router = Router();

    router.get('/', getRoomService);
    router.get('/all', getAllRoomService);
    router.get('/:id', getRoomServiceById);    
    router.post('/', postRoomService);
    router.put('/', putRoomServiceById);
    router.delete('/', deleteRoomServiceById);

module.exports = router;