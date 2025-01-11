const express=require('express');
const router=express.Router();
const {insurerRegister,insurerLogin,insurerLogout,showClaims,editClaims,getClaimById}=require('../controllers/insurer.controllers.js');
const authenticateUser=require('../middlewares/authentication.js');

router.post('/register',insurerRegister);
router.post('/login',insurerLogin);
router.post('/logout',authenticateUser,insurerLogout);
router.get('/claims',authenticateUser,showClaims);
router.put('/claims/:id',authenticateUser,editClaims);
router.get('/claims/:id', authenticateUser, getClaimById);

module.exports=router;