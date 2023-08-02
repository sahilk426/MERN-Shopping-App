import { createSlice } from "@reduxjs/toolkit";

export const currentUser = createSlice(
    {
        name:"userInfo",
        initialState:{},
        reducers:{
            loggedInUser:(state,action) => {
                return state = action.payload;
            },
            clearCart:(state) => {
                state.cart = [];
                return state;
            }
        }
    } 
)

export const { loggedInUser,clearCart} = currentUser.actions;
export default currentUser.reducer;