import { profilerUrl } from "@/redux/API_end_points";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProfileSuccess } from "../Reducers/AuthSlice";

// export const getProfile = createAsyncThunk(
//   "auth/getProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(profilerUrl, {
//         withCredentials: true,
//       });
//       return response.data.user;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// Regular thunk to fetch user profile
export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(profilerUrl, {
        withCredentials: true,
      });
      const user = response.data.user;
      dispatch(getProfileSuccess(user)); // Dispatch action to update state
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };
};
