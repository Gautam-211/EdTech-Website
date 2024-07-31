import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='absolute w-[100vw] h-[100vh] left-0 top-0 z-50 flex items-center justify-center text-white
            bg-richblack-900 bg-opacity-10 backdrop-blur-sm '>
        <div className={`w-[80%] sm:w-[50%] md:w-[30%] bg-richblack-800 px-8 py-10 rounded-lg flex flex-col items-center
        border-[1px] border-richblack-700 gap-y-3 `} >
            <p className='text-2xl font-semibold'>
                {modalData.text1}
            </p>
            <p className='text-lg text-richblack-300'>
                {modalData.text2}
            </p>
            <div className='mt-6 flex items-center gap-x-8'>
                <IconBtn onclick={modalData?.btn1Handler}
                         text={modalData?.btn1Text}
                />

                <button onClick={modalData?.btn2Handler}
                className='bg-richblack-500 px-3 py-2 rounded-lg hover:bg-richblack-600 transition-all duration-200
                ease-linear'>
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal