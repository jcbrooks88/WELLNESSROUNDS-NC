import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import NavBar from "./components/features/navbar/NavBar";
import NavBar from "./components/features/navbar/NavBar";
import Footer from "./components/features/footer/Footer";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import "./styles/App.css";
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Router>
      <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
