import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from '../../UI/Button';

export const LogoutButton = () => {
  const { logout } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("You've been logged out.");
    navigate("/login");
  };
  

  return (
    <Button onClick={handleLogout} variant="secondary">
      Logout
    </Button>
  );
};

