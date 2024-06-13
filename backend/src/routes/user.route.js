import express from "express";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  createUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
  changePasswordSchema,
} from "../validationSchemas/user_v.js";
import { getByRole, registerUser } from "../controllers/user.controller.js";
import {
  loginUser,
  refreshToken,
  resetPassword,
  forgotPassword,
  changePassword,
} from "../controllers/auth.controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/register", validateRequest(createUserSchema), registerUser);
router.post("/login", validateRequest(loginUserSchema), loginUser);
router.post("/getOtp", validateRequest(forgotPasswordSchema), forgotPassword);
router.post(
  "/resetPassword",
  validateRequest(resetPasswordSchema),
  resetPassword
);
router.post(
  "/changePassword",
  validateRequest(changePasswordSchema),
  authenticateToken("ADMIN"),
  changePassword
);
router.post("/refreshToken", validateRequest(refreshTokenSchema), refreshToken);
router.get("/getByRole/:role", getByRole);

export default router;
