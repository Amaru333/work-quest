import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    code: "en",
    name: "English",
  },
  reducers: {
    setLanguage(state, action) {
      state.code = action.payload.code;
      state.name = action.payload.name;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectedLanguage = createSelector(
  (state) => state.language,
  (language) => language
);

export default languageSlice.reducer;
