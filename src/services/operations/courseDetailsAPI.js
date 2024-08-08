import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"


export const fetchCourseCategories = async() => {
    let result =[]
    try {
        const response = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
        console.log("COURSE CATEGORIES API RESPONSE...", response);
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