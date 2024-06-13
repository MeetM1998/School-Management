import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosGet } from "../../../Helper/axiosHelper";


const initialState={
    isLoading: false,
    data: {},
    error: null,
    token: null,
}

export const getUserByRole = createAsyncThunk(
    "data/getUserByRole",
    async (userType, { rejectWithValue }) => {
      try {
        const response = await axiosGet(`user/getByRole/${userType}`)
        if (response?.data?.success === true) {
          // toast.success(response?.data?.message);
          return response;
        }
      } catch (error) {
        if (error?.success === false) {
          toast.error(error?.message);
        }
        return rejectWithValue(error);
      }
    }
  );

const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
          .addCase(getUserByRole.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getUserByRole.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.data = payload;
          })
          .addCase(getUserByRole.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
          })
        }
})
export default studentSlice.reducer;