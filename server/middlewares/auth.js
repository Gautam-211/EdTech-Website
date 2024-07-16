const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async(req,res,next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")

        if (!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
            
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }

        next();
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

//isStudent
exports.isStudent = async(req,res,next) => {
    try {
        if (req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"Protected route for students only"
            })
        }
        next();
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

//isInstructor
exports.isInstructor = async(req,res,next) => {
    try {
        if (req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"Protected route for Instructors only"
            })
        }
        next();
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

//isAdmin
exports.isAdmin = async(req,res,next) => {
    try {
        if (req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"Protected route for Admins only"
            })
        }
        next();
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}
