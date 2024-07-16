const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

//create a section

exports.createSection = async(req,res) => {
    try {
        //fetchData
        const {sectionName, courseId} = req.body;

        //perform validation
        if (!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Give the name of the Section"
            })
        }

        //create section
        const newSection = await Section.create({sectionName});

        //add the section to the course content of the course schema
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {$push : {courseContent:newSection._id}},
            {new : true}
        ).populate({
            path: 'courseContent',
            model:"Section",
            populate: {
              path: 'subSection',
              model:"SubSection"
            }
          })

          return res.status(200).json({
            success:true,
            message:"Section was created successfully",
            updatedCourse,
            data:newSection
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

//update section handler

exports.updateSection = async(req,res) => {
    try {
        //get the data to be updated
        const {sectionName, sectionId} = req.body;

        if (!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing data"
            })
        }

        //update the Section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new : true}
        )

        return res.status(200).json({
            success:true,
            message:"Section data updated successfully",
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal sever error",
            error:error.message
        })
    }
}


//delete a section
exports.deleteSection = async(req,res) => {
    try {
        const {sectionId, courseId} = req.body;

        const section = await Section.findById(sectionId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

        //have to delete the Object Id of the Section from the courseContent in the Course schema
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
        //have to delete the all the subsection that were in this Section from the Subsection schema
        await SubSection.deleteMany({_id: {$in: section.subSection}});        

        //now delete the section
        await Section.findByIdAndDelete(sectionId);

        //return response
        res.status(200).json({
            success:true,
            message:"Section deleted successfully"
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