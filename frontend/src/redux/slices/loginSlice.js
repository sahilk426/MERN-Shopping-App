import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice(
    {
        name: "loggedIn",
        initialState: false,
        reducers: {
            setIsLoggedIn: (state,action) => {
                return state = action.payload;
            }
        }
    }
)

export const { setIsLoggedIn} = loginSlice.actions;
export default loginSlice.reducer;