import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userServices from "../services/user.service.js";
import { generateOtp } from "../utils/helper.js";
import { sendMailWithMailOptions } from "../utils/nodeMailer.js";
import { forgotPasswordEmailTemplate } from "../templates/forgotPasswordEmail.js";
import { authMessages } from "../common/apiMessages.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const loginUser = async (req, res, next) => {
  const { email, password } = req?.value?.body;

  try {
    const user = await userServices.getOne({ email });
    if (user === null) {
      throw new ApiError(authMessages.USER_NOT_EXISTS, 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(authMessages.INVALID_EMAIL_PASSWORD, 401);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    const updatedUser = await userServices.updateOne(
      user?._id,
      {
        refreshToken,
      },
      " -password -refreshToken -__v"
    );

    updatedUser.accessToken = accessToken;

    return ApiResponse(res, 200, true, authMessages.LOGIN_SUCCESS, updatedUser);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req?.value?.body;
  try {
    const user = await userServices.getOne({ email });
    if (!user) {
      throw new ApiError(authMessages.USER_NOT_FOUND_BY_EMAIL, 401);
    }

    const otp = generateOtp();
    await userServices.updateOne(user._id, {
      otp,
      otpExpires: Date.now() + 60 * 1000,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: forgotPasswordEmailTemplate({ otp, name: user.name }),
    };

    await sendMailWithMailOptions(mailOptions);

    return ApiResponse(res, 200, true, authMessages.EMAIL_SENT, {
      message: "otp sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { email, password, otp } = req?.value?.body;
  try {
    const user = await userServices.getOne({ email });
    if (!user) {
      throw new ApiError(authMessages.USER_NOT_FOUND_BY_EMAIL, 401);
    }
    if (user.otp != otp) {
      throw new ApiError(authMessages.INVALID_OTP, 401);
    }
    if (user.otpExpires < Date.now()) {
      throw new ApiError(authMessages.OTP_EXPIRED, 410);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userServices.updateOne(user._id, {
      password: hashedPassword,
      otp: "",
      otpExpires: "",
    });
    return ApiResponse(res, 200, true, authMessages.PASSWORD_RESET, {});
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req?.value?.body;
  const { email } = req?.user;
  try {
    const user = await userServices.getOne({ email });

    if (!user) {
      throw new ApiError(authMessages.USER_NOT_FOUND_BY_EMAIL, 401);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new ApiError(authMessages.INVALID_OLD_PASSWORD, 401);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userServices.updateOne(user._id, {
      password: hashedPassword,
    });

    return ApiResponse(res, 200, true, authMessages.PASSWORD_CHANGED);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req?.value?.body;
  try {
    const decodedToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await userServices.getById(decodedToken?._id);
    if (!user) {
      throw new ApiError(authMessages.INVALID_REFRESH_TOKEN, 401);
    }

    if (refreshToken !== user?.refreshToken) {
      throw new ApiError(authMessages.EXPIRED_REFRESH_TOKEN, 401);
    }
    const accessToken = user.generateAccessToken();
    return ApiResponse(res, 200, true, authMessages.REFRESH_TOKEN_SUCCESS, {
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export {
  loginUser,
  forgotPassword,
  resetPassword,
  refreshToken,
  changePassword,
};
