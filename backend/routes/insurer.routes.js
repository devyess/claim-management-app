const express=require('express');
const router=express.Router();
const {insurerRegister,insurerLogin,insurerLogout,showClaims,editClaims,getClaimById,downloadClaimFile}=require('../controllers/insurer.controllers.js');
const authenticateUser=require('../middlewares/authentication.js');
const claims = require('../models/claims.models');
router.post('/register',insurerRegister);
router.post('/login',insurerLogin);
router.post('/logout',authenticateUser,insurerLogout);
router.get('/claims',authenticateUser,showClaims);
router.put('/claims/:id',authenticateUser,editClaims);
router.get('/claims/:id', authenticateUser, getClaimById);
router.get('/claims/:id/download', authenticateUser, downloadClaimFile);

module.exports=router;