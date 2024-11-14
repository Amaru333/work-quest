import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import userReducer from "./slices/userSlice";
import commentReducer from "./slices/commentSlices";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

export default store;
