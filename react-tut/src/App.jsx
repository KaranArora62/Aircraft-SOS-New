import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import SignIn from "./Components/SignIn";
import Maps from "./Components/Maps/Maps";
import Home from "./Components/Home/Home";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import { useCookies } from 'react-cookie';
import SOSHome from "./Components/Emergency/SOSHome";

function App() {
  const [cookies, setCookie] = useCookies(['username', 'email']);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/SOSHome" element={<SOSHome />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="*" element={<>Page Not Found</>} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
