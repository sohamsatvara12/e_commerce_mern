

"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import loadingReducer from "./features/loading/loadingSlice";


const rootReducer = combineReducers({
  counter: counterReducer,
  loading:loadingReducer,
},);

export const store = configureStore({
  reducer: rootReducer,
 });