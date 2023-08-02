import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: [],
    reducers: {
        addP: (state, action) => {
            state.push(action.payload);
        },
        removeP: (state) => {
            state = [];
            return state;
        }
    }
})

export const { addP, removeP } = productSlice.actions;
export default productSlice.reducer;