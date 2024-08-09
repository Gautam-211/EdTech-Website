import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../../../slices/courseSlice';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);
    const dispatch = useDispatch();

    const steps = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:'Course Builder'
        },
        {
            id:3,
            title:"Publish"
        }
    ]

  return (
    <div className='w-full flex flex-col items-center'>
        <div className='flex items-center justify-center md:pr-12 w-full'>
            {
                steps.map((item,id) => (
                    <div className='flex items-center' key={id}>
                        <div className={`${step>=item.id? "bg-yellow-900 border-yellow-50 text-yellow-50" : 
                        "border-richblack-700 bg-richblack-800 text-richblack-300"} rounded-full aspect-square
                        w-[3rem] border-[3px] flex items-center justify-center text-lg`}>
                            {
                                step>item.id ? <FaCheck/> : item.id
                            }
                        </div>
                        {
                            item.id !== steps.length && (
                                <div className={`w-[5rem] sm:w-[10rem] h-[0.1px] border-dashed border-spacing-12 border-b-2
                                    ${step>item.id?"border-yellow-300":"border-richblack-500"}`}></div>
                            )
                        }

                    </div>
                ))
            }
        </div>
        
        <div className='grid grid-cols-3 gap-x-[10px] sm:gap-x-[80px] lg:gap-x-[80px] md:-translate-x-6'>
            {
                steps.map((item,id) => (
                    <div key={id} className={`${step>=item.id?"text-yellow-50":"text-richblack-200"} text-center`}>
                        {item.title}
                    </div>
                ))
            }
        </div>
        

        {
            step===1 && <CourseInformationForm/>
        }
        {
            step===2 && <CourseBuilderForm/>
        }
        {
            step===3 && <PublishCourse/>
        }

    </div>
  )
}

export default RenderSteps