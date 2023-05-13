
const { Router } = require('express');
const { 
    getRoomType,
    getAllRoomType, 
    getRoomTypeById,
	postRoomType,
	putRoomTypeById,
	deleteRoomTypeById,
    searchRoomType,
    getRoomTypeByIdFromTo
} = require('../Controllers/roomtype.controller');


const {validateToken} = require('../Helpers/validateToken.helper')
const router = Router();

    router.get('/',getRoomType);
    router.get('/all', validateToken, getAllRoomType);
    router.get('/:id',validateToken, getRoomTypeById);
    router.get('/page/:id/:rowinpage',validateToken, getRoomTypeByIdFromTo);
    router.post('/',validateToken, postRoomType);
    router.post('/search',validateToken, searchRoomType);
    router.put('/',validateToken, putRoomTypeById);
    router.delete('/',validateToken, deleteRoomTypeById);

module.exports = router;