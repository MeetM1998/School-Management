import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authslice";
import studentReducer from "../slices/studentSlice/index"

const store = configureStore({
  reducer: {
    auth:authReducer,
    student:studentReducer
  },
});
export default store;
