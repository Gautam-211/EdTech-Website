const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//create sunsection

exports.createSubSection = async(req,res) => {
    try {
        //get the data
        const {title, description, sectionId} = req.body;
        const video = req.files.videoFile;

        //perform validation
        if (!title || !description || !sectionId){
            return res.status(403).json({
                success:false,
                message:"Missing required fields"
            })
        }

        //upload video to cloudinary
        const videoFile = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const videoUrl = videoFile.secure_url;
        const timeDuration = videoFile.duration;

        //create subsection
        const newSubSection = await SubSection.create({title,timeDuration,description,videoUrl});

        //update Section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {$push: {subSection:newSubSection._id}},
            {new:true}
        ).populate("subSection").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Subsection created succesfully",
            updatedSection
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

//update SubSection
exports.updateSubSection = async(req,res) => {
    try {
       //get the data
       const {title, timeDuration, description, subSectionId} = req.body;
       const video = req.files.videoFile;

       const subSection = await SubSection.findById(subSectionId);

       if(!subSection){
            return res.status(400).json({
                success:false,
                message:"Sub Section does not exist"
            })
       }

       console.log(title);
       if (title !== undefined){
            subSection.title = title
       }
       if (timeDuration && timeDuration!==undefined){
        subSection.timeDuration = timeDuration
       }
       if (description && description!==undefined){
        subSection.description = description
       }
       if (video && video!==undefined){
        //upload video to cloudinary
        const videoFile = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        subSection.videoUrl = videoFile.secure_url;
       }

       

       //create subsection
       const updatedSubSection = await subSection.save();

       //return response
       return res.status(200).json({
           success:true,
           message:"Subsection updated succesfully",
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

//deleteSubSection
exports.deleteSubSection = async(req,res) => {
    try {
        const {subSectionId, sectionId} = req.body;

        // const subSection = await SubSection.findById(subSectionId);
        // if(!subSection){
        //     return res.status(400).json({
        //         success:false,
        //         message:'Sub Section does not exist'
        //     })
        // }

        //delete the subsection
        await SubSection.findByIdAndDelete(subSectionId);

        //delete subsection from the Section
        const section = await Section.findByIdAndUpdate(
            sectionId,
            {$pull: {subSection:subSectionId}},
            {new:true}
        )

        // if(!section){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Section notnn found with the corresponding section id"
        //     })
        // }

        //return response
        return res.status(200).json({
            success:true,
            message:"Subsection deleted succesfully",
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