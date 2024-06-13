import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosPost } from "../../../Helper/axiosHelper";

export const PostData = createAsyncThunk(
  "data/postData",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axiosPost(requestData, "user/register");
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
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

export const setUserDetails = createAction("auth/setUserDetails");

export const userLogin = createAsyncThunk(
  "data/userLogin",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosPost(requestData, "user/login");
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        const responseData = response?.data?.data;
        localStorage.setItem("user_details", JSON.stringify(responseData));
        dispatch(setUserDetails(responseData));
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

export const sendOTP = createAsyncThunk(
  "data/sendOTP",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axiosPost(requestData, "user/getOtp");
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
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

export const resetPassword = createAsyncThunk(
  "data/resetPassword",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axiosPost(requestData, "user/resetPassword");
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
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

export const changePassword = createAsyncThunk(
  "data/changePassword",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axiosPost(requestData, "user/changePassword");
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
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

const initialState = {
  isLoading: false,
  data: {},
  registerUser: false,
  otpSent: false,
  passwordReset: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PostData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.registerUser = true;
      })
      .addCase(PostData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(setUserDetails, (state, action) => {
        state.data = action.payload;
      })
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.otpSent = true;
      })
      .addCase(sendOTP.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordReset = true;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordReset = true;
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
export default authSlice.reducer;
