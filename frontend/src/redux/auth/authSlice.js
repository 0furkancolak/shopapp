import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify" 


const baseUrl = "http://localhost:3000/user/"

const initialState = {
    user: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
        isAdmin: localStorage.getItem("isAdmin")
    } || null,
    loading: false,
    error: ""
}

export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const response = await axios.post(baseUrl + "register", userData);
        toast.success("Başarıyla kayıt olundu!")
        return response.data;
    } catch (error) {
        throw Error(error.response.data.error);
    }
});

export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const response = await axios.post(baseUrl + "login", userData);
        const data = response.data
        localStorage.setItem("name", data.user.name)
        localStorage.setItem("email", data.user.email)
        localStorage.setItem("token", data.token)
        localStorage.setItem("isAdmin", data.user.isAdmin)
        toast.success("Başarıyla giriş yapıldı!")
        return response.data.user;
    } catch (error) {
        throw Error(error.response.data.error);
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            localStorage.removeItem("name")
            localStorage.removeItem("email")
            localStorage.removeItem("token")
            localStorage.removeItem("isAdmin")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer