import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

export function login(email,password,navigate) {
    return async(dispatch) => {

    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",endpoints.RESETPASSTOKEN_API,{email});
            
            console.log("RESET PASSWORD TOKEN RESPONSE...", response);

            if (!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset password email sent!");
            setEmailSent(true);
            
        } catch (error) {
            console.log("Reset password token error", error.message);
            toast.error("Failed to send email");
        }
        finally{
            dispatch(setLoading(false));
        }
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",endpoints.RESETPASSWORD_API,{password,confirmPassword,token});
            
            console.log("RESET PASSWORD RESPONSE...", response);

            if (!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password reset done successfully");

            navigate("/login")
            
        } catch (error) {
            console.log("Reset password token error", error.message);
            toast.error("Failed to reset password");
        }
        finally{
            dispatch(setLoading(false));
        }
    }
}