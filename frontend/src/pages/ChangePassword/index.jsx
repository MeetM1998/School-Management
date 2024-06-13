import { Box, Card, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import GlobalButton from "../../components/GlobalButton";
import GlobalLoader from "../../components/GlobalLoader";
import { changePassword } from "../../redux/slices/authslice";
import { changePasswordSchema } from "../../validation/ValidationSchema";

const changePasswordInitialvalues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    const passwordData = {
      newPassword: values?.newPassword,
      oldPassword: values?.oldPassword,
    };
    if (
      values?.confirmPassword !== "" &&
      values?.oldPassword !== "" &&
      values?.newPassword !== ""
    ) {
      dispatch(changePassword(passwordData));
    }
  };
  return (
    <div>
      <div>
        <Card sx={{ p: 3 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight="500"
          >
            Change Password
          </Typography>
          <Formik
            initialValues={changePasswordInitialvalues}
            validationSchema={changePasswordSchema}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <Box
                  sx={{
                    mt: 2,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    label="Old password"
                    name="oldPassword"
                    variant="outlined"
                    value={values?.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched?.oldPassword && errors?.oldPassword)}
                    helperText={
                      errors?.oldPassword && touched?.oldPassword
                        ? errors?.oldPassword
                        : ""
                    }
                    inputProps={{
                      style: {
                        padding: 15,
                      },
                    }}
                    sx={{ mb: 3, width: "50%" }}
                  />
                  <TextField
                    label="New Password"
                    name="newPassword"
                    variant="outlined"
                    value={values?.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched?.newPassword && errors?.newPassword)}
                    helperText={
                      errors?.newPassword && touched?.newPassword
                        ? errors?.newPassword
                        : ""
                    }
                    inputProps={{
                      style: {
                        padding: 15,
                      },
                    }}
                    sx={{ mb: 3, width: "50%" }}
                  />
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
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
                    sx={{ mb: 3, width: "50%" }}
                  />
                  <GlobalButton
                    sx={{ mb: 3, width: "50%" }}
                    onClick={() => handleSubmit(values)}
                    text={"Save Changes"}
                  />
                </Box>
              </Form>
            )}
          </Formik>
          {<GlobalLoader isLoading={isLoading} />}
        </Card>
      </div>
    </div>
  );
};
export default ChangePassword;
