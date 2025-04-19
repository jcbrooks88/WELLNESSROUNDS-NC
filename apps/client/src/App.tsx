import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/features/footer/Footer";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import Header from "./components/features/header/Header";
import DiscussionsPage from "./pages/DiscussionsPage";
import SingleDiscussionPage from "./pages/discussions/SingleDiscussionPage";
import "./styles/App.css";
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Router>
      <Header />
      <div className="pt-32 px-4"> {/* Padding top so content isn’t hidden behind fixed header */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/discussions" element={<DiscussionsPage />} />
            <Route path="/discussions/:id" element={<SingleDiscussionPage />} 
          </Routes>
        </main>
      </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
