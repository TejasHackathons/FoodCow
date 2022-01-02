import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import MyAccount from "./Components/MyAccount";
import Recording from "./Components/Recording";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/record" element={<Recording />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
