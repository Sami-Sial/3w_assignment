import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminUsers = createAsyncThunk("getAdminUsers", async () => {
    try {
        const {data}  = await axios.get("/api/v1/admin/users");
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error.response?.data.message;
    }
})



export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: null,
        isLoading: false,
        error: null,
        usersCount: null
    },
    extraReducers: (builder) => {
        // get all users admin
        builder.addCase(getAdminUsers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAdminUsers.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.error = action.payload
            console.log("rejected", state.error)
        });
        builder.addCase(getAdminUsers.fulfilled, (state, action) => {
            state.isLoading = false

            if (action.payload.users) {
                state.users = action.payload.users
                state.usersCount = action.payload.usersCount
            } else {
                state.error = action.payload
            }
        });
    }, 
});


export default adminSlice.reducer;
