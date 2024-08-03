import React from 'react'
import RenderSteps from './RenderSteps';

const AddCourse = () => {
  return (
    <div className='text-white flex flex-col-reverse md:flex-row items-center md:items-start gap-x-4 gap-y-6'>
        <div className='flex flex-col items-center md:items-start w-full md:w-[60%]'>
            <h1 className='text-4xl mb-[3rem]'>Add Course</h1>
            <RenderSteps/>
        </div>

        <div className='flex flex-col gap-y-4 px-8 py-5 bg-richblack-800 rounded-lg w-[80%] md:w-[40%]'>
            <p className='text-xl font-semibold'>Course Upload Tips:</p>
            <ul className='list-disc pl-4 text-richblack-50'>
                <li>Set the course price option or make it free</li>
                <li>Standard size for the course thumbnail is 1024×576 </li>
                <li>Video Section controls the course overview video</li>
                <li>Course builder is where you create & organize a course</li>
                <li>Add topics in the course builder section to create lessons, quizzes and assignments.</li>
                <li>Information from the additional data section shows up on the course single page</li>
                <li>Make announcement to make any important update.</li>
                <li>Notes to all enrolled students at once</li>
            </ul>
        </div>

    </div>
  )
}

export default AddCourse;