import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
