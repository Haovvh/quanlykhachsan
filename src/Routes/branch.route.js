
const { Router } = require('express');
const { 
    getBranch,
    getAllBranch, 
    getBranchById,
	postBranch,
	putBranchById,
	deleteBranchById,
    searchBranch,
    getBranchByIdFromTo
} = require('../Controllers/branch.controller');


const {validateToken} = require('../Helpers/validateToken.helper')
const router = Router();

    router.get('/',getBranch);
    router.get('/all', validateToken, getAllBranch);
    router.get('/:id',validateToken, getBranchById);
    router.get('/page/:id/:rowinpage',validateToken, getBranchByIdFromTo);
    router.post('/',validateToken, postBranch);
    router.post('/search',validateToken, searchBranch);
    router.put('/',validateToken, putBranchById);
    router.delete('/',validateToken, deleteBranchById);

module.exports = router;