
const { Router } = require('express');
const { 
    getRoomType,
    getAllRoomType, 
    getRoomTypeById,
	postRoomType,
	putRoomTypeById,
	deleteRoomTypeById
} = require('../Controllers/roomtype.controller');


const router = Router();

    router.get('/', getRoomType);
    router.get('/all', getAllRoomType);
    router.get('/:id', getRoomTypeById);
    router.post('/', postRoomType);
    router.put('/', putRoomTypeById);
    router.delete('/', deleteRoomTypeById);

module.exports = router;