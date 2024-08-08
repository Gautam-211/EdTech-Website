import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { BiSolidDownArrow } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import SubSectionModal from './SubSectionModal';
import { deleteSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({handleChangeEditSectionName}) => {

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async(sectionId) => {
        const result = await deleteSection({sectionId, courseId:course._id}, token);

        if(result){
            dispatch(setCourse(result));
        }

        setConfirmationModal(null);
  }

  const handleDeleteSubSection = async(subSectionId, sectionId) => {

  }

  return (
    <div className='text-white w-full'>
      <div className='bg-richblack-700 px-4 py-2 rounded-lg border-[1px] border-richblack-600 text-richblack-50'>
        {
            course?.courseContent?.map((section,index) => (
                <details key={section._id} className={`${index!==course?.courseContent?.length-1?"border-b-[1px] border-richblack-600":""}
                py-3`}>

                    <summary className='flex justify-between w-full'>
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <RxDropdownMenu className='text-xl text-richblack-300'/>
                            <p>{section?.sectionName}</p>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                <MdEdit className='text-xl text-richblack-300'/>
                            </button>

                            <button onClick={() => {
                                setConfirmationModal({
                                    text1:"Delete this section?",
                                    text2:"All lectures in this section will be deleted!",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler : () => handleDeleteSection(section._id),
                                    btn2Handler : () => setConfirmationModal(null)
                                })
                            }}>
                                <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                            </button>

                            <span className='text-richblack-400'>|</span>

                            <BiSolidDownArrow className='text-sm text-richblack-300 cursor-pointer'/>
                        </div>
                    </summary>

                    <div className='flex flex-col gap-y-2'>
                        {
                            section?.subSection?.map((data) => (
                                <div key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className={`flex items-center justify-between
                                        border-b-[1px] border-richblack-600q`}>

                                    <div className='flex items-center gap-2'>
                                        <RxDropdownMenu className='text-xl text-richblack-300'/>
                                        <p>{data?.title}</p>
                                    </div>

                                    <div className='flex items-center gap-x-2'>
                                        <button onClick={() => setEditSubSection({...data,sectionId:section._id})}>
                                            <MdEdit className='text-xl text-richblack-300'/>
                                        </button>

                                        <button onClick={() => {
                                                    setConfirmationModal({
                                                        text1:"Delete this lecture?",
                                                        text2:"All data including video in this section will be deleted!",
                                                        btn1Text:"Delete",
                                                        btn2Text:"Cancel",
                                                        btn1Handler : () => handleDeleteSubSection(data._id, section._id),
                                                        btn2Handler : () => setConfirmationModal(null)
                                                    })
                                              }}
                                        >
                                            <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }

                        <button className='flex items-center gap-x-2 text-yellow-50 text-lg mt-2'
                            onClick={() => setAddSubSection(section._id)}>
                            <AiOutlinePlus/>
                            Add Lecture
                        </button>
                    </div>

                </details>
            ))
        }
      </div>
      {
        addSubSection?(<SubSectionModal
                            modalData={addSubSection}
                            setModalData={setAddSubSection}
                            add={true}/>)

        : viewSubSection?(<SubSectionModal 
                                modalData={viewSubSection}
                                setModalData={setViewSubSection}
                                view={true}/>)

        :    editSubSection?(<SubSectionModal 
                                    modalData={editSubSection}
                                    setModalData={setEditSubSection}
                                    edit={true}/>)

        :       (<div></div>)
      }
      {
        confirmationModal && (
            <ConfirmationModal modalData={confirmationModal}/>
        )
      }
    </div>
  )
}

export default NestedView