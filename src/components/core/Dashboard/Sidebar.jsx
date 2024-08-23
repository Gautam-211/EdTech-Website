import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../common/Spinner/Spinner'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = ({open}) => {

    const {user, loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(authLoading || profileLoading){
        return (
            <div className='absolute top-[45vh]'>
                    <Spinner/>
            </div>
        )
    }

  return (
        <div className={`flex flex-col max-w-[250px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800
        py-10  mt-[3.5rem] max-lg:fixed ${open?" left-0 translate-x-0":"max-lg:-translate-x-full"}
        transition-all duration-300 ease-in-out z-40`}>
            <div className='flex flex-col text-white max-w-[250px]'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && link.type !== user?.accountType) return null
                        return (<SidebarLink link={link} key={link.id} iconName={link.icon}/>)
                    })
                }
            </div>

            <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>

            <div className='flex flex-col text-white max-w-[250px]'>
                <SidebarLink link={{name:"Settings",path:"dashboard/settings"}} iconName={"VscSettingsGear"}/>

                <button className='flex items-center text-richblack-300 text-lg hover:text-white transition-all
                    duration-200 ease-linear px-8 py-2 gap-x-3'
                    onClick={() => setConfirmationModal({
                        text1:"Are you sure?",
                        text2:"You will be logged out!",
                        btn1Text:"Logout",
                        btn2Text:"Cancel",
                        btn1Handler : () => dispatch(logout(navigate)),
                        btn2Handler : () => setConfirmationModal(null)
                    })}>
                        <VscSignOut />
                        Logout
                </button>
            </div>
                
                
                {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
                }
            
                
        </div>
        
  )
}

export default Sidebar