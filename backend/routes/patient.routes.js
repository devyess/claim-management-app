const express=require('express');
const router=express.Router();
const {patientRegister,patientLogin,patientLogout,createClaim,showClaimStatus}=require('../controllers/patients.controllers.js');
const authenticateUser=require('../middlewares/authentication.js');
const upload = require('../services/fileUpload.js');
router.post('/register',patientRegister);
router.post('/login',patientLogin);
router.post('/logout',authenticateUser,patientLogout);
router.post('/claim',authenticateUser,upload.single('claimFile'),createClaim);
router.get('/claimStatus',authenticateUser,showClaimStatus);

module.exports=router;