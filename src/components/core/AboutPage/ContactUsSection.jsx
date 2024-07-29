import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactUsSection = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto'>
        <div className='w-full md:w-1/2 mx-auto flex flex-col gap-y-5 text-white items-center'>

            <h1 className='text-4xl font-semibold'>
                Get in touch
            </h1>
            <p className='text-richblack-300'>
                We'd love to here for you, Please fill out this form.
            </p>
            <div className='w-full'>
                <ContactUsForm/>
            </div>
        </div>
    </div>
  )
}

export default ContactUsSection