
const { Router } = require('express');
const { 
    getRoomType,
    getAllRoomType
} = require('../Controllers/RoomType.controller');


const router = Router();

    router.get('/', getRoomType);
    router.post('/action', getAllRoomType);

module.exports = router;