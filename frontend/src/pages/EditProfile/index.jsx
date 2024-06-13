import {
  Card,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Form, Formik } from "formik";
import { editProfileSchema } from "../../validation/ValidationSchema";
import { bloodGroupData } from "../../utils/constant";
import GlobalButton from "../../components/GlobalButton";

const initialValues = {
  alternateEmail: "",
  gender: "",
  date: "",
  homeAddress: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  bloodGroup: "",
};

const EditProfile = () => {
  const handleSubmit = (values) => {};
  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5" component="div" fontWeight="500">
          Edit Profile
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={editProfileSchema}
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
                  label="Alternate Email No."
                  name="alternateEmail"
                  variant="outlined"
                  value={values?.alternateEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(
                    touched?.alternateEmail && errors?.alternateEmail
                  )}
                  helperText={
                    errors?.alternateEmail && touched?.alternateEmail
                      ? errors?.alternateEmail
                      : ""
                  }
                  sx={{ mb: 3, width: "50%" }}
                />
                <FormControl
                  fullWidth
                  error={Boolean(touched?.gender && errors?.gender)}
                  sx={{ mb: 3, width: "50%" }}
                >
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values?.gender}
                    label="Gender"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched?.gender && errors?.gender)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  error={Boolean(touched?.bloodGroup && errors?.bloodGroup)}
                  sx={{ mb: 3, width: "50%" }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values?.bloodGroup}
                    label="Blood Group"
                    name="bloodGroup"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {bloodGroupData?.map((item, index) => (
                      <MenuItem key={index} value={item?.title}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={values?.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched?.date && errors?.date)}
                  helperText={errors?.date && touched?.date ? errors?.date : ""}
                  sx={{ width: "50%", mb: 3 }}
                />
                <TextField
                  label="Home Address"
                  name="homeAddress"
                  variant="outlined"
                  value={values?.homeAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched?.homeAddress && errors?.homeAddress)}
                  helperText={
                    errors?.homeAddress && touched?.homeAddress
                      ? errors?.homeAddress
                      : ""
                  }
                  sx={{ mb: 3, width: "50%" }}
                />
                <TextField
                  label="Emergency Contact Name"
                  name="emergencyContactName"
                  variant="outlined"
                  value={values?.emergencyContactName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(
                    touched?.emergencyContactName &&
                      errors?.emergencyContactName
                  )}
                  helperText={
                    errors?.emergencyContactName &&
                    touched?.emergencyContactName
                      ? errors?.emergencyContactName
                      : ""
                  }
                  sx={{ mb: 3, width: "50%" }}
                />
                <TextField
                  label="Emergency Contact Number"
                  name="emergencyContactNumber"
                  variant="outlined"
                  value={values?.emergencyContactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(
                    touched?.emergencyContactNumber &&
                      errors?.emergencyContactNumber
                  )}
                  helperText={
                    errors?.emergencyContactNumber &&
                    touched?.emergencyContactNumber
                      ? errors?.emergencyContactNumber
                      : ""
                  }
                  sx={{ mb: 3, width: "50%" }}
                />
                <GlobalButton
                  onClick={() => handleSubmit(values)}
                  sx={{ width: "50%" }}
                  text="Save Changes"
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
export default EditProfile;
