import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/features/footer/Footer.js";
import ContactPage from "./pages/Contact.js";
import AboutPage from "./pages/About.js";
import LoginPage from "./pages/Login.js";
import SignupPage from "./pages/Signup.js";
import HomePage from "./pages/Home.js";
import ProfilePage from "./pages/Profile.js";
import Header from "./components/features/header/Header.js";
import DiscussionsPage from "./pages/discussions/DiscussionPage.js";
import SingleDiscussionPage from "./pages/discussions/SingleDiscussionPage.js";
import Dashboard from "./pages/discussions/DashboardPage.js"
import "./styles/App.css";
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Router>
      <Header />
      <div className="pt-32 px-4" style={{ flex: '1 0 auto' }}> 
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/discussions" element={<DiscussionsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discussions/:id" element={<SingleDiscussionPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
