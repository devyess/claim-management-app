const mongoose = require("mongoose");

const claimSchema=new mongoose.Schema({
      patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
          },
      userName:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true
      },
      claimDescription:{
            type:String,
            required:true
      },
      claimAmount:{
            type:String,
            required:true
      },
      claimStatus:{
            type:String,
            enum: ["Pending", "Approved", "Rejected"],
            required:true
      },
      submissionDate:{
            type:Date
      },
      approvedDate:{
            type:Date  
      },
      approvedAmount:{
            type:String
      },
      insurerComments:{
            type:String
      },
      claimFile:{
            type:String
      }
})

const claims=mongoose.model("Claim",claimSchema);
module.exports=claims;