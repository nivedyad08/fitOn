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
import { toast } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/forgot-password" element={ <ForgortPasswordPage /> } />
        <Route path="/forgot-password/email-verification" element={ <EmailVerification /> } />
        <Route path="/user/forgotPassword" element={ <UpdatePasswordPage /> } />
        <Route path="/register" element={ <SignupPage /> } />
        <Route path="/profile-complete/:username/:userId" element={ <ProfileCompletePage /> } />
        <Route path="/payment/:userId" element={ <SignupPayment /> } />
        /*Admin */
        <Route element={ <AdminAuth /> }>
          <Route path="/admin/*" element={ <AdminRoute /> } />
        </Route>
      </Routes>
      <ToastContainerBox />
    </div>
  );
}

export default App;
