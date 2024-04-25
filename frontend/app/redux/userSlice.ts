import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "../lib/types";


interface UserState {
    currentUser: User | null;
    isFetching: boolean;
    error: boolean;
    errorMessage: string | null;
  }

const initialState: UserState= {
    currentUser:  null,
    isFetching: false,
    error: false,
    errorMessage:null,
}

const userSlice = createSlice ({
    name:"user",
    initialState,
    reducers:{
        loginStart:(state) => {
            state.isFetching = true;
        },
        loginSuccess:(state,action:PayloadAction<User>) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
            
        },
        loginFail: (state,action) => {
            state.isFetching = false;
            state.error = true;
            state.errorMessage = action.payload
        },
        logOut: (state) => {
            state.currentUser = null;
        }
    }
})

export const {loginFail,loginStart,loginSuccess,logOut} = userSlice.actions
export default userSlice.reducer