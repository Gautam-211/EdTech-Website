import React, { useEffect, useRef, useState } from 'react'
import {  TiArrowSortedUp } from 'react-icons/ti';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import ConfirmationModal from '../../common/ConfirmationModal';

const ProfileDropDown = () => {

  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const image = user.image;
  const [open,setOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const divRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);


  return (
    <div className='text-richblack-5'>
        <div ref={divRef} className='flex items-center gap-1 cursor-pointer group relative' onClick={() => setOpen((prev) => !prev)}>
          <img src={image} alt="profile dropdown" className='w-[2rem] h-[2rem] rounded-full'/>
          <TiArrowSortedUp className={`${open?"rotate-180":""} transition-all duration-200 ease-linear`} />

          <div className={`absolute ${open?"visible":"invisible"} p-1 bg-richblack-5 text-richblack-900 -bottom-[5rem]
          -left-[5rem] rounded-md z-20`}>

                {/* <div className='absolute left-[50%] top-0 h-4 w-4 rotate-45 bg-richblack-5
                                                        translate-x-[80%] translate-y-[-10%] z-10 '></div> */}

                <Link to={"/dashboard/my-profile"}>
                    <div className='flex items-center gap-2 hover:bg-richblack-100 px-2 py-1 rounded-md z-20'>
                        <VscDashboard/>
                        Dashboard
                    </div>
                </Link>
                
                <div className='flex items-center gap-2 hover:bg-richblack-100 px-2 py-1 rounded-md z-20'
                onClick={() => setConfirmationModal({
                    text1:"Are you sure?",
                    text2:"You will be logged out!",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler : () => dispatch(logout(navigate)),
                    btn2Handler : () => setConfirmationModal(null)
                })}>
                    <VscSignOut/>
                    Logout
                </div>
                
          </div>
        </div>
        {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>
  )
}

export default ProfileDropDown