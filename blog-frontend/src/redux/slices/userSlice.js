import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error:null,
    loding: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loding = true;
            state.error = null;
        },
        signInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loding = false;
            state.error = null;
        },
        signInFailure: (state, action)=>{
            state.loding = false,
            state.error = action.payload
        }
    }
});


export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;