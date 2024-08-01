const User = require("../models/User");

exports.addCourse = async(req,res) => {
    try {
        const {courseId,userId} = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId,{
            $push: {courses:courseId}
        },{new:true});

        return res.status(200).json({
            success:true,
            data:updatedUser
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}