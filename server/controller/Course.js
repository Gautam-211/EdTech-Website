const Course = require("../models/Course");
const Category = require('../models/Category');
const User = require("../models/User");
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require("dotenv").config();

//create course, only for instructor
exports.createCourse = async(req,res) => {
    try {
        //fetch course details from request body
        let {courseName, courseDescription, whatYouWillLearn, price, category,status,tag:_tag, instructions:_instructions} = req.body;
        const thumbnail = req.files.thumbnailImage;

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        // const instructions = JSON.parse(_instructions)

        //perform validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag.length ){
            return res.status(403).json({
                success:false,
                message:"Fill all the required details"
            })
        }

        //get instructor 
        const userId = req.user.id;  //user details come in request from payload which was decoded in auth middleware
        const instructor = await User.findById(userId,{accountType:"Instructor"})

        if (!instructor){
            return res.status(403).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        if (!status || status === undefined) {
            status = "Draft"
        }

        //check if given category is valid or not
        const categoryDetails = await Category.findById(category);

        if (!categoryDetails){
            return res.status(400).json({
                success:false,
                message:"The category does not exist"
            })
        }

        //upload image to cloudinary and get it's url
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME ) ;

        //create an entry for the new course
        const newCourse = await Course.create({
            courseName, courseDescription,
            instructor:instructor._id ,
            whatYouWillLearn,
            price , category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            tag,status
        })

        //update the user i.e. Instructor
        const updatedUser = await User.findByIdAndUpdate(
            {_id:instructor._id},
            {$push : {courses : newCourse._id}},
            {new : true}
        )

        //update the catgeory i.e. add the course to the corresponding category
        const updatedCategory = await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {$push : {courses:newCourse._id}},
            {new : true}
        )

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse
        })
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}



//get all courses handler\

exports.getAllCourses = async(req,res) => {
    try {
        const courses = await Course.find({} , {courseName:true,
                                                courseDescription:true,
                                                instructor:true,
                                                price:true,
                                                thumbnail:true,
                                                ratingAndReviews:true,
                                                studentsEnrolled:true
        }).populate("instructor").populate("ratingAndReviews").populate("studentsEnrolled").exec();

        return res.status(200).json({
            success:true,
            message:"All courses fetched successfully",
            data:courses
        })
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
} 


//get course details for a specific courseId

exports.getCourseDetails = async(req,res) => {
    try {
        const {courseId} = req.body;

        const course = await Course.findById(courseId)
                                                .populate({
                                                    path: "instructor",
                                                    populate: {
                                                        path: "additionalDetails",
                                                    },
                                                })
                                                .populate("category")
                                                .populate("ratingAndReviews")
                                                .populate({
                                                    path: "courseContent",
                                                    populate: {
                                                        path: "subSection",
                                                    },
                                                    })
                                                .exec();

        if (!course){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:course
        })
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


exports.getFullCourseDetails = async(req,res) => {

}

exports.editCourse = async(req,res) => {

}

exports.getInstructorCourses = async(req,res) => {

}

exports.deleteCourse = async(req,res) => {

}