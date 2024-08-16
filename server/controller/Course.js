const Course = require("../models/Course");
const Category = require('../models/Category');
const User = require("../models/User");
const SubSection = require("../models/SubSection")
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();

//create course, only for instructor
exports.createCourse = async(req,res) => {
    try {
        //fetch course details from request body
        let {courseName, courseDescription, whatYouWillLearn, price, category,status,tag:_tag, instructions:_instructions} = req.body;
        const thumbnail = req.files.thumbnailImage;

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        //perform validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag.length 
                || !instructions.length
            ){
            return res.status(403).json({
                success:false,
                message:"Fill all the required details"
            })
        }

        //status
        if(!status || status===undefined){
            status = "Draft"
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
            tag,status, instructions
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
                                                    model:"User",
                                                    populate: {
                                                        path: "additionalDetails",
                                                        model:"Profile"
                                                    },
                                                })
                                                .populate("category")
                                                .populate("ratingAndReviews")
                                                .populate({
                                                    path: "courseContent",
                                                    model:"Section",
                                                    populate: {
                                                        path: "subSection",
                                                        model:"SubSection"
                                                    },
                                                    })
                                                .exec();

        if (!course){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }

        let totalDurationInSeconds = 0
        course.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:{courseDetails: course , totalDuration}
        })
        
    } catch (error) {
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server "
        })
    }
}


exports.getFullCourseDetails = async(req,res) => {
    try {
        const {courseId} = req.body;
        const userId = req.user.id;

        const course = await Course.findById(courseId).populate({
                                                            path:"instructor",
                                                            populate:{
                                                                path:"additionalDetails"
                                                            }
                                                        }).populate('category').populate("ratingAndReviews")
                                                        .populate({
                                                            path:"courseContent",
                                                            populate:{
                                                                path:"subSection"
                                                            }
                                                        }).exec();

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
            })

        if(!course){
            return res.status(400).json({
                success:false,
                message:"Course does not exist"
            })
        }

        let totalDurationInSeconds = 0
        course.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails:course,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.editCourse = async(req,res) => {
    try {
        const {courseId} = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(400).json({
                success:false,
                message:"Course does not exist"
            })
        }

        if(req.files){
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url
        }

        for (const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key==="tag" || key==="instructions"){
                    course[key] = JSON.parse(updates[key]);
                }
                else{
                    course[key] = updates[key]
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findOne({
            _id: courseId,
          })
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
            .exec()
         
        return res.status(200).json({
            success:true,
            message:"Course udpated successfully",
            data:updatedCourse
        })

    } catch (error) {
        
    }
}

exports.getInstructorCourses = async(req,res) => {
    try {
        const userId = req.user.id;

        const instructor = await User.findById(userId);
        if(!instructor){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }

        const courses = await Course.find({instructor:userId}).sort({createdAt : -1});

        return res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            data:courses
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body;
  
      // Find the course
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ 
            message: "Course not found" 
        })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
            await SubSection.deleteMany({_id: {$in: section.subSection}});        
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }

      //remove the course from the categoro
      await Category.findByIdAndUpdate(course.category,{
        $pull:{courses:course._id}
      })
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }