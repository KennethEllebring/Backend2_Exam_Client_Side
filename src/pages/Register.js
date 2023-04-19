import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../styles/Register.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [requirementsMet, setRequirementsMet] = useState(false); // add state variable
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  //Prevents users from visiting /register while logged in
  useEffect(() => {
    if (loggedIn) {
      navigate("/feed");
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5050/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password, confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (data.message === "New User Added") {
      toast.success(data.message);
      navigate("/");
      return;
    } else {
      toast.error(data.message);
      return;
    }
  };

  const handleInputChange = (e) => {
    setRequirementsMet(e.target.form.checkValidity());
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <div className="register">
      <div className="register-wrapper">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
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
          <label>Password</label>
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
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            minLength={6}
            maxLength={36}
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          <button className="register-button" disabled={!requirementsMet}>
            register
          </button>
        </form>
        <div className="pageSwap">
          <Link to="/register">Register</Link>
          <Link to="/">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
