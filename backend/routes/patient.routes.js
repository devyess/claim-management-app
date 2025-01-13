const express=require('express');
const router=express.Router();
const {patientRegister,patientLogin,patientLogout,createClaim,showClaimStatus}=require('../controllers/patients.controllers.js');
const authenticateUser=require('../middlewares/authentication.js');
const multer = require('multer');
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
});
    
    const upload = multer({ storage });

router.post('/register',patientRegister);
router.post('/login',patientLogin);
router.post('/logout',authenticateUser,patientLogout);
router.post('/claim',authenticateUser,upload.single('claimFile'),createClaim);
router.get('/claimStatus',authenticateUser,showClaimStatus);

module.exports=router;