export const ApiResponse = (res, status, succsess, message, data) => {
  return res.status(status).json({
    success: succsess,
    message: message,
    data: data,
  });
};
