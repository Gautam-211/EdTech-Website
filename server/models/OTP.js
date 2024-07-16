const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
        email:{
            type:String,
            required:true
        },
        otp:{
            type:Number,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:5*60
        }
})

//  a functiom to send email verification

async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification from StudyNotion",emailTemplate(otp));
        
    } catch (error) {
        console.log("Error occurred while sending mails : ",error);

    }
}

//using PRE middleware to send verification email bcoz email is send before the entry is created

OTPSchema.pre("save",async function(next){

    
    await sendVerificationEmail(this.email,this.otp);
    
    next();
})

module.exports = mongoose.model("OTP",OTPSchema)