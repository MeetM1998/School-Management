import joi from "joi";

export const createUserSchema = {
  body: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi
      .string()
      .valid("ADMIN", "TEACHER", "STUDENT", "PARENT")
      .required(),
    contact: joi
      .string()
      .pattern(/^[0-9]{10}$/)
      .message("Phone number must be a 10-digit number")
      .required(),
  }),
};

export const loginUserSchema = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

export const forgotPasswordSchema = {
  body: joi.object({
    email: joi.string().email().required(),
  }),
};

export const resetPasswordSchema = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    otp: joi.string().required(),
  }),
};

export const changePasswordSchema = {
  body: joi.object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
  }),
};

export const refreshTokenSchema = {
  body: joi.object({
    refreshToken: joi.string().required(),
  }),
};
