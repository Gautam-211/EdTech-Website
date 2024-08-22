import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";


export function updateDisplayPicture(token, formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, formData,{
                "Content-Type":"multipart/form-data",
                Authorization: `Bearer ${token}`
            })

            console.log("UPDATE DP API response...", response);

            if(!response.data.success){
                throw new Error(response?.data?.message)
            }

            toast.success("Display picture updated");
            dispatch(setUser(response?.data?.data));
            localStorage.setItem("user", JSON.stringify(response?.data?.data))

        } catch (error) {
            console.log("UPDATE DP API error...", error);
            toast.error("Could not update display picture");
        }
        toast.dismiss(toastId);
    }
}

//update profile data
export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        // const userImage = response?.data?.updatedUserDetails?.image
        //   ? response.data.updatedUserDetails.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.updatedUserDetails?.firstName} ${response?.data?.updatedUserDetails?.lastName}`
        dispatch(
          setUser(response?.data?.updatedUserDetails)
        )
        localStorage.setItem("user",JSON.stringify(response?.data?.updatedUserDetails))
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }


  //change password
  export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", settingsEndpoints.CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }


  //delete profile service
  export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }