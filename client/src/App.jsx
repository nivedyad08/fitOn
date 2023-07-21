import "./App.css";
import { Route, Routes } from "react-router-dom";
import ToastContainerBox from "./config/ToastContainer";
import AdminRoute from "./Routes/AdminRoute";
import AdminAuth from "./Auth/AdminAuth";
import TrainerAuth from "./Auth/TrainerAuth";
import TrainerRoute from "./Routes/TrainerRoute";
import UserAuth from "./Auth/UserAuth";
import UserRoute from "./Routes/UserRoute";
import LandingPage from "./Pages/Landing/LandingPage";
import ProtectedAuth from "./Auth/ProtectedAuth";
import AuthRoute from "./Routes/AuthRoute";
import FloatingButton from "./Components/FloatingButton";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
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
        <Route path="/*" element={ <errorPage /> } />
      </Routes>
      <ToastContainerBox />
      <FloatingButton />

    </div>
  );
}

export default App;
