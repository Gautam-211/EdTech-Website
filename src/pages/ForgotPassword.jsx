import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '../components/common/Spinner/Spinner';
import { SiGmail } from "react-icons/si";

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email,setEmail] = useState("");  
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (
    <div className='text-white flex justify-center items-center w-11/12 mt-16'>
        {
            loading? (
                <div className='absolute top-[45vh]'>
                    <Spinner/>
                </div>
            ) 
            : 
            (
                <div className='flex flex-col justify-center w-full md:w-1/2 lg:w-1/3 mt-[8rem] gap-4 px-4 py-4'>
                    <h1 className='text-3xl font-semibold'>
                        {
                            !emailSent ? "Reset your Password" : "Check your Email"
                        }
                    </h1>

                    <p className='text-base text-richblack-100'>
                        {
                            !emailSent ? 
                            "Have no fear. We'll email you instrcutions to reset your password. If you don't have acces to your email then we can try account recovery" 
                            : 
                            `We have sent the reset password email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 '>
                        {
                            !emailSent && (
                                <label className='flex flex-col gap-1 text-richblack-100 relative'>
                                    <span className='absolute top-[2.3rem] text-[20px] left-[0.8rem]'>
                                        <SiGmail/>
                                    </span>
                                    <p className='pl-1'>Email Address</p>
                                    <input
                                    className='pr-3 pl-12 py-2 rounded-lg bg-richblack-700 w-full'
                                    required 
                                    type="email"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email address'
                                    />
                                </label>
                            ) 
                        }

                        <button type='submit' className='bg-yellow-100 px-2 py-3 rounded-lg text-richblack-900 font-[500]
                        hover:scale-95 hover:bg-yellow-200 transition-all duration-200 ease-linear'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>

                    </form>

                    <div>
                        <Link to={"/login"}>
                            <div className='flex gap-2 items-center text-richblack-200 hover:scale-105 transition-all duration-200 ease-linear'>
                                <FaArrowLeft/>
                                <p>Back to Login</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword