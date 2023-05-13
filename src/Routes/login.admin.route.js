const { Router } = require('express');
const { login, registerStaff, getlogin } = require('../Controllers/login.controller');


const router = Router();
    router.get('/login',getlogin)
    router.post('/login', login);
    router.post('/register', registerStaff);

module.exports = router;
