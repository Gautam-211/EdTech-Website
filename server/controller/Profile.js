const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//empty profile document was already cerated during the signup process , so we just need to update it now 

exports.updateProfile = async(req,res) => {
    try {
        const {gender, dateOfBirth="", about="", contactNumber} = req.body;
        const id = req.user.id;

        if (!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"Properties missing"
            })
        }

        // find profile
        const user = await User.findById(id);
        const profileId = user.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile details updated successfully",
            profileDetails
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).josn({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


//deleteAccount
//we can also add a functionality so that when a user clicks on delete account the deleteion gets scehduled and is done after 5 days

exports.deleteAccount = async(req,res) => {
    try {
        //get user id
        const id = req.user.id;

        //check if the user id is valid
        const userDetails = await User.findById(id);
        
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            })
        }

        //get the profile object id from the user doc and delete the profile form the profile schema
        const deletedProfile = await Profile.findByIdAndDelete(userDetails.additionalDetails);

        //also if the user id student then we might have to delete the user from studentsEnrolled in the course schema
        // if (userDetails.accountType === "Student"){
        //     const enrolledCourses = userDetails.courses;

        //     enrolledCourses.forEach( async (enrolledCourse) => {
        //         await Course.findByIdAndUpdate(
        //             enrolledCourse,
        //             {$pull: {studentsEnrolled:userDetails._id}}
        //         )
        //     })
        // }

        //delete user
        const deletedUser = await User.findByIdAndDelete(userDetails._id);

        //might  have to delete courseprogress(only for students) from courseprogress schema
        

        //return response
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).josn({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


//get all user details

exports.getUserDetails = async(req,res) =>{
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").populate("courses").exec();
        
        return res.status(200).json({
            success:true,
            message:'user details fetched successfully',
            data:userDetails
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:error.message
        })
    }
}


exports.updateDisplayPicture = async(req,res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        if (!displayPicture){
            return res.status(400).json({
                success:false,
                message:"Please provide the display picture"
            })
        }

        const picture = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME,1000,1000);

        const updatedUser = await User.findByIdAndUpdate(userId,{
                                                image:picture.secure_url
                                        },{new:true})
                                        .populate("additionalDetails")
                                        .populate("courses")
                                        .exec();

        return res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
            data: updatedUser
        })

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


exports.getEnrolledCourses= async(req,res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("courses").exec();

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find user details"
            })
        }
        console.log(userDetails)

        console.log(userDetails.courses);

        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            data:userDetails.courses
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


exports.instructorDashboard = async(req,res) => {

}