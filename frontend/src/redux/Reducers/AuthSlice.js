import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null; // Clear user state on logout
    },
    getProfileSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { clearMessage, loginSuccess, logoutSuccess, getProfileSuccess } =
  authSlice.actions;
export default authSlice.reducer;
