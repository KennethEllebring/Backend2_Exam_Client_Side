import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "../styles/Login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="login">
      <div className="login-wrapper">
        <h2>Log in</h2>
        <form>
          <label>Username</label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="login-button" onClick={handleSubmit}>
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
