
const { Router } = require('express');
const { getReport, searchReport, getBookByIdFromTo} = 
require('../Controllers/report.controller');


const router = Router();

    router.get('/', getReport);
    router.get('/:checkdatefrom/:checkdateto', searchReport);
    router.get('/page/:id/:rowinpage', getBookByIdFromTo);
    

module.exports = router;