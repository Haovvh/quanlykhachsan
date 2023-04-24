
const { Router } = require('express');
const { getRoom, getAllRoom, getRoomById, postRoom, putRoomById, deleteRoomById} = 
require('../Controllers/room.controller');


const router = Router();

    router.get('/', getRoom);
    router.get('/all', getAllRoom);
    router.get('/:id', getRoomById);
    router.post('/', postRoom);
    router.put('/', putRoomById);
    router.delete('/', deleteRoomById);
    

module.exports = router;