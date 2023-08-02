import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push(action.payload);
        },
        remove: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        clear:(state) => {
            state = [];
            return state;
        },
        set:(state,action) => {
            state = action.payload;
            return state;
        }
    }
})

export const { add, remove ,clear,set} = cartSlice.actions;
export default cartSlice.reducer;