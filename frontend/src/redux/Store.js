import { configureStore } from "@reduxjs/toolkit";
import {cartSlice} from "./slices/cartSlice";
import { productSlice } from "./slices/productSlice";
import {loginSlice} from "./slices/loginSlice";
import {currentUser} from "./slices/currentUser"

export const store = configureStore({
    reducer : {
        cart : cartSlice.reducer,
        product:productSlice.reducer,
        loggedIn:loginSlice.reducer,
        userInfo:currentUser.reducer,
    }
});