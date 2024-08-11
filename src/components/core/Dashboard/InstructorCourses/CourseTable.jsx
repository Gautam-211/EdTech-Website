import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constants';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { HiClock } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchIntructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { formattedDate } from '../../../../utils/dateFormatter';

const CourseTable = ({courses, setCourses}) => {

    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const handleCourseDelete = async(courseId) => {
        setLoading(true);

        await deleteCourse({courseId:courseId}, token);
        const result = await fetchIntructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);

        setLoading(false);
    }

  return (
    <div className='mt-[2rem] w-full h-full'>
        <Table className="w-full rounded-lg border-[1px] border-richblack-600">
            <Thead className="w-full border-[px] border-richblack-60 rounded-lg">
                <Tr className="rounded-lg">
                    <Th className="text-start text-lg rounded-lg px-3 py-3">
                        Courses
                    </Th>
                    <Th className="text-start text-lg">
                        Duration
                    </Th>
                    <Th className="text-start text-lg">
                        Price
                    </Th>
                    <Th className="text-start text-lg">
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody className="h-full">
                {
                    courses.length === 0 ? (
                        <Tr>
                            <Td>
                                No Courses found
                            </Td>
                        </Tr>
                    )
                    :
                    (
                        courses?.map((course) => (
                            <Tr key={course._id} className="border-richblack-600 border-[1px] h-full">
                                <Td className="flex items-center gap-x-4 py-4 px-3 h-full">
                                    <img src={course?.thumbnail} alt="" 
                                    className='h-[10rem] w-[17rem] rounded-md'/>
                                    <div className='flex flex-col gap-2 h-full'>
                                        <p className='text-lg'>{course?.courseName}</p>
                                        <p className='text-richblack-300 w-[100%] md:w-[21rem]'>{course?.courseDescription}</p>
                                        <p className='text-richblack-200'>Created : {formattedDate(course.createdAt)}</p>
                                        {
                                            course?.status === COURSE_STATUS.DRAFT ? (
                                                    <div className='bg-richblack-700 bg-opacity-80 text-pink-200 rounded-full px-4 py-1 w-fit
                                                    flex items-center gap-2 text-base'>
                                                        <HiClock className='bg-pink-300 bg-opacity-40 rounded-full p-1 text-pink-100
                                                        font-bold text-lg'/>
                                                        Drafted
                                                    </div>
                                            )
                                            :
                                            (
                                                <div className='bg-richblack-700 bg-opacity-80 text-yellow-100 rounded-full px-4 py-1 w-fit
                                                flex items-center gap-2 text-base'>
                                                    <AiOutlineCheck className='bg-yellow-300 bg-opacity-40 rounded-full p-1 text-yellow-100
                                                    font-bold text-lg'/>
                                                    Published
                                                </div>
                                            )
                                        }
                                    </div>
                                </Td>

                                <Td>
                                    2hr 30min
                                </Td>
                                <Td>
                                    {course?.price}
                                </Td>
                                <Td className="text-richblack-300 text-lg max-sm:mb-[2rem]">
                                    <div className='flex items-center gap-4'>
                                        <button 
                                            disabled={loading}
                                            onClick={() => {
                                                    navigate(`/dashboard/edit-course/${course?._id}`)
                                                }}>
                                            <MdEdit className='text-xl hover:text-caribbeangreen-400 transition-all
                                            duration-200 ease-linear'/>
                                        </button>
                                        <button disabled={loading}
                                            onClick={() => setConfirmationModal({
                                                text1:"Do you want to delete this course?",
                                                text2:"All the data realted to to this course will be deleted!",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler: () => handleCourseDelete(course._id),
                                                btn2Handler: () => setConfirmationModal(null)
                                            })}>
                                            <RiDeleteBin6Line className='text-xl hover:text-pink-300 transition-all
                                            duration-200 ease-linear'/>
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
        {
        confirmationModal && (
            <ConfirmationModal modalData={confirmationModal}/>
        )
      }
    </div>
  )
}

export default CourseTable