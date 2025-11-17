import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(form);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/home");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box glass-card">
        <h2 style={{ margin: 0, marginBottom: 8 }}>Trainer Portal</h2>
        <p style={{ color: "#6b7280", marginTop: 0 }}>Sign in to continue</p>

        {error && <div style={{ background: "#ffe5e5", color: "crimson", padding: 8, borderRadius: 8 }}>{error}</div>}

        <form onSubmit={submit} style={{ marginTop: 12 }}>
          <label style={{ fontWeight: 700 }}>Username</label>
          <input name="username" value={form.username} onChange={change} style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />

          <label style={{ fontWeight: 700 }}>Password</label>
          <input type="password" name="password" value={form.password} onChange={change} style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />

          <button type="submit" className="btn-main">Login</button>
        </form>
      </div>
    </div>
  );
}
