import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CTAButton from '../core/homepage/CTAButton';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import toast from 'react-hot-toast';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessfull}
    } = useForm();

    const submitContactForm = async(data) => {
        setLoading(true);
        const toastId = toast.loading("Loading...");
        
        try {
            const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API, data);
            console.log("CONTACT US API RESPONSE...", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Message sent successfully");

        } catch (error) {
            console.log("LOGIN API RESPONSE...",error );
            toast.error("Error in sending message");
        }
        finally{
            setLoading(false);
            toast.dismiss(toastId);
        }
    }

    useEffect(() => {
        if(isSubmitSuccessfull){
            reset({
                email:"",
                firstName : "",
                lastName : "",
                message : "",
                phoneNo : "",
            })
        }
    },[reset,isSubmitSuccessfull])

  return (
    <form className='w-full text-richblack-5 flex flex-col gap-y-6' onSubmit={handleSubmit(submitContactForm)}>

            {/* name  */}
            <div className='w-full flex flex-col lg:flex-row gap-6 justify-center'>

                <label className='flex flex-col gap-y-1 w-full'>
                    <p>First Name</p>
                    <input
                        className='bg-richblack-700 text-white rounded-md px-5 py-3 shadow-sm shadow-richblack-300' 
                        type="text"
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        {...register("firstName",{ required:true})} 
                    />
                    {
                        errors.firstName && (
                            <span className='text-red text-sm'>
                                <sup>*{" "}</sup>Please enter your name
                            </span>
                        )
                    }
                </label>

                <label className='flex flex-col gap-y-1 w-full'>
                    <p>First Name</p>
                    <input
                        className='bg-richblack-700 text-white rounded-md px-5 py-3 shadow-sm shadow-richblack-300' 
                        type="text"
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last name'
                        {...register("lastName")} 
                    />
                </label>

            </div>

            {/* email  */}
            <div className='w-full flex justify-center'>
                <label className='flex flex-col gap-y-1 w-full'>
                    <p>Email Address</p>
                    <input
                        className='bg-richblack-700 text-white rounded-md px-5 py-3 shadow-sm shadow-richblack-300' 
                        type="email"
                        name='email'
                        id='email'
                        placeholder='Enter email address'
                        {...register("email",{ required:true})} 
                    />
                    {
                        errors.firstName && (
                            <span className='text-red text-sm'>
                                <sup>*{" "}</sup>Please enter your email
                            </span>
                        )
                    }
                </label>
            </div>

            {/* phoneNo  */}
            <div className='w-full flex flex-col gap-y-1 justify-center'>
                    
                    {/* dropdown */}
                    <p>Phone Number</p>
                    <div className='w-full flex gap-x-6 justify-center'>

                        <select
                            className='w-[4.5rem] bg-richblack-700 text-white rounded-md px-2 py-3 shadow-sm shadow-richblack-300' 
                            name='dropdown'
                            id='dropdown'
                            {...register("countrycode",{required:true})}>

                                {
                                    CountryCode.map((element,index) => (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    ))
                                }

                        </select>

                        <input
                            className='bg-richblack-700 w-full text-white rounded-md px-5 py-3 shadow-sm shadow-richblack-300' 
                            type="number"
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            {
                                ...register("phoneNo",
                                    { 
                                        required:{value:true, message:"Enter Phone Number"},
                                        maxLength:{value:10, message:"Invalid Phone number"},
                                        minLength:{value:8, message:"Invalid Phone Number"}
                                    })
                            } 
                        />

                    </div>
                    
                    {
                        errors.phoneNo && (
                            <span className='text-red text-sm'>
                                <sup>*{" "}</sup>{errors.phoneNo.message}
                            </span>
                        )
                    }

            </div>
            
            {/* message  */}
            <div className='w-full flex justify-center'>
                <label className='flex flex-col gap-y-1 w-full'>
                    <p>Message</p>
                    <textarea
                        className='bg-richblack-700 text-white rounded-md px-5 py-3 shadow-sm shadow-richblack-300' 
                        name='message'
                        id='message'
                        cols={30}
                        rows={7}
                        placeholder='Enter your message here'
                        {...register("message",{ required:true})} 
                    />
                    {
                        errors.firstName && (
                            <span className='text-red text-sm'>
                                <sup>*{" "}</sup>Please enter your message
                            </span>
                        )
                    }
                </label>
            </div> 

            {/* submit button  */}
            <button type='submit' className='text-center text-[15px] px-6 py-3 rounded-md font-bold drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
                bg-yellow-50 text-black hover:scale-95 transition-all duration-200'>
                Send Message
            </button>
    </form>
  )
}

export default ContactUsForm