import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner/Spinner';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { RxCountdownTimer } from 'react-icons/rx';

const VerifyEmail = () => {

    const [otp,setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData,loading} = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (!signupData){
    //         navigate("/signup")
    //     }
    // },[])

    function handleSubmit(e){
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData

        console.log(otp)

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
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
                    <h1 className='text-3xl font-semibold'>Verify Email</h1>
                    <p className='text-base text-richblack-100'>A verification code has been sent to you. Enter the code below </p>
                    <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />
                            <button type='submit' className='bg-yellow-100 px-2 py-3 rounded-lg text-richblack-900 font-[500]
                            hover:scale-95 hover:bg-yellow-200 transition-all duration-200 ease-linear'>
                                Verify Email
                            </button>
                    </form>

                    <div className='flex w-full justify-between items-center'>
                        <Link to={"/login"}>
                            <div className='flex gap-2 items-center text-richblack-200 hover:scale-105 transition-all duration-200 ease-linear'>
                                <FaArrowLeft/>
                                <p>Back to Login</p>
                            </div>
                        </Link>
                        <button className="flex items-center text-blue-100 gap-x-2" onClick={() => dispatch(sendOtp(signupData.email,navigate))}>
                            <RxCountdownTimer/>
                            Resend it
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail