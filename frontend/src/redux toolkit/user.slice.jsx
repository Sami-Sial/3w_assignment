import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const signup = createAsyncThunk("signup", async (formData) => {
    try {
        const { data } = await axios.post("https://3w-assignment-vert.vercel.app/api/v1/register",
            { ...formData },
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        
        return data;
    } catch (error) {
        console.log(error)
        console.log(error.response.data.message);
        return error.response.data.message;
    }
})

export const login = createAsyncThunk("login", async (formData) => {
    try {
        const { data } = await axios.post("https://3w-assignment-vert.vercel.app/api/v1/login",
            { ...formData },
            { headers: { "Content-Type": "application/json" } }
        );
        
        return data;
    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
})

export const loadUser = createAsyncThunk("loadUser", async () => {
    try {
        const { data } = await axios.get("https://3w-assignment-vert.vercel.app/api/v1/me");
        
        return data;
    } catch (error) {
        return error.response.data.message;
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
        success: false
    },

    extraReducers: (builder) => {
        // signup
        builder.addCase(signup.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(signup.rejected, (state, action) => {
            console.log("Error ", action.payload);
            console.log("rejected")
            state.error = action.payload
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false
            console.log("fulfilled")
            if (action.payload.user) {
                state.user = action.payload.user
                state.isAuthenticated = true
                state.error = null
                state.success = action.payload.success
            } else {
                state.error = action.payload
            }
        });

        // login
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(login.rejected, (state, action) => {
            console.log("Error ", action.payload);
            console.log("rejected")
            state.error = action.payload
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            console.log("fulfilled")
            if (action.payload.user) {
                state.user = action.payload.user
                state.isAuthenticated = true
                state.success = "Successfully logged in."
                state.error = null
            } else {
                state.error = action.payload
            }
        });

        // load user
        builder.addCase(loadUser.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(loadUser.rejected, (state, action) => {
            console.log("Error ", action.payload);
            console.log("rejected")
            state.error = action.payload
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.isLoading = false
            console.log("fulfilled")
            if (action.payload.user) {
                state.user = action.payload.user
                state.isAuthenticated = true
                state.error = null
                state.isUpdated = false
            } else {
                state.error = action.payload
            }
        });

    }, 
});


export default userSlice.reducer;