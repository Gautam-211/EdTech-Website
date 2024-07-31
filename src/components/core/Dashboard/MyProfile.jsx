import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from 'react-icons/ri';

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className='text-white flex flex-col gap-y-10'>
        <h1 className='text-4xl mb-[1rem]'>My Profile</h1>

        {/* Section-1  */}

        <div className='bg-richblack-800 rounded-lg px-12 py-8 border-richblack-700 border-[1px] flex items-center justify-between'>
            <div className='flex gap-x-3'>

                <img src={user?.image} alt={`profile-${user?.firstName}`} 
                    className='aspect-square w-[4.5rem] rounded-full object-cover'/>
                <div className='flex flex-col justify-center'>
                    <p className='font-semibold text-lg'>
                        {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className='text-richblack-300'>
                        {user?.email}
                    </p>
                </div>

            </div>
            
            <IconBtn text={"Edit"}
                        onclick={() => {
                            navigate("/dashboard/settings")
            }}
                    customClasses={"flex items-center gap-x-1 font-semibold"}>

                    <RiEditBoxLine />
            </IconBtn>
        </div>

        {/* Section-2  */}

        <div className='bg-richblack-800 rounded-lg px-12 py-8 border-richblack-700 border-[1px] flex items-center justify-between'>
            <div className='flex flex-col gap-y-4'>
                <h1 className='text-lg font-semibold'>About</h1>
                <p className='text-richblack-300'>
                    {user?.additionalDetails?.about? user.additionalDetails.about : "Write something about yourself"}
                </p>
            </div>
            <IconBtn text={"Edit"}
                        onclick={() => {
                            navigate("/dashboard/settings")
            }}
                    customClasses={"flex items-center gap-x-1 font-semibold"}>

                    <RiEditBoxLine />
            </IconBtn>
        </div>

        {/* Section-3  */}

        <div className='bg-richblack-800 rounded-lg px-12 py-8 border-richblack-700 border-[1px] flex items-start justify-between'>
                <div className='flex flex-col gap-y-8'>
                    <h1 className='text-lg font-semibold'>Personal Details</h1>
                    <div className='flex gap-x-[10rem]'>
                        <div className='flex flex-col gap-y-4'>
                            <div>
                                <p className='text-base text-richblack-300'>First Name</p>
                                <p>{user?.firstName}</p>
                            </div>
                            <div>
                                <p className='text-richblack-300 text-base'>Email</p>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <p className='text-base text-richblack-300'>Gender</p>
                                <p>{user?.additionalDetails?.gender  ?? "Edit profile"}</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-4'>
                            <div>
                                <p className='text-base text-richblack-300'>Last Name</p>
                                <p>{user?.lastName}</p>
                            </div>
                            <div>
                                <p className='text-richblack-300 text-base'>Phone No.</p>
                                <p>{user?.additionalDetails?.contactNumber ?? "Edit Profile"}</p>
                            </div>
                            <div>
                                <p className='text-base text-richblack-300'>Date of Birth</p>
                                <p>{user?.additionalDetails?.dateOfBirth  ?? "Edit profile"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <IconBtn text={"Edit"}
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                        customClasses={"flex items-center gap-x-1 font-semibold"}>

                            <RiEditBoxLine />
                </IconBtn>
        </div>
    </div>
  )
}

export default MyProfile