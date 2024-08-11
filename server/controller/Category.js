const Category = require("../models/Category");
const Course = require("../models/Course")

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

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
        const allCategories = await Category.find({});

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
// exports.categoryPageDetails = async(req,res) => {
//     try {
//         //get catgory id
//         const {categoryId} = req.body;

//         //get courses corresponding to the category ID
//         const selectedCategory = await Category.findById(categoryId)
//                                                         .populate({
//                                                             path:"courses",
//                                                             match:{status:"Published"},
//                                                             populate:{
//                                                                 path:"ratingAndReviews"
//                                                             }
//                                                         }).exec();
//         //validation
//         if(!selectedCategory){
//             return res.status(404).json({
//                 success:true,
//                 message:"category not found"
//             })
//         }

//         if(selectedCategory.courses.length === 0){
//             return res.status(400).json({
//                 success:false,
//                 message:"No courses exists in this category"
//             })
//         }



//         //get courses for different categories
//         const differentCategories = await Category.find({
//                                         _id : {$ne: categoryId},
//                                     })
                                    
//         let differentCategory = await Category.findById(
//             differentCategories[getRandomInt(differentCategories.length)]._id
//         ).populate({
//             path:"courses",
//             match:{status:"Published"},
//             populate:{
//                 path:"ratingAndReviews"
//             }
//         }).exec();

//         //get top selling courses
//         // let topSellingCourses = await Course.aggregate([
//         //     {
//         //       $project: {
//         //         courseName: true,
//         //         courseDescription: true,
//         //         instructor: true,
//         //         price:true,
//         //         thumbnail:true,
//         //         buyers: { $size: "$studentsEnrolled" }
//         //       }
//         //     },
//         //     {
//         //       $sort: { buyers: -1 },
//         //       match:{status:"Published"},
//         //     }
//         //   ]);

//         const allCategories = await Category.find()
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           populate: {
//             path: "instructor",
//         },
//         })
//         .exec()
//         const allCourses = allCategories.flatMap((category) => category.courses)
//         const mostSellingCourses = allCourses
//             .sort((a, b) => b.sold - a.sold)
//             .slice(0, 10)


//         //response
//         return res.status(200).json({
//             success:true,
//             message:"Required category data fetched successfully",
//             data:{
//                 selectedCategory,
//                 differentCategory,
//                 mostSellingCourses
//             }
//         })
        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:"Internal server error",
//             error:error.message
//         })
//     }
// }

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()

        // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()

      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }