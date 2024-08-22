const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");


exports.updateCourseProgress = async(req,res) => {
    try {
        const {courseId, subSectionId} = req.body;
        const userId = req.user.id;

        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Sub section does not exist"
            })
        }
        
        //check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId
        });

        if(!courseProgress){
            return res.status(400).json({
                success:false,
                message:"Course progress does not exist"
            })
        }

        if(courseProgress?.completedVideos?.includes(subSectionId)){
            return res.status(400).json({
                success:false,
                message:"Lecture already marked as completed",
            })
        }

        //push the lecture i.e subScetion Id into the course progress
        courseProgress.completedVideos.push(subSectionId);

        await courseProgress.save();
        
        return res.status(200).json({
            success:true,
            message:"Lecture marked as completed",
            data:courseProgress
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}