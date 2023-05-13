const { Router } = require('express');
const { login,  getlogin, changepass } = require('../Controllers/loginstaff.controller');


const router = Router();
    router.get('/login', getlogin)
    router.post('/login', login);
    router.put('/changepass', changepass);

module.exports = router;
