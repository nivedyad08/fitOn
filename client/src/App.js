import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import SignupPayment from "./Pages/Signup/SignupPayment";
import ProfileCompletePage from "./Pages/Signup/ProfileCompletePage";
import ForgortPasswordPage from "./Pages/Login/ForgortPasswordPage";
import AdminDashboardPage from "./Pages/Admin/AdminDashboardPage";
import ToastContainerBox from "./config/ToastContainer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgortPasswordPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/profile-complete/:username/:userId" element={<ProfileCompletePage />} />
        <Route path="/payment" element={<SignupPayment />} />
        /*Admin */
        <Route path="admin">
          <Route path="dashboard" element={<AdminDashboardPage />} />
        </Route>
        /*Trainer */
        <Route path="trainer">
          {/* <Route path="dashboard" element={<DashboardPage />} /> */}
        </Route>
      </Routes>
      <ToastContainerBox/>
    </div>
  );
}

export default App;
