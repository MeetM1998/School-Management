import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlobalButton from "../../../components/GlobalButton";
import GlobalLoader from "../../../components/GlobalLoader";
import { resetPassword, sendOTP } from "../../../redux/slices/authslice";
import { forgotPasswordValidationSchema } from "../../../validation/ValidationSchema";
import * as S from "./styles";

const defaultTheme = createTheme();

const initialValue = {
  email: "",
  otp: "",
  password: "",
  confirmPassword: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { passwordReset, isLoading } = useSelector((state) => state.auth);

  const [showResendLink, setShowResendLink] = useState(false);
  const [timer, setTimer] = useState(60);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && showPasswordFields) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && showPasswordFields) {
      setShowResendLink(true);
    }
    return () => clearInterval(interval);
  }, [timer, showPasswordFields]);

  passwordReset === true && navigate("/login");

  const handleGetOTP = (values) => {
    const emailId = {
      email: values?.email,
    };
    setFormSubmitted(true);
    if (values?.email !== "") {
      dispatch(sendOTP(emailId));
      setShowPasswordFields(true);
      setTimer(60);
      setEmailSubmitted(true);
      setShowPasswordFields(true);
    }
  };

  const handleEmailFocus = () => {
    if (!showPasswordFields) {
      setTimer(60);
    }
  };

  const handleSubmit = (values) => {
    const newData = {
      email: values?.email,
      otp: values?.otp,
      password: values?.password,
    };

    if (values?.password !== values?.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
    } else {
      dispatch(resetPassword(newData));
    }
  };

  const handleResendCode = (values) => {
    const emailId = {
      email: values?.email,
    };
    dispatch(sendOTP(emailId));
    setShowResendLink(false);
    setShowPasswordFields(true);
    setTimer(60);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container>
        <CssBaseline />
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          component={Paper}
          elevation={2}
          square
          height="100vh"
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              Forgot Password
            </Typography>
            <Typography variant="h7">
              Lost your password? Please enter your email address.
            </Typography>
            <Formik
              initialValues={initialValue}
              validationSchema={forgotPasswordValidationSchema}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <S.Forms>
                  <TextField
                    label="Enter your email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleEmailFocus}
                    error={Boolean(
                      (formSubmitted && !values.email.trim()) ||
                        (touched?.email && errors?.email)
                    )}
                    helperText={
                      formSubmitted && !values.email.trim() ? (
                        <span style={{ color: "red" }}>
                          Please enter your email
                        </span>
                      ) : errors?.email && touched?.email ? (
                        errors?.email
                      ) : (
                        ""
                      )
                    }
                    inputProps={{
                      style: {
                        padding: 15,
                      },
                    }}
                    sx={{
                      mt: 2,
                    }}
                    disabled={emailSubmitted}
                  />

                  {showPasswordFields && (
                    <>
                      <TextField
                        label="Enter OTP"
                        name="otp"
                        fullWidth
                        variant="outlined"
                        value={values?.otp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched?.otp && errors?.otp)}
                        helperText={
                          errors?.otp && touched?.otp ? errors?.otp : ""
                        }
                        inputProps={{
                          style: {
                            padding: 15,
                          },
                        }}
                        sx={{ mt: 2 }}
                      />
                      <TextField
                        label="New Password"
                        name="password"
                        fullWidth
                        variant="outlined"
                        value={values?.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched?.password && errors?.password)}
                        helperText={
                          errors?.password && touched?.password
                            ? errors?.password
                            : ""
                        }
                        inputProps={{
                          style: {
                            padding: 15,
                          },
                        }}
                        sx={{ mt: 2 }}
                      />
                      <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        fullWidth
                        variant="outlined"
                        value={values?.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched?.confirmPassword && errors?.confirmPassword
                        )}
                        helperText={
                          errors?.confirmPassword && touched?.confirmPassword
                            ? errors?.confirmPassword
                            : ""
                        }
                        inputProps={{
                          style: {
                            padding: 15,
                          },
                        }}
                        sx={{ mt: 2 }}
                      />
                      <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
                        {showPasswordFields && timer > 0
                          ? `Resend OTP in ${timer} seconds`
                          : ""}
                      </Typography>
                    </>
                  )}
                  {showResendLink && (
                    <Typography
                      variant="body2"
                      sx={{ cursor: "pointer", mt: 2, color: "#1565c0" }}
                      onClick={() => handleResendCode(values)}
                    >
                      Resend OTP
                    </Typography>
                  )}

                  <GlobalButton
                    onClick={
                      showPasswordFields
                        ? () => handleSubmit(values)
                        : () => handleGetOTP(values)
                    }
                    sx={{ mt: 2 }}
                    text={showPasswordFields ? "Submit" : "Get OTP"}
                    disabled={showPasswordFields && !values?.confirmPassword}
                  />
                  <Grid
                    container
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <S.StyledLink to="/login">Back to Login</S.StyledLink>
                  </Grid>
                </S.Forms>
              )}
            </Formik>
            {<GlobalLoader isLoading={isLoading} />}
          </Box>
        </Grid>
        <S.AuthBackground item xs={8} />
      </Grid>
    </ThemeProvider>
  );
};

export default ForgotPassword;
