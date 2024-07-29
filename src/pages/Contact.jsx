import React from 'react'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import { BiWorld } from 'react-icons/bi'
import { IoCall } from 'react-icons/io5'

const Contact = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto mt-16 flex flex-col lg:flex-row justify-between gap-y-6 pt-16
     items-center lg:items-start'>
        
        <div className='w-full lg:w-[40%] items-center lg:items-start h-fit flex flex-col gap-y-8 px-8 py-10 rounded-2xl bg-richblack-800 text-richblack-200 font-semibold'>

            <div className='flex flex-col gap-y-1'>
                <div className='flex gap-2 text-white items-center text-xl'>
                    <HiChatBubbleLeftRight />
                    Chat with Us
                </div>
                <div className='flex flex-col text-base'>
                    <p>Our friendly team is here to help.</p>
                    <p>info@studynotion.com</p>
                </div>
            </div>

            <div className='flex flex-col gap-y-1'>
                <div className='flex gap-2 text-white items-center text-xl'>
                    <BiWorld />
                    Visit Us
                </div>
                <div className='flex flex-col text-base'>
                    <p>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,</p>
                    <p>Bangalore-560016</p>
                </div>
            </div>

            <div className='flex flex-col gap-y-1'>
                <div className='flex gap-2 text-white items-center text-xl'>
                    <IoCall />
                    Call Us
                </div>
                <div className='flex flex-col text-base'>
                    <p>Mon - Fri From 8am to 5pm.</p>
                    <p>+123 456 7869</p>
                </div>
            </div>
            
        </div>

        <div className='w-full lg:w-[55%] flex flex-col gap-y-6 border-richblack-600 border-[1px] rounded-2xl 
        px-6 md:px-8 lg:px-12 py-10'>
            <div className='flex flex-col'>
                <h1 className='text-white text-4xl font-semibold'>Got a Idea? We've got the skills. Let's team up</h1>
                <p>Tell us more about yourself and what you're got in mind.</p>
            </div>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default Contact