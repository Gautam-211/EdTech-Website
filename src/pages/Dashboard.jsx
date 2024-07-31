import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner/Spinner';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {

    const {loading:authLoading} = useSelector((state) => state.profile);
    const {loading:profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading){
        return (
            <div className='absolute top-[45vh]'>
                    <Spinner/>
            </div>
        )
    }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] w-full'>
        <Sidebar/>

        <div className='h-[calc(100vh)] pt-[3.5rem] w-full overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard