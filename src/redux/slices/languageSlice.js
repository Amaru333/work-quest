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

export const selectLanguageCode = (state) => state.language.code;

export const selectLanguageName = (state) => state.language.name;

export const selectedLanguage = createSelector([selectLanguageCode, selectLanguageName], (code, name) => ({
  code,
  name,
}));

export default languageSlice.reducer;
