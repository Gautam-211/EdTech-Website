import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

export function sendOtp(email,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", endpoints.SENDOTP_API,{email});

            console.log("SEND OTP API RESPONSE...", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            toast.success("OTP sent successfully");
            navigate("/verify-email");
            
        } catch (error) {
            console.log("SEND OTP API RESPONSE...",error);
            toast.error("Could not send the OTP");
        }
        finally{
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

export function login(email,password,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST",endpoints.LOGIN_API,{
                email,password
            });

            console.log("LOGIN API RESPONSE...", response);

            if (!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login successfull");
            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user, image:userImage}));

            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile")

        } catch (error) {
            console.log("LOGIN API RESPONSE...",error );
            toast.error("Login failed");
        }
        finally{
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",endpoints.SIGNUP_API,{
                accountType,firstName,lastName,email,password,confirmPassword,otp
            })

            console.log("SIGNUP API Response...",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Signup was successfull");
            navigate("/login");

        } catch (error) {
            console.log("SIGNUP API response...", error);
            toast.error("Signup failed");
            navigate("/signup")
        }
        finally{
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
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

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }