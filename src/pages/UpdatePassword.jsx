import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner/Spinner'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { FaArrowLeft, FaLock } from 'react-icons/fa'

const UpdatePassword = () => {
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {token} = useParams();
    const navigate = useNavigate();

    const {password, confirmPassword} = formData;

    function handleChange(e){
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value
            }
        ))
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(resetPassword(password, confirmPassword, token, navigate));
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
                    <h1 className='text-3xl font-semibold'>Choose new password</h1>
                    <p className='text-base text-richblack-100'>Almost done, enter your new password and you're all set.</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 '>
                        <label className='flex flex-col gap-1 text-richblack-100 relative'>
                            <span className='absolute top-[2.3rem] text-[20px] left-[0.8rem]'>
                                <FaLock/>
                            </span>
                            <span onClick={() => setShowPassword((prev) => !prev)}
                                 className='absolute top-[2.3rem] text-[20px] right-[0.8rem]'>
                                {
                                    showPassword? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                                }
                            </span>
                            <p className='pl-1'>New password <sup>*</sup></p>
                            <input
                                className='pr-[1rem] pl-12 py-2 rounded-lg bg-richblack-700 w-full'
                                required
                                type={`${showPassword? "text" : "password"}`}
                                name='password'
                                value={password}
                                onChange={handleChange}/>
                        </label>

                        <label className='flex flex-col gap-1 text-richblack-100 relative'>
                            <span className='absolute top-[2.3rem] text-[20px] left-[0.8rem]'>
                                <FaLock/>
                            </span>
                            <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                                 className='absolute top-[2.3rem] text-[20px] right-[0.8rem]'>
                                {
                                    showConfirmPassword? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                                }
                            </span>
                            <p className='pl-1'>Confirm New password <sup>*</sup></p>
                            <input
                                className='pr-3 pl-12 py-2 rounded-lg bg-richblack-700 w-full'
                                required
                                type={`${showConfirmPassword? "text" : "password"}`}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleChange}/>
                        </label>

                        <button type='submit' className='bg-yellow-100 px-2 py-3 rounded-lg text-richblack-900 font-[500]
                        hover:scale-95 hover:bg-yellow-200 transition-all duration-200 ease-linear'>
                            Reset Password
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

export default UpdatePassword