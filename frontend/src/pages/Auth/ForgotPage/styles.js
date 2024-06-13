import { Grid } from "@mui/material";
import { Form } from "formik";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Images from "../../../assets";

export const Forms = styled(Form)`
  width: 100%;
`;

export const AuthBackground = styled(Grid)`
  && {
    background-image: url(${Images?.mainbg});
    background-size: cover;
    background-position: center;
    height: 100vh;
  }
`;

export const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
