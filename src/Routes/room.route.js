
const { Router } = require('express');
const { getRoom, getAllRoom} = require('../Controllers/room.controller');


const router = Router();

    router.get('/', getRoom);
    router.post('/action', getAllRoom);
    

module.exports = router;