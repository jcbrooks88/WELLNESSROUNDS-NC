import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import './styles.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 10);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''} ${showHeader ? 'header-visible' : 'header-hidden'}`}>
      <div className="header-inner">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/images/WRNC-NEW-transparent.png"
              alt="Site Logo"
              className="header-logo"
            />
          </Link>
        </div>

        <div className="header-content">
        <h1 className="header-title">A Place to Find Your Safe Space</h1>
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
