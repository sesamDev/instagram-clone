import "./styles/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/routes/Home";
import Login from "./components/routes/Login";
import Profile from "./components/routes/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
