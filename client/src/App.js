import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import SignupPayment from "./Pages/Signup/SignupPayment";
import ProfileCompletePage from "./Pages/Signup/ProfileCompletePage";
import ForgortPasswordPage from "./Pages/Login/ForgortPasswordPage";
import DashboardPage from "./Pages/Admin/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgortPasswordPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/payment" element={<SignupPayment />} />
      <Route path="/profile-complete" element={<ProfileCompletePage />} />
      /*Admin */
      <Route path="admin">
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
