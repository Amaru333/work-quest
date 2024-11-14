import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    data: [],
  },
  reducers: {
    setComments(state, action) {
      state.data = action.payload;
    },
    addComment(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;

export const getComments = (state) => state.comment.data;

export default commentSlice.reducer;
