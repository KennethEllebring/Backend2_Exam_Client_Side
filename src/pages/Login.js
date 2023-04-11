import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "../styles/Login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [requirementsMet, setRequirementsMet] = useState(false); // add state variable
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5050/auth/login", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.text();

    if (data === "Login successful") {
      toast.success(`Welcome ${username}`);
      navigate("/home");
      return;
    } else {
      toast.error(data);
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
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" placeholder="Username" minLength={4} maxLength={16} required name="username" value={username} onChange={handleInputChange} />
          <label>Password</label>
          <input type="password" placeholder="Password" minLength={6} maxLength={36} required name="password" value={password} onChange={handleInputChange} />
          <button className="login-button" disabled={!requirementsMet}>
            Login
          </button>
        </form>
        <div className="pageSwap">
          <Link to="/register">Register</Link>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
