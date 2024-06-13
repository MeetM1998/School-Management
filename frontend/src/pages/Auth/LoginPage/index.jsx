import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GlobalButton from "../../../components/GlobalButton";
import GlobalLoader from "../../../components/GlobalLoader";
import { userLogin } from "../../../redux/slices/authslice";
import { signupSchema } from "../../../validation/ValidationSchema";
import * as S from "./styles";

const defaultTheme = createTheme();

const loginInitialvalues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const data = JSON.parse(localStorage.getItem("user_details"));

  const [toggle, setToggle] = useState(false);

  const handleSubmit = (values) => {
    let loginData = {
      email: values.email,
      password: values.password,
    };

    if (values?.email !== "" && values?.password !== "") {
      dispatch(userLogin(loginData));
    }
  };

  const token = data?.accessToken;

  token !== null && navigate("/");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={4} sm={4} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              Login
            </Typography>
            <Typography variant="h7">
              Welcome back! Please enter your details
            </Typography>
            <Formik
              initialValues={loginInitialvalues}
              validationSchema={signupSchema}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                  <Box sx={{ mt: 2, mb: 4 }}>
                    <TextField
                      label="Email"
                      name="email"
                      fullWidth
                      variant="outlined"
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched?.email && errors?.email)}
                      helperText={
                        errors?.email && touched?.email ? errors?.email : ""
                      }
                      inputProps={{
                        style: {
                          padding: 15,
                        },
                      }}
                    />
                    <TextField
                      name="password"
                      label="Password"
                      fullWidth
                      margin="normal"
                      type={toggle ? "text" : "password"}
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setToggle(!toggle)}>
                              {toggle ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mt: 2 }}
                    />
                    <GlobalButton
                      onClick={() => handleSubmit(values)}
                      sx={{ mt: 2 }}
                      text="Login"
                    />
                    <Grid
                      container
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <S.StyledLink to="/forgot-password">
                        Forgot password?
                      </S.StyledLink>
                      <S.StyledLink to="/register">
                        Don't have an account? Sign Up
                      </S.StyledLink>
                    </Grid>
                  </Box>
                </Form>
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

export default LoginPage;
