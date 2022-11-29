import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Profile from "./components/routes/Profile";
import SignUp from "./components/routes/SignUp";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
