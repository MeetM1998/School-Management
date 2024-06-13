import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostData } from "../../../redux/slices/authslice";
import { signupSchema } from "../../../validation/ValidationSchema";
import * as S from "./styles";
import GlobalLoader from "../../../components/GlobalLoader";
import GlobalButton from "../../../components/GlobalButton";
const defaultTheme = createTheme();

const signupInitialvalues = {
  email: "",
  password: "",
  name: "",
  contact: "",
  role: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, registerUser } = useSelector((state) => state.auth);

  const [toggle, setToggle] = useState(false);

  const handleSubmit = (values) => {
    const postData = {
      name: values?.name,
      contact: values?.contact,
      email: values?.email,
      role: values?.role?.toUpperCase(),
      password: values?.password,
    };
    dispatch(PostData(postData));
  };

  registerUser === true && navigate("/login");

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
              Sign up
            </Typography>
            <Typography variant="h7">
              Welcome back! Please enter your details
            </Typography>
            <Formik
              initialValues={signupInitialvalues}
              validationSchema={signupSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(values) => handleSubmit(values)}
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
                      id="name"
                      label="Enter your name"
                      name="name"
                      margin="normal"
                      fullWidth
                      autoComplete="none"
                      variant="outlined"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched?.name && errors?.name)}
                      helperText={
                        errors?.name && touched?.name ? errors?.name : ""
                      }
                      inputProps={{
                        style: {
                          padding: 15,
                        },
                      }}
                    />
                    <TextField
                      label="Enter your contact"
                      name="contact"
                      fullWidth
                      id="contact"
                      variant="outlined"
                      value={values?.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched?.contact && errors?.contact)}
                      helperText={
                        errors?.contact && touched?.contact
                          ? errors?.contact
                          : ""
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
                      id="password"
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
                    <FormControl
                      fullWidth
                      error={Boolean(touched?.role && errors?.role)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values?.role}
                        label="role"
                        name="role"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Teacher">Teacher</MenuItem>
                        <MenuItem value="Parents">Parents</MenuItem>
                      </Select>
                    </FormControl>
                    <GlobalButton sx={{ mt: 3 }} text={"Sign Up"} />
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                      }}
                    >
                      <S.StyledLink to="/login">
                        Already have an account? Sign In
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

export default Register;
