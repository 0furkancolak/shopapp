import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axios from "axios"


const baseUrl = "http://localhost:3000/basket/"

const initialState = { 
    userId: "",
    items: [],
    error: "",
    loading: false
}

export const addBasket = createAsyncThunk("basket/addBasket", async (productId) => {
    const quantity = 1
    try {
        const response = axios.post(baseUrl, { productId, quantity }, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
        toast.success("Sepete eklendi!")
        return response.data
    } catch (error) {
        console.log(error);
        toast.error("Hata oluştu!")
    }
})

export const removeBasket = createAsyncThunk("basket/removeBasket", async (productId) => {
    try {
        const response = axios.delete(baseUrl + productId, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
        toast.warn("Silindi!")
        return response.data
    } catch (error) {
        console.log(error);
        toast.error("Hata oluştu!")
    }
})


const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBasket.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(addBasket.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(addBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeBasket.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(removeBasket.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})



export default basketSlice.reducer