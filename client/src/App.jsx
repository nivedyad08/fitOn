import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import SignupPayment from "./Pages/Signup/SignupPayment";
import ProfileCompletePage from "./Pages/Signup/ProfileCompletePage";
import ForgortPasswordPage from "./Pages/Login/ForgortPasswordPage";
import ToastContainerBox from "./config/ToastContainer";
import UpdatePasswordPage from "./Pages/Login/UpdatePasswordPage";
import EmailVerification from "./Pages/Login/EmailVerification";
import AdminRoute from "./Routes/AdminRoute";
import AdminAuth from "./Auth/AdminAuth";
import TrainerAuth from "./Auth/TrainerAuth";
import TrainerRoute from "./Routes/TrainerRoute";
import errorPage from "./Pages/errorPage";
import UserAuth from "./Auth/UserAuth";
import UserRoute from "./Routes/UserRoute";
import LandingPage from "./Pages/Landing/LandingPage";
import React, { useEffect, useState } from "react"
import Loader from "./Components/Loader";
import ProtectedAuth from "./Auth/ProtectedAuth";
import AuthRoute from "./Routes/AuthRoute";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        {/* <Route path="/login" element={
          <ProtectedAuth>
            <LoginPage />
          </ProtectedAuth>
        } />
        <Route path="/forgot-password" element={
          <ProtectedAuth>
            <ForgortPasswordPage />
          </ProtectedAuth>
        } />
        <Route path="/forgot-password/email-verification" element={
          <ProtectedAuth>
            <EmailVerification />
          </ProtectedAuth> } />
        <Route path="/user/forgotPassword" element={
          <ProtectedAuth>
            <UpdatePasswordPage />
          </ProtectedAuth> } />
        <Route path="/register" element={
          <ProtectedAuth>
            <SignupPage />
          </ProtectedAuth> } />
        <Route path="/profile-complete/:username/:userId" element={
          <ProtectedAuth>
            <ProfileCompletePage />
          </ProtectedAuth>
        } />
        <Route path="/payment/:userId" element={
          <ProtectedAuth>
            <SignupPayment />
          </ProtectedAuth> } /> */}


        /*Admin */
        <Route element={ <AdminAuth /> }>
          <Route path="/admin/*" element={ <AdminRoute /> } />
        </Route>
        /*Trainer */
        <Route element={ <TrainerAuth /> }>
          <Route path="/trainer/*" element={ <TrainerRoute /> } />
        </Route>
        /*User */
        <Route element={ <UserAuth /> }>
          <Route path="/user/*" element={ <UserRoute /> } />
        </Route>
        /*Auth */
        <Route element={ <ProtectedAuth /> }>
          <Route path="/*" element={ <AuthRoute /> } />
        </Route>
      </Routes>
      <ToastContainerBox />
    </div>
  );
}

export default App;
