import bcrypt from "bcrypt";
import * as userServices from "../services/user.service.js";
import { userRoles } from "../common/userRoles.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { authMessages, roleMessages } from "../common/apiMessages.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, contact } = req?.value?.body;
    const userRole = userRoles[role];

    const existingUser = await userServices.getOne(email);
    if (existingUser) {
      throw new ApiError(authMessages.USER_ALREADY_EXISTS, 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userServices.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      contact,
    });

    const { password: pass, __v, ...respones } = user._doc;

    return ApiResponse(res, 200, true, authMessages.USER_CREATED, respones);
  } catch (error) {
    next(error);
  }
};

const getByRole = async (req, res, next) => {
  try {
    if (
      req.params.role &&
      Object.values(userRoles).indexOf(req.params.role) > -1
    ) {
      const user = await userServices.getByRole(req.params.role);
      return ApiResponse(
        res,
        200,
        true,
        user.length > 0 ? `${req.params.role} ${roleMessages.GET_BY_ROLE}` : roleMessages.NO_DATA_FOUND,
        user
      );
    }
    throw new ApiError(roleMessages.INVALID_PARAMS, 400);
  } catch (error) {
    next(error);
  }
};

export { registerUser, getByRole };
