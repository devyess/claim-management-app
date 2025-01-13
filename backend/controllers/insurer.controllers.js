const insurers=require("../models/insurer.models");
const bcrypt = require("bcrypt");
const hashPassword = require("../services/passwordHash.js");
const registerValidation = require("../validations/register.validation.js");
const loginValidation = require("../validations/login.validation.js");
const generateToken = require("../services/generateToken.js");
const redisClient = require("../config/redis.config");
const claims = require("../models/claims.models");
const fs = require('fs');
const insurerRegister = async (req, res) => {
      const validatedData = registerValidation.safeParse(req.body);
      if (!validatedData.success) {
            console.log(validatedData.error);
            return res.status(403).json(validatedData.error);
      }
      const {userName,email,password}=req.body;
      const checkEmail = await insurers.findOne({ email: email });
      if (checkEmail) {
            return res.status(402).json({
                  message: "Insurer already exists",
            });
      }
      const hashedPassword = await hashPassword(password);
      const insurer = new insurers({
            userName: userName,
            email: email,
            password: hashedPassword,
      });
      try {
            await insurer.save();
            res.status(201).json({
                  message: "Insurer registered successfully",
                  insurer,
            });
      } catch (err) {
            res.status(500).json({
                  message: err.message,
            });
      }
};

const insurerLogin = async (req, res) => {
      try {
            const validatedData = loginValidation.safeParse(req.body);
            if (validatedData.error) {
                  return res.status(400).json(validatedData.error);
            }
            const insurer = await insurers.findOne({
                  email: validatedData.data.email,
            });
            if (!insurer) {
                  return res.status(403).json({
                        message: "Insurer not found",
                  });
            }

            const isMatch = await bcrypt.compare(
                  validatedData.data.password,
                  insurer.password
            );
            if (!isMatch) {
                  return res.status(400).json({
                        message: "Invalid credentials",
                  });
            }
            const token = generateToken(validatedData.data.email);
            res.status(200).json({
                  message: "Insurer logged in successfully",
                  token: token,
            });
      } catch (err) {
            res.status(500).json({
                  message: err.message,
            });
      }
};

const insurerLogout = async (req, res) => {
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

const showClaims = async (req, res) => {
      try {
            const claim = await claims.find({});
            res.status(200).json({
                  message: "All claims",
                  claim,
            });
      } catch (err) {
            res.status(500).json({
                  message: err.message,
            });
      }
};

const editClaims = async (req, res) => {
      try {
        const { claimStatus, approvedAmount, insurerComments } = req.body;
    
        const updatedClaim = await claims.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              claimStatus: claimStatus,
              approvedAmount: approvedAmount,
              insurerComments: insurerComments,
            },
          },
          { new: true, runValidators: true }
        );
    
        if (!updatedClaim) {
          return res.status(400).json({
            message: "Claim not found",
          });
        }
    
        res.status(200).json({
          message: "Claim updated successfully",
          claim: updatedClaim,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
    };

    const downloadClaimFile = async (req, res) => {
      try {
        const { id } = req.params;
        const claim = await claims.findById(id);
    
        if (!claim) {
          return res.status(404).json({ message: 'Claim not found' });
        }
    
        if (!claim.claimFile) {
          return res.status(404).json({ message: 'No file attached to this claim' });
        }
    
        // Check if file exists on filesystem
        if (!fs.existsSync(claim.claimFile)) {
          return res.status(404).json({ message: 'File not found' });
        }
    
        res.download(claim.claimFile, `claim-${id}-documents.pdf`, (err) => {
          if (err) {
            res.status(500).json({ message: 'Error downloading file' });
          }
        });
    
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    };


    const getClaimById = async (req, res) => {
      try {
        const claim = await claims.findById(req.params.id).populate('claimFile');
        if (!claim) {
          return res.status(404).json({ message: 'Claim not found' });
        }
        res.status(200).json(claim);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };

module.exports = {
      insurerRegister,
      insurerLogin,
      insurerLogout,
      showClaims,
      editClaims,
      getClaimById,
      downloadClaimFile
};