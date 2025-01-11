const patients = require("../models/patients.models.js");
const claims = require("../models/claims.models.js");
const hashPassword = require("../services/passwordHash.js");
const generateToken = require("../services/generateToken.js");
const registerValidation = require("../validations/register.validation.js");
const loginValidation = require("../validations/login.validation.js");
const claimFormValidation=require("../validations/claimForm.validation.js");
const redisClient = require("../config/redis.config");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const File = require("../models/file.models");
const patientRegister = async (req, res) => {
      const validatedData = registerValidation.safeParse(req.body);
      if (!validatedData.success) {
            return res.status(400).json(validatedData.error);
      }
      const {userName,email,password}=req.body;
      const checkEmail = await patients.findOne({ email: email });
      if (checkEmail) {
            return res.status(400).json({
                  message: "Patient already exists",
            });
      }
      const hashedPassword = await hashPassword(password);
      const patient = new patients({
            userName: userName,
            email: email,
            password: hashedPassword,
      });
      try {
            await patient.save();
            res.status(201).json({
                  message: "Patient registered successfully",
                  patient,
            });
      } catch (err) {
            res.status(500).json({
                  message: err.message,
            });
      }
};

const patientLogin = async (req, res) => {
      try {
            const validatedData = loginValidation.safeParse(req.body);
            if (validatedData.error) {
                  return res.status(400).json(validatedData.error);
            }
            const patient = await patients.findOne({
                  email: validatedData.data.email,
            });
            if (!patient) {
                  return res.status(400).json({
                        message: "Patient not found",
                  });
            }

            const isMatch = await bcrypt.compare(
                  validatedData.data.password,
                  patient.password
            );
            if (!isMatch) {
                  return res.status(400).json({
                        message: "Invalid credentials",
                  });
            }
            const token = generateToken(validatedData.data.email);
            res.status(200).json({
                  message: "Patient logged in successfully",
                  token: token,
            });
      } catch (err) {
            res.status(500).json({
                  message: err.message,
            });
      }
};

const patientLogout = async (req, res) => {
      const token = req.header("Authorization").split(" ")[1];
      console.log(token);
      if (!token) {
            return res.status(401).json({
                  message: "Unauthorized",
            });
      }
      redisClient.set(token, "logout", "EX", 3600);
      return res.status(200).json({
            message: "Logged out successfully",
      });
};

const createClaim = async (req, res) => {
      try {
        const validatedData = claimFormValidation.safeParse(req.body);
        if (!validatedData.success) {
          return res.status(400).json(validatedData.error);
        }
    
        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patient = await patients.findOne({ email: decoded.email });
        if (!patient) {
          return res.status(404).json({ message: "Patient not found" });
        }
    
        const { userName, email, claimDescription, claimAmount } = req.body;
    
        // Handle file upload
        let fileData = null;
        if (req.file) {
          fileData = new File({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
          });
          await fileData.save();
        }
        console.log(fileData);
        const claim = new claims({
          patient: patient._id,
          userName,
          email,
          claimDescription,
          claimAmount,
          claimStatus: "Pending",
          submissionDate: new Date(),
          claimFile: fileData ? fileData._id : null, // Save the file reference
        });
    
        await claim.save();
    
        res.status(200).json({
          message: "Claim created successfully",
          claim,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
    };

const showClaimStatus=async(req,res)=>{
      try{
            const token=req.header("Authorization").split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const patient=await patients.findOne({email:decoded.email});
            const claim=await claims.find({patient:patient._id});
            if(!claim){
                  return res.status(404).json({
                        message:"Claim not found"
                  });
            }
            res.status(200).json({
                  message:"Claim found",
                  claim
            });
      }catch(err){      
            res.status(500).json({
                  message:err.message
            });
      }
}

module.exports = {
      patientRegister,
      patientLogin,
      patientLogout,
      createClaim,
      showClaimStatus
};
