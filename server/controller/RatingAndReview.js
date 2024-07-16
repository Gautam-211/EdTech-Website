const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//create review

exports.createRating = async(req,res) => {
    try {

        //fetch data
        const {rating, review, courseId} = req.body;
        const userId = req.user.id;

        //perform valdiation
        if (!rating || !review || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing fields in request"
            })
        }

        
        const course = await Course.findById(courseId);

        if (!course){
            return res.status(400).json({
                success:false,
                message:"The course does not exist"
            })
        }
        
        //check if user is enrolled or not
        if (!course.studentsEnrolled.includes(userId)){
            return res.status(400).json({
                success:false,
                message:"You have to purchase the course first to give a review"
            })
        }

        //check if user has already reviewed
        const existingReview = await RatingAndReview.find({course:courseId , user:userId});

        if (existingReview){
            return res.status(400).json({
                success:false,
                message:"You have already reviewd to the course"
            })
        }

        //create review
        const ratingAndReview = await RatingAndReview.create({rating, review, course:courseId, user:userId});

        //update the course document
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
                                        $push:{
                                            ratingAndReviews:ratingAndReview._id
                                        }
                                    },{new:true})

        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully",
            ratingReview:ratingAndReview
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


//get average rating

exports.getAverageRating = async(req,res) => {
    try {
        //get courseId to find avg rating of
        const {courseId} = req.body;

        //Calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Schema.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg:"$rating"}
                }
            }
        ])

        if(result.length>0){
            return res.status(200).json({
                success:true,
                message:"average rating fetched successfully",
                averageRating: result[0].averageRating
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"No ratings given to the course yet",
                averageRating:0
            })
        }

        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


//get all rating and reviews
exports.getAllRating = async(req,res) => {
    try {
        const ratingAndReviews = await RatingAndReview.find()
                                                    .sort({rating: "desc"})
                                                    .populate({
                                                        path:"user",
                                                        select:"firstName lastName email image"
                                                    })
                                                    .populate({
                                                        path:"course",
                                                        select:"courseName"
                                                    })
                                                    .exec();

        return res.status(200).json({
            success:true,
            message:"All rating and reviews fetched succesfully",
            data:ratingAndReviews
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