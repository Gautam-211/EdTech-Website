const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const validator = require("validator");
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailSender");

//send OTP for signup
exports.sendOTP = async(req,res) => {
    try {
        const {email} = req.body;
        
        if(!email){
            res.status(401).json({
                success:false,
                message:"Email not provided"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(401).json({
                success:false,
                message:"Invalid email Address"
            });
        }

        //check if user already exists
        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(401).json({
                success:false,
                message:"User already exists with this email"
            })
        }

        //generate OTP
        do {
            var otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            var existingOtp = await OTP.findOne({otp})     //check if otp is unique otp
        } while (existingOtp);
        
        const otpPayload = {otp,email};
        //create an entry in DB  for OTP

        const generatedOTP = await OTP.create(otpPayload);

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
        })

        
    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error in server while generating OTP"
        })
    }
}


//signUp

exports.signUp = async(req,res) => {
    try {
        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"Please fill all the required fields first"
            })
        }

        //Check whether the password and confirm password field match or not 
        if (password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirmPassword does not match each other"
            })
        }

        //check whether the entered email is valid or not
        if (!validator.isEmail(email)) {
            return res.status(401).json({
                success:false,
                message:"Invalid email Address"
            });
        }

        //check whether user already exists
        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(401).json({
                success:false,
                message:"User already exists with this email"
            })
        }

        //find most recent otp entry corresponding to the email
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if (recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found in the DB"
            })
        }

        if (otp !== recentOtp[0].otp.toString()){
            return res.status(400).json({
                success:false,
                message:"Wrong OTP"
            })
        }

        //otp is correct , now hash the password to store it
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a DB entry for the additional details
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber
        })

        //create entry in DB
        const user = await User.create({
            firstName,lastName,email,contactNumber,accountType,
            password:hashedPassword,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"Account was created successfully",
            user
        })
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

//login

exports.login = async(req,res) => {
    try {
        //get data from otp
        const {email,password} = req.body;

        //perform validations
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Fill all the details first"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(401).json({
                success:false,
                message:"Invalid email Address"
            });
        }

        //check if user does not exist in the database
        const existingUser = await User.findOne({email}).populate("additionalDetails");

        if (!existingUser){
            return res.status(401).json({
                success:false,
                message:"User does not exits , go to signUp page"
            })
        }
        
        //check password and generate a JWT token
        if (await bcrypt.compare( password, existingUser.password)){

            const payload = {
                email:existingUser.email,
                id:existingUser._id,
                accountType:existingUser.accountType
            }

            const token = JWT.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h"
            })

            existingUser.token = token;
            existingUser.password = undefined;

            //set options for cookie
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }

            //create a cookie
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"Login was scuccessfull",
                user:existingUser,
                token
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


//changePassword
exports.changePassword = async(req,res) => {
    try {
        //fetch data from the body
        const {oldPassword,newPassword,confirmNewPassword} = req.body;
        const userId = req.user.id

        //perform validation on data

        if (!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(403).json({
                success:false,
                message:"Fill all the required fields"
            })
        }

        if (newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"New passsword and confirm New password does not match"
            })
        }

        //find the user 
        const user = await User.findById(userId);

        if (await bcrypt.compare(oldPassword, user.password)){
            const updatedUser = await User.findByIdAndUpdate(userId,{password:newPassword})

            //send confirmation  email
            try {
                const emailResponse = await mailSender(updatedUser.email,"Password change",'Your password was changed successfully')
             
            } catch (error) {
                console.log("Error in sending the email");
            }

            return res.status(200).json({
                success:true,
                message:"Password changed successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"The old password does not match with the password corresponding to your account"
            })
        }
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}