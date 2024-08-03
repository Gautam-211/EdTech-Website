import React from 'react'

const ChipInput = ({register,errors}) => {
  return (
    <label className='w-full flex flex-col gap-y-1'>
            <p className='text-start'>Tags <sup className='text-pink-100'>*</sup></p>
            <input 
                className='bg-richblack-700 w-full rounded-lg px-3 py-2' style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                id='courseTitle'
                {...register("courseTitle",{required:true})}
                placeholder='Enter course title' />

            {
                errors.courseTitle && (
                    <span className='text-pink-200 text-sm text-start'>Course title is required</span>
                )
            }
    </label>
  )
}

export default ChipInput