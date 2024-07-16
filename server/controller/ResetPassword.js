const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
    try {
        const {email} = req.body;

        //check if user exits
        const user = await User.findOne({email});
        if (!user){
            return res.status(403).json({
                success:false,
                message:"The user does not exist with this email"
            })
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex");

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email},
            {token, resetPasswordExpires : Date.now() + 5*60*1000},
        {new:true})

        //create url
        const url = `http://localhost:3000/update-password/${token}`

        //send mail containing url
        try {
            await mailSender(email,"Password reset link",`click on this link to reset your password : ${url}`);

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Due to a server error reset password link mail cannot be sent'
            })
        }

        //send response
        return res.status(200).json({
            success:true,
            message:"Reset password mail was sent successfully"
        })

        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:error.message
        })
    }
}

//reset password

exports.resetPassword = async(req,res) => {
    try {
        //fetch data
        const {password,confirmPassword,token} = req.body; //token is put into the request body from frontend using params from url

        //perform validations
        if (password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"The password and confirm password does not match"
            })
        }

        //fetch user entry using token and check the resetPasswordExpires field in user 
        const user = await User.findOne({token});

        if (!user){
            return re.status(401).json({
                success:false,
                message:"Invalid link"
            })
        }

        if (Date.now() > user.resetPasswordExpires){
            return res.status(403).json({
                success:false,
                message:"The Reset password link has expired , go to reset password to generate another link"
            })
        }

        //if not expired then hash the password and then update the new password in the user
        const hashedPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate({token},
                {password:hashedPassword}
        ) 
        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset done successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:"false",
            message:"Internal server error"
        })
    }
    
}