
"use client"; 

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.value = true;
    },
    unsetLoading: (state) => {
      state.value = false;
    },

  },
});

export const { setLoading, unsetLoading } = loadingSlice.actions

export default loadingSlice.reducer;