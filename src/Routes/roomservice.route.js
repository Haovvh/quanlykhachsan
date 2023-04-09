
const { Router } = require('express');
const { 
    getRoomService,
    getAllRoomService
} = require('../Controllers/RoomService.controller');


const router = Router();

    router.get('/', getRoomService);
    router.post('/action', getAllRoomService);

module.exports = router;