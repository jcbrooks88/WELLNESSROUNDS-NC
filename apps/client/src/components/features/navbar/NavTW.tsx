import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { AuthContext } from "../../../context/AuthContext";
import { LogoutButton } from "../login/LogoutButton";
import './NavBar.css';

const NavBar: React.FC = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <Link to="/" className="flex items-center">
          <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="App Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Wellness Rounds NC
          </span>
        </Link>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/about">
          About
        </NavbarLink>

        {user ? (
          <>
            <NavbarLink>
              <Link to="/dashboard">Dashboard</Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/profile">Profile</Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/contact">Contact Us</Link>
            </NavbarLink>
            <div className="ml-4">
              <LogoutButton />
            </div>
          </>
        ) : (
          <NavbarLink>
            <Link to="/login">Login</Link>
          </NavbarLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;
