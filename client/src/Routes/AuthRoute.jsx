import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/Login/LoginPage';
import SignupPage from '../Pages/Signup/SignupPage';
import ForgortPasswordPage from '../Pages/Login/ForgortPasswordPage';
import EmailVerification from '../Pages/Login/EmailVerification';
import UpdatePasswordPage from '../Pages/Login/UpdatePasswordPage';
import ProfileCompletePage from '../Pages/Signup/ProfileCompletePage';
import SignupPayment from '../Pages/Signup/SignupPayment';
import Error from '../Components/Error';

const AdminRoute = () => {
    return (
        <>
            <div >
                <Routes>
                    <Route path="login" element={ <LoginPage /> } />
                    <Route path="register" element={ <SignupPage /> } />
                    <Route path="forgot-password" element={ <ForgortPasswordPage /> } />
                    <Route path="forgot-password/email-verification" element={ <EmailVerification /> } />
                    <Route path="user/forgotPassword" element={ <UpdatePasswordPage /> } />
                    <Route path="profile-complete/:username/:userId" element={ <ProfileCompletePage /> } />
                    <Route path="payment/:userId" element={ <SignupPayment /> } />
                    <Route path="*" element={ <Error /> } />
                </Routes>
            </div>
        </>
    );
}

export default AdminRoute;
