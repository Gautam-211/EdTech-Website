const Category = require("../models/Category");

//create Tag , only accessible to the Admin

exports.createCategory = async(req,res) => {
    try {
        //fetch data
        const {name, description} = req.body;

        const existingCategory = await Category.findOne({name});
        if (existingCategory){
            return res.status(400).json({
                success:false,
                message:"A Category already exists with this name"
            })
        }

        //validation of data
        if (!name || !description){
            return res.status(403).json({
                success:false,
                message:"Fill the required fields"
            })
        }

        //create entry in DB
        const category = await Category.create({name,description});
        console.log(category);

        return res.status(200).json({
            success:true,
            message:"Category cerated successfully"
        })
        
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

//get all tags

exports.showAllCategories = async (req,res) => {
    try {
        const allCategories = await Category.find({}, {name:true, description:true} );

        return res.status(200).json({
            success:true,
            message:"All Categories fetched successfully",
            data:allCategories
        })
         
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


//category page details
exports.categoryPageDetails = async(req,res) => {
    try {
        //get catgory id
        const {categoryId} = req.body;

        //get courses corresponding to the category ID
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:true,
                message:"category not found"
            })
        }

        //get courses for different categories
        const differentCategories = await Category.find({
                                        _id : {$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();

        //get top selling courses
        const topSellingCourses = await Course.aggregate([
            {
              $project: {
                courseName: true,
                courseDescription: true,
                instructor: true,
                price:true,
                thumbnail:true,
                buyers: { $size: "$studentsEnrolled" }
              }
            },
            {
              $sort: { buyers: -1 }
            }
          ]);

        //response
        return res.status(200).json({
            success:true,
            message:"Required category data fetched successfully",
            data:{
                selectedCategory,
                differentCategories,
                topSellingCourses
            }
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