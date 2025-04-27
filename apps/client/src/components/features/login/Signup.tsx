import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../../graphql/user/mutations.js";
import { useAuth } from "../../../context/AuthContext"; // adjust path as needed
import "./styles.css"; 

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [signup, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: ({ signup }) => {
      if (signup?.token) {
        register(signup.token, signup.user);
        alert("Signup complete! Redirecting...");
        navigate("/");
      } else {
        alert("Signup succeeded, but no token was returned.");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ variables: formData });
  };

  return (
    <div className="signup-container">
      <h2>Join Us, It’s Time to Start!</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          className="input"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          className="input"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="input"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="input"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p className="error">Signup failed. Try again.</p>}
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
