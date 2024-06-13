import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {

  switch (true) {
    case err instanceof ApiError:
      return res.status(err.status).json({
        status: err.status,
        success: false,
        message: err.message,
      });
    default:
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
      });
  }
};
