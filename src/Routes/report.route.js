
const { Router } = require('express');
const { getReport, searchReport, getBookByIdFromTo} = 
require('../Controllers/report.controller');
const {validateToken} = require('../Helpers/validateToken.helper');

const router = Router();

    router.get('/', getReport);
    router.get('/:checkdatefrom/:checkdateto',validateToken, searchReport);
    router.get('/page/:id/:rowinpage',validateToken, getBookByIdFromTo);
    

module.exports = router;