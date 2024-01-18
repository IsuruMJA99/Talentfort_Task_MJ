import React, { useState } from "react";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    console.log(json);

    if (!json.success) {
      alert("Enter valid details");
    }

    if (json.success) {
      localStorage.setItem("authToken", json.token);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/Profile");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="wrapper_login">
      <div className="login">
        <h2>Login Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <strong>Email Address</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form_control-login"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form_control-login"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <br />

          <div className="form-group-check">
            <input type="checkbox" />
            <label htmlFor="check">Remember me</label>
          </div>

          <button type="submit" className="btn btn-success">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
