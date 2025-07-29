import { configureStore } from '@reduxjs/toolkit';
import userRecuser from "./slices/userSlice";



export const store = configureStore({
    reducer:{
        user: userRecuser
    }
});