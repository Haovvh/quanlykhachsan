const { Router } = require('express');
const { login, register, getlogin } = require('../Controllers/login.controller');


const router = Router();
    router.get('/',getlogin)
    router.post('/', login);
    router.post('/', register);

module.exports = router;
