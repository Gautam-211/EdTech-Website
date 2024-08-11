import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"


export const fetchCourseCategories = async() => {
    let result =[]
    try {
        const response = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response?.data?.data
        
    } catch (error) {
        console.log("COURSE CATEGORIES API RESPONSE...",error);
        toast.error(error.message);
    }
    finally{
        return result;
    }
}

//add course 

export const addCourseDetails = async(data,token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })

          console.log("ADD COURSE DETAILS API RESPONSE ...", response);
          if(!response?.data?.success){
              throw new Error(response.data.message)
          }
  
          toast.success("Course Details added successfully");
          result = response?.data?.data
          
      } catch (error) {
          console.log("ADD COURSE DETAILS API RESPONSE...",error);
          toast.error(error.message);
      }
      toast.dismiss(toastId);
      return result;
}

// edit course api
export const editCourseDetails = async(data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", courseEndpoints.EDIT_COURSE_API, data, {
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}` 
        })

        console.log("EDIT COURSE API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Course Details updated successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("EDIT COURSE API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//delete course api
export const deleteCourse = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("DELETE", courseEndpoints.DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}` 
        })

        console.log("DELETE COURSE API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Course deleted successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("DELETE COURSE API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//get intructor courses
export const fetchIntructorCourses = async(token) => {
    let result = [];
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("GET", courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}` 
        })

        console.log("INSTRUCTOR COURSES API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Courses fetched successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("INSTRUCTOR COURSES API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//get full course details
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        {
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
    }
    toast.dismiss(toastId)
    return result
  }

//create Section
export const createSection = async(data,token) => {
    let result;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}` 
        })

        console.log("CREATE SECTION API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Section created successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("CREATE SECTION API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//edit Section
export const updateSection = async(data, token) => {
    const toastId = toast.loading("Loading...");
    let result;
    try {
        const response = await apiConnector("POST", courseEndpoints.UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}` 
        })

        console.log("UPDATE SECTION API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Section Name updated successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("UPDATE SECTION API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//delete section
export const deleteSection = async(data, token) => {
    let result;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndpoints.DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}` 
        })

        console.log("DELETE SECTION API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Section deleted successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("DELETE SECTION API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//create subSection
export const createSubSection = async(data, token) => {
    let result;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}` 
        })

        console.log("CREATE SUB SECTION API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Lecture created successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("CREATE SUB SECTION API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//update subSection
export const updateSubSection = async(data, token) => {
    let result;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndpoints.UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}` 
        })

        console.log("UPDATE SUB SECTION API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Lecture updated successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("UPDATE SUB SECTION API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//delete subSection
export const deleteSubSection = async(data,token) => {
    let result;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndpoints.DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}` 
        })

        console.log("DELETE SUB SECTION API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Lecture deleted successfully");
        result = response?.data?.data
        
    } catch (error) {
        console.log("DELETE SUB SECTION API RESPONSE...",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

