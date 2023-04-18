import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [requirementsMet, setRequirementsMet] = useState(false); // add state variable
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setUser } = useAuth();

  //Prevents users from visiting login page while logged in
  useEffect(() => {
    if (loggedIn) {
      navigate("/feed");
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5050/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();

    if (data.message === "Login successful") {
      toast.success(`Welcome ${username}`);
      setUser({ username });
      setLoggedIn(true);
      return;
    } else {
      toast.error(data.message);
    }
  };

  const handleInputChange = (e) => {
    setRequirementsMet(e.target.form.checkValidity());
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-input-container">
            <input
              type="text"
              placeholder="Username"
              minLength={4}
              maxLength={16}
              required
              name="username"
              value={username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              minLength={6}
              maxLength={36}
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-button-container">
            <Link to="/register" className="action-btn link-btn">
              Register
            </Link>
            <button
              className="login-button action-btn"
              disabled={!requirementsMet}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="pageSwap">
        <Link to="/register">Register</Link>
        <Link to="/">Log in</Link>
      </div>
    </div>
  );
}

export default Login;
