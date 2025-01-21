import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import adminSlice from "./admin.slice";


export const store = configureStore({
    reducer: {
        userSlice,
        adminSlice
    },
})