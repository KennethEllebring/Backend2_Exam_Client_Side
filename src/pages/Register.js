import { ApiLink } from "../ApiLink";
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

    const response = await fetch(`${ApiLink}/auth/register`, {
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
      <h1>PenFriend</h1>
      <div className="register-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-input-container">
            <input
              type="text"
              placeholder="New Username"
              minLength={4}
              maxLength={16}
              required
              name="username"
              value={username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="New Password"
              minLength={6}
              maxLength={36}
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              minLength={6}
              maxLength={36}
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-button-container">
            <Link to="/" className="action-btn link-btn">
              Already A Member?
            </Link>
            <button
              className="register-button action-btn"
              disabled={!requirementsMet}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
