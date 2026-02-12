import { useState } from "react";
import { API } from "../api";

import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", { username, password });
      localStorage.setItem("userId", res.data.id);
      navigate("/chats");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Signup</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: "100%", marginBottom: 10 }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", marginBottom: 10 }} />
      <button onClick={handleSignup} style={{ width: "100%" }}>Signup</button>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}
