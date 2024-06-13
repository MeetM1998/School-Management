import * as Yup from "yup";
const today = new Date();
export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: Yup.number()
    .min(1000000000, "Contact number must be at least 10 digits")
    .max(9999999999, "Contact number cannot exceed 10 digits")
    .required("Contact number is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\\$%\\^&\\*])/,
      "Must Contain  One Special Case Character"
    ),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  otp: Yup.string()
    .test("len", "Must be exactly 6 characters", (val) => val.length === 6)
    .required("OTP is required"),
  password: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\\$%\\^&\\*])/,
      "Must Contain  One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\\$%\\^&\\*])/,
      "Must Contain  One Special Case Character"
    ),
  newPassword: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\\$%\\^&\\*])/,
      "Must Contain  One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const editProfileSchema = Yup.object().shape({
  alternateEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  date: Yup.date()
    .max(today, "Birthdate cannot be in the future")
    .required("Date is required"),
  homeAddress: Yup.string().required("Home Address is required"),
  emergencyContactName: Yup.string().required(
    "Emergency Contact Name is required"
  ),
  emergencyContactNumber: Yup.number()
    .min(1000000000, "Emergency Contact Number must be at least 10 digits")
    .max(9999999999, "Emergency Contact Number cannot exceed 10 digits")
    .required("Emergency Contact Number is required"),
  bloodGroup: Yup.string().required("Blood Group is required"),
});
