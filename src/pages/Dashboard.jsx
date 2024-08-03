import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner/Spinner';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { FaArrowRight } from 'react-icons/fa';

const Dashboard = () => {

    const {loading:authLoading} = useSelector((state) => state.profile);
    const {loading:profileLoading} = useSelector((state) => state.profile);
    const [open, setOpen] = useState(false);

    if(authLoading || profileLoading){
        return (
            <div className='absolute top-[45vh]'>
                    <Spinner/>
            </div>
        )
    }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] w-full flex-col lg:flex-row'>
        <Sidebar open={open} setOpen={setOpen}/> 

        <div className={`text-yellow-50 text-lg lg:hidden mt-[6.3rem] flex items-center gap-x-2 w-11/12 mx-auto
        ${open?"translate-x-[62%]":""} transition-all duration-300 ease-in-out`}
        onClick={() => setOpen((prev) => !prev)}>
            {open?"Close Menu":"Open Menu"} 
            <FaArrowRight className={`${open?"rotate-180":""} trasnition-all duration-300 ease-in`}/>
        </div>

        <div className='h-[calc(100vh)] lg:pt-[3.5rem] w-full overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard