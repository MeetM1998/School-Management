import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { setUserDetails } from "../redux/slices/authslice";
import ProfilePage from "../pages/ProfilePage";
import ChangePassword from "../pages/ChangePassword";
import EditProfile from "../pages/EditProfile";
import StudentList from "../pages/studentList";

const AppRouter = () => {
  const dispatch = useDispatch();
  const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
  const Register = lazy(() => import("../pages/Auth/RegisterPage"));
  const ForgotPasswordPage = lazy(() => import("../pages/Auth/ForgotPage"));
  const DashboardPage = lazy(() => import("../pages/DashboardPage"));
  const token = useSelector((state) => state?.auth?.data?.accessToken);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    if (userDetails) {
      dispatch(setUserDetails(userDetails));
    }
  }, [dispatch, token]);

  const PrivateRoute = () => {
    return token ? <Outlet /> : <Navigate to="/login" />;
  };

  const PublicRoute = () => {
    return token ? <Navigate to="/dashboard" /> : <Outlet />;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route path="studentProfile" element={<ProfilePage />} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="changePassword" element={<ChangePassword />} />
              <Route path="studentList" element={<StudentList />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
