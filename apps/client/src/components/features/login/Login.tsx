import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../graphql/user/mutations.js";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./styles.css"; 

const Login = () => {
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("Login data:", data); // Log data to check structure
      login(data.login.token, data.login.user);
      navigate("/");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ 
        variables: { email, password } 
      });
      console.log("Login response:", data); // Log the response

      if (data && data.login) {
        login(data.login.token, data.login.user);
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back, Let's Get You In!</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div>
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        {error && <p className="error">Login failed: {error.message}</p>}
      </form>
      <p>
        Not a member? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
};

export default Login;
