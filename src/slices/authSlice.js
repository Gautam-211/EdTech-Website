import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setToken : (state,value) => {
            state.token = value.payload
        },
        setLoading : (state,value) => {
            state.loading = value.payload
        },
        setSignupData : (state,value) => {
            state.loading = value.payload
        }
    }
})

export const {setToken,setLoading,setSignupData} = authSlice.actions;
export default authSlice.reducer;