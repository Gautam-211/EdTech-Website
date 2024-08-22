const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

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

        const updatedUser = await User.findById(id).populate("additionalDetails").exec();

        updatedUser.password = undefined;

        return res.status(200).json({
            success:true,
            message:"Profile details updated successfully",
            updatedUserDetails: updatedUser
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

        // also if the user id student then we might have to delete the user from studentsEnrolled in the course schema
        if (userDetails.accountType === "Student"){
            const enrolledCourses = userDetails.courses;

            enrolledCourses.forEach( async (enrolledCourse) => {
                await Course.findByIdAndUpdate(
                    enrolledCourse,
                    {$pull: {studentsEnrolled:userDetails._id}}
                )
            })

            const courseProgress = userDetails.courseProgress;
            courseProgress.forEach(async(progress) => {
                await CourseProgress.findByIdAndDelete(progress)
            })
        }

        //delete user
        const deletedUser = await User.findByIdAndDelete(userDetails._id);

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

        updatedUser.password = undefined;

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
        let userDetails = await User.findById(userId).populate({
            path:"courses",
            model:"Course",
            populate:{
                path:"courseContent",
                model:"Section",
                populate:{
                    path:"subSection",
                    model:"SubSection"
                }
            }
        }).exec();

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find user details"
            })
        }

        userDetails = userDetails.toObject();
        var subSectionLength = 0;

        for (var i=0; i<userDetails.courses.length; i++){
            let totalDurationInSeconds = 0 ; 
            subSectionLength = 0 ;

            let courseProgressCount = await CourseProgress.findOne({
                courseID:userDetails.courses[i]._id,
                userId
            })
            courseProgressCount = courseProgressCount?.completedVideos?.length;

            for(var j=0; j<userDetails.courses[i].courseContent.length; j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration) , 0
                )
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length;
                
                if(subSectionLength === 0){
                    userDetails.courses[i].progressPercentage = 100;
                }
                else{
                    const multiplier = Math.pow(10,2);
                    userDetails.courses[i].progressPercentage = Math.round((courseProgressCount/subSectionLength)*100*multiplier)/multiplier;
                }
            }
        }

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
    try {
        const userId = req.user.id;
        const courseDetails = await Course.find({instructor:userId});

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            const courseDataWithStats = {
                _id:course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats;
        })

        return res.status(200).json({
            success:true,
            message:"Instructor dashboard data fetched successfully",
            data:courseData
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}