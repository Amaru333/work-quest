import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    details: null,
    info: null,
  },
  reducers: {
    setUser(state, action) {
      state.details = action.payload;
    },
    setUserInfo(state, action) {
      state.info = action.payload;
    },
  },
});

export const { setUser, setUserInfo } = userSlice.actions;

export const getUserDetails = (state) => state.user.details;
export const getUserInfo = (state) => state.user.info;

export default userSlice.reducer;
